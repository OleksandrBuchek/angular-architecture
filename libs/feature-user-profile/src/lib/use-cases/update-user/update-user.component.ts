import { Component, OnDestroy, inject } from '@angular/core';
import { PersonInfoComponent, PersonInfoForm } from '../../shared';
import { FormGroupFacade, provideFormGroupRoot } from '@shared/ui-polymorpheus-forms';
import { getUpdateUserFormConfig } from './form';
import { UpdateUserFacade, provideUpdateUserFacadeWithDeps } from './update-user.facade';
import { LoadingStateDirective } from '@shared/ui-loading-state';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'update-user',
  standalone: true,
  imports: [PersonInfoComponent, LoadingStateDirective, MatButtonModule],
  providers: [provideFormGroupRoot(getUpdateUserFormConfig), provideUpdateUserFacadeWithDeps()],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnDestroy {
  public readonly facade = UpdateUserFacade.inject();
  public readonly formFacade = inject<FormGroupFacade<PersonInfoForm>>(FormGroupFacade);

  constructor() {
    this.facade.collections.fetchCountries();
  }

  public updateUser(): void {
    this.facade.updateUser(this.formFacade.form.value);
  }

  public ngOnDestroy(): void {
    this.facade.onDestroy();
  }
}
