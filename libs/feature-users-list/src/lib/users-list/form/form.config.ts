import { FormGroupConfig } from '@shared/ui-polymorpheus-forms';
import { UsersListFiltersForm } from './form.model';
import { UsersListFacade } from '../users-list.facade';

export const getUsersListFiltersFormConfig =
  (): FormGroupConfig<UsersListFiltersForm> => {
    return {
      controls: {
        firstName: {
          type: 'InputText',
          label: 'First name',
          defaultValue: null,
          nonNullable: false,
          props: {
            placeholder: 'Specify first name',
          },
        },
        lastName: {
          type: 'InputText',
          label: 'First name',
          defaultValue: null,
          nonNullable: false,
          props: {
            placeholder: 'Specify first name',
          },
        },
        role: {
          type: 'SingleSelect',
          label: 'Role',
          defaultValue: null,
          nonNullable: false,
          props: {
            placeholder: 'Select role',
            options: () => UsersListFacade.inject().rolesOptions,
          },
        },
        startDate: {
          type: 'Datepicker',
          label: 'Start date',
          defaultValue: null,
          nonNullable: false,
          props: {
            placeholder: 'Select start name',
          },
        },
      },
    };
  };
