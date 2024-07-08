import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormGroupFacade } from './form-group.facade';
import { FormGroupConfig } from '../models';
import { provideFormGroupRoot } from '../providers';
import { ValueOrFactory } from '@shared/util-types';
import { overrideAsTextInput } from '../utils';
import { Component, NO_ERRORS_SCHEMA, inject, signal } from '@angular/core';
import { FormFieldWrapperComponent } from '@shared/ui-polymorpheus-forms';
import { BehaviorSubject, EMPTY, Observable, Subject, of, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

type FormGroupTest = FormGroup<{
  control1: FormControl<string>;
  control2: FormControl<number>;
}>;

const getFormConfig = (): FormGroupConfig<FormGroupTest> => {
  return {
    controls: {
      control1: {
        type: 'InputText',
        defaultValue: '',
        nonNullable: true,
        props: {},
      },
      control2: {
        type: 'InputNumber',
        defaultValue: 0,
        nonNullable: true,
        props: {},
      },
    },
  };
};

@Component({
  standalone: true,
  selector: 'test-form',
  template: `
    <form-field-wrapper formFieldName="control1"></form-field-wrapper>
    <form-field-wrapper formFieldName="control2"></form-field-wrapper>
  `,
  imports: [FormFieldWrapperComponent],
})
class TestFormComponent {
  public readonly formFacade = inject<FormGroupFacade<FormGroupTest>>(FormGroupFacade);
}

const buildFormGroupFacade = async <Form extends FormGroup>(config: ValueOrFactory<FormGroupConfig<Form>>) => {
  await TestBed.configureTestingModule({
    imports: [TestFormComponent, NoopAnimationsModule],
    providers: [
      provideFormGroupRoot(config),
      {
        provide: TranslateService,
        useValue: {
          get: () => of(''),
        },
      },
    ],
    teardown: {
      destroyAfterEach: false,
    },
    schemas: [NO_ERRORS_SCHEMA],
  }).compileComponents();

  const fixture = TestBed.createComponent(TestFormComponent);
  const component = fixture.componentInstance;

  return { fixture, component };
};

describe('FormGroupFacade', () => {
  it('should create form group facade instance', () => {
    const facade = buildFormGroupFacade(getFormConfig);
    expect(facade).toBeTruthy();
  });

  it('should build the form group correctly', async () => {
    const { component } = await buildFormGroupFacade(getFormConfig);

    expect(component.formFacade.form.controls.control1).toBeTruthy();
    expect(component.formFacade.form.controls.control2).toBeTruthy();
  });

  it('should build a form group based of a form config', async () => {
    const { component } = await buildFormGroupFacade(getFormConfig);

    expect(component.formFacade.form.controls.control1).toBeTruthy();
    expect(component.formFacade.form.controls.control2).toBeTruthy();
  });

  describe('States', () => {
    describe('Disabled/enabled states', () => {
      it('should disable a field on init', waitForAsync(async () => {
        const config = getFormConfig();

        config.controls.control1 = overrideAsTextInput(config.controls.control1, {
          states: {
            disabled: true,
          },
        });

        const { fixture, component } = await buildFormGroupFacade(config);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(component.formFacade.form.controls.control1.disabled).toBe(true);
        });
      }));

      it('should disable a field on async changes', waitForAsync(async () => {
        const config = getFormConfig();

        const disabledSubject$ = new BehaviorSubject(false);

        config.controls.control1 = overrideAsTextInput(config.controls.control1, {
          states: {
            disabled: () => disabledSubject$.asObservable(),
          },
        });

        const { fixture, component } = await buildFormGroupFacade(config);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(component.formFacade.form.controls.control1.disabled).toBe(false);

          disabledSubject$.next(true);

          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(component.formFacade.form.controls.control1.disabled).toBe(true);
          });
        });
      }));
    });
    describe('Visible/hidden states', () => {
      it('should hide and disable a field on init', waitForAsync(async () => {
        const config = getFormConfig();

        config.controls.control1 = overrideAsTextInput(config.controls.control1, {
          states: {
            visible: false,
          },
        });

        const { fixture, component } = await buildFormGroupFacade(config);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(component.formFacade.$fieldsVisibilityMap().control1).toBe(false);
          expect(component.formFacade.form.controls.control1.disabled).toBe(true);
        });
      }));

      it('should hide and disable a field on async changes', waitForAsync(async () => {
        const config = getFormConfig();

        const isVisibleSubject$ = new BehaviorSubject(true);

        config.controls.control1 = overrideAsTextInput(config.controls.control1, {
          states: {
            visible: () => isVisibleSubject$.asObservable(),
          },
        });

        const { fixture, component } = await buildFormGroupFacade(config);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(component.formFacade.$fieldsVisibilityMap().control1).toBe(true);
          expect(component.formFacade.form.controls.control1.disabled).toBe(false);

          isVisibleSubject$.next(false);

          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(component.formFacade.$fieldsVisibilityMap().control1).toBe(false);
            expect(component.formFacade.form.controls.control1.disabled).toBe(true);
          });
        });
      }));
    });

    describe('Disabled/visible state combined', () => {
      it('should not enable a field when its state changes from hidden to visible if the field is also marked as disabled', waitForAsync(async () => {
        const config = getFormConfig();

        const isVisibleSubject$ = new BehaviorSubject(false);

        config.controls.control1 = overrideAsTextInput(config.controls.control1, {
          states: {
            visible: () => isVisibleSubject$.asObservable(),
            disabled: true,
          },
        });

        const { fixture, component } = await buildFormGroupFacade(config);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(component.formFacade.$fieldsVisibilityMap().control1).toBe(false);
          expect(component.formFacade.form.controls.control1.disabled).toBe(true);

          isVisibleSubject$.next(true);

          fixture.detectChanges();

          fixture.whenStable().then(() => {
            expect(component.formFacade.$fieldsVisibilityMap().control1).toBe(true);
            expect(component.formFacade.form.controls.control1.disabled).toBe(true);
          });
        });
      }));
    });
  });

  describe('Validation', () => {
    it('should add validators and async validators defined in a form config to form control', waitForAsync(async () => {
      const config = getFormConfig();

      const maxLengthValidator = Validators.maxLength(100);

      const emailAsyncValidator = () => of({});

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        validation: {
          validators: () => [Validators.required, maxLengthValidator],
          asyncValidators: () => [emailAsyncValidator],
        },
      });

      const { component } = await buildFormGroupFacade(config);

      expect(component.formFacade.form.controls.control1.hasValidator(Validators.required)).toBe(true);
      expect(component.formFacade.form.controls.control1.hasValidator(maxLengthValidator)).toBe(true);
      expect(component.formFacade.form.controls.control1.hasAsyncValidator(emailAsyncValidator)).toBe(true);
    }));

    it('should add deferred validators and async validators defined in a form config to form control', waitForAsync(async () => {
      const config = getFormConfig();

      const maxLengthValidator = Validators.maxLength(100);
      const emailAsyncValidator = () => of({});

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        validation: {
          deferredValidators: () => [maxLengthValidator],
          deferredAsyncValidators: () => [emailAsyncValidator],
        },
      });

      const { component } = await buildFormGroupFacade(config);

      expect(component.formFacade.form.controls.control1.hasValidator(maxLengthValidator)).toBe(true);
      expect(component.formFacade.form.controls.control1.hasAsyncValidator(emailAsyncValidator)).toBe(true);
    }));

    it('should trigger validation for a form field when a custom trigger event fires', waitForAsync(async () => {
      const config = getFormConfig();

      const validatorMock = jest.fn(() => ({}));

      const validationTriggerSubject$ = new Subject<number>();

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        validation: {
          validators: () => [validatorMock],
          triggerOn: () => validationTriggerSubject$,
        },
      });

      await buildFormGroupFacade(config);

      expect(validatorMock).toHaveBeenCalledTimes(1);

      validationTriggerSubject$.next(1);

      expect(validatorMock).toHaveBeenCalledTimes(2);
    }));

    it('should trigger validation for a form field when a validation parameter changes', waitForAsync(async () => {
      const config = getFormConfig();

      const validatorMock = jest.fn(() => ({}));

      const maxLengthParameter = signal<number>(100);

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        validation: {
          validators: () => [validatorMock],
          params: {
            maxLength: maxLengthParameter,
          },
        },
      });

      const { fixture } = await buildFormGroupFacade(config);

      expect(validatorMock).toHaveBeenCalledTimes(2);

      maxLengthParameter.set(200);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(validatorMock).toHaveBeenCalledTimes(3);
      });
    }));
  });

  describe('Hooks', () => {
    it('should trigger the on init hook upon creation of a form', waitForAsync(async () => {
      const config = getFormConfig();

      const onInitHookMock = jest.fn(() => of(EMPTY));

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        hooks: {
          onInit: onInitHookMock,
        },
      });

      await buildFormGroupFacade(config);

      expect(onInitHookMock).toHaveBeenCalledTimes(1);
    }));
  });

  describe('Value changes', () => {
    it(`should invoke a handler when the field's value changes`, waitForAsync(async () => {
      const config = getFormConfig();

      const onChangesHandlerMock = jest.fn(() => ({}));

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        actions: {
          onChange: onChangesHandlerMock,
        },
      });

      const { component } = await buildFormGroupFacade(config);

      expect(onChangesHandlerMock).toHaveBeenCalledTimes(1);

      const newControlValue = 'new value';

      component.formFacade.form.controls.control1.setValue(newControlValue);

      expect(onChangesHandlerMock).toHaveBeenCalledTimes(2);
      expect(onChangesHandlerMock).toHaveBeenLastCalledWith(newControlValue, expect.anything());
    }));

    it(`should invoke an async handler only once and pass an observable with field's value changes`, waitForAsync(async () => {
      const config = getFormConfig();

      const lastControlValueSubject$ = new BehaviorSubject<FormGroupTest['value']['control1']>('');

      const onChangesAsyncHandlerMock = jest.fn((value$: Observable<FormGroupTest['value']['control1']>) => {
        return value$.pipe(
          tap((value) => {
            lastControlValueSubject$.next(value);
          }),
        );
      });

      config.controls.control1 = overrideAsTextInput(config.controls.control1, {
        actions: {
          onChangeAsync: onChangesAsyncHandlerMock,
        },
      });

      const { component } = await buildFormGroupFacade(config);

      const newControlValue = 'new value';

      component.formFacade.form.controls.control1.setValue(newControlValue);

      expect(onChangesAsyncHandlerMock).toHaveBeenCalledTimes(1);

      expect(lastControlValueSubject$.getValue()).toBe(newControlValue);
    }));
  });
});
