import {
  Component,
  Directive,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import {
  DataLoadingState,
  isFailed,
  isLoadedWithData,
} from '@shared/util-loading-state';
import { PGError } from '@shared/util-error-handling';
import {
  createPolymorpheusComponent,
  PolymorpheusComponentViewContainerRef,
} from '@shared/util-polymorpheus-content';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface DataLoadedStateContext<T> {
  $implicit: T;
  loadingState: T;
}

export interface FailedStateContext {
  error: PGError;
}

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  selector: 'ng-container',
  template: `
    {{ text() }}
    <mat-spinner></mat-spinner>
  `,
})
export class LoadingStateComponent {
  public readonly text = input<string>('Loading');
}

const createLoadingStateComponent = createPolymorpheusComponent(
  LoadingStateComponent
);

@Component({
  standalone: true,
  selector: 'ng-container',
  template: ` {{ text() }} `,
})
export class FailedStateComponent {
  public readonly text = input<string>('Failed');
}

const createFailedStateComponent =
  createPolymorpheusComponent(FailedStateComponent);

@Directive({
  standalone: true,
  selector: '[loadingState]',
})
export class LoadingStateDirective<T = never> implements OnChanges {
  public readonly getState = input.required<DataLoadingState<T>>({
    alias: 'loadingState',
  });
  public readonly whileLoading = input<TemplateRef<unknown> | undefined>(
    undefined,
    {
      alias: 'loadingStateWhileLoading',
    }
  );
  public readonly ifFailed = input<TemplateRef<FailedStateContext> | undefined>(
    undefined,
    {
      alias: 'loadingStateIfFailed',
    }
  );

  private readonly templateRef =
    inject<TemplateRef<DataLoadedStateContext<T>>>(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  private readonly loadingStateViewDefault =
    new PolymorpheusComponentViewContainerRef(
      createLoadingStateComponent({
        inputs: {
          text: 'Loading',
        },
      })
    );

  private readonly failedStateViewDefault =
    new PolymorpheusComponentViewContainerRef(
      createFailedStateComponent({
        inputs: {
          text: 'Failed',
        },
      })
    );

  public ngOnChanges(): void {
    this.createView();
  }

  private createView(): void {
    this.viewContainer.clear();

    const state = this.getState();
    const failedStateViewCustom = this.ifFailed();
    const loadingStateViewCustom = this.whileLoading();

    if (
      (state.status === 'Loading' || state.status === 'Idle') &&
      loadingStateViewCustom
    ) {
      this.viewContainer.createEmbeddedView(loadingStateViewCustom);
    }

    if (
      (state.status === 'Loading' || state.status === 'Idle') &&
      !loadingStateViewCustom
    ) {
      this.loadingStateViewDefault.createComponent();
    }

    if (isLoadedWithData(state)) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: state.data,
        loadingState: state.data,
      } as DataLoadedStateContext<T>);
      return;
    }

    if (isFailed(state) && failedStateViewCustom) {
      this.viewContainer.createEmbeddedView(failedStateViewCustom, {
        error: state?.error,
      });
      return;
    }

    if (state.status === 'Failed' && !failedStateViewCustom) {
      this.failedStateViewDefault.createComponent();
      return;
    }
  }

  static ngTemplateContextGuard<K>(
    _: LoadingStateDirective<K>,
    ctx: unknown
  ): ctx is DataLoadedStateContext<K> {
    return Boolean(ctx) || true;
  }
}