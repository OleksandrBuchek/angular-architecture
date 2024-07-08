/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormFieldNameDirective,
  FormFieldWrapperComponent,
  FormGroupFacade,
  provideFormGroup,
} from '@shared/ui-polymorpheus-forms';
import { PersonInfoForm, getPersonInfoFormConfig } from './forms';
import { AddressComponent } from '../address';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'person-info',
  standalone: true,
  imports: [AddressComponent, ReactiveFormsModule, FormFieldWrapperComponent, FormFieldNameDirective],
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideFormGroup(getPersonInfoFormConfig)],
})
export class PersonInfoComponent {
  readonly facade = inject<FormGroupFacade<PersonInfoForm>>(FormGroupFacade);
}
