import { FormGroupConfig } from '@shared/ui-polymorpheus-forms';
import { getAddressFormConfig } from '../../address';
import { PersonInfoForm } from './form.model';

export const getPersonInfoFormConfig = (): FormGroupConfig<PersonInfoForm> => ({
  controls: {
    firstName: {
      label: `First Name`,
      defaultValue: '',
      type: 'InputText',
      nonNullable: true,
      props: {
        placeholder: 'Specify first name',
      },
    },
    lastName: {
      label: `Last Name`,
      defaultValue: '',
      type: 'InputText',
      nonNullable: true,
      props: {
        placeholder: 'Specify last name',
      },
    },
    address: getAddressFormConfig(),
  },
});
