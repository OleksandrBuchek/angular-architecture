import { Component, inject } from '@angular/core';
import { PersonInfoComponent, PersonInfoForm } from '../../shared';
import {
  CreateUserFacade,
  provideCreateUserFacadeWithDeps,
} from './create-user.facade';
import {
  FormGroupFacade,
  provideFormGroupRoot,
} from '@shared/ui-polymorpheus-forms';
import { getCreateUserFormConfig } from './form';
import { LoadingStateDirective } from '@shared/ui-loading-state';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [PersonInfoComponent, LoadingStateDirective, MatButtonModule],
  providers: [
    provideCreateUserFacadeWithDeps(),
    provideFormGroupRoot(getCreateUserFormConfig),
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  public readonly facade = CreateUserFacade.inject();
  public readonly formFacade =
    inject<FormGroupFacade<PersonInfoForm>>(FormGroupFacade);

  constructor() {
    this.facade.collections.fetchCountries();
  }

  public createUser(): void {
    this.facade.createUser(this.formFacade.form.value);
  }
}
