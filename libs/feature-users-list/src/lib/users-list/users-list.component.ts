import { Component, inject } from '@angular/core';
import {
  provideUsersListFacadeWithDeps,
  UsersListFacade,
} from './users-list.facade';
import {
  FormFieldNameDirective,
  FormFieldWrapperComponent,
  FormGroupFacade,
  provideFormGroupRoot,
} from '@shared/ui-polymorpheus-forms';
import { getUsersListFiltersFormConfig, UsersListFiltersForm } from './form';
import { MaterialTableWrapperComponent } from '@shared/ui-material-table-wrapper';
import { MatButtonModule } from '@angular/material/button';
import { provideTableConfig } from '@shared/ui-polymorpheus-tables';
import { getUsersListTableConfig } from './table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [
    provideUsersListFacadeWithDeps(),
    provideFormGroupRoot(getUsersListFiltersFormConfig),
    provideTableConfig(getUsersListTableConfig),
  ],
  imports: [
    MaterialTableWrapperComponent,
    MatButtonModule,
    FormFieldNameDirective,
    FormFieldWrapperComponent,
    MatCardModule,
  ],
})
export class UsersListComponent {
  public readonly facade = UsersListFacade.inject();
  public readonly formFacade =
    inject<FormGroupFacade<UsersListFiltersForm>>(FormGroupFacade);

  constructor() {
    this.facade.table.fetchTableData();
    this.facade.fetchCollections();
  }
}
