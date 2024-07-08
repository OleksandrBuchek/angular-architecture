import { AddressForm } from './form.model';
import { FormGroupConfig } from '@shared/ui-polymorpheus-forms';

export const getAddressFormConfig = (): FormGroupConfig<AddressForm> => ({
  controls: {
    addressLine1: {
      label: 'Address Line 1',
      defaultValue: '',
      type: 'InputText',
      nonNullable: true,
      props: {
        placeholder: 'Specify your address line 1',
      },
    },
    addressLine2: {
      label: 'Address Line 2',
      defaultValue: '',
      type: 'InputText',
      nonNullable: false,
      props: {
        placeholder: 'Specify your address line 2',
      },
    },
    zip: {
      label: 'Zip code',
      defaultValue: '',
      type: 'InputText',
      nonNullable: true,
      props: {
        placeholder: 'Specify your zip',
      },
    },
    country: {
      label: 'Country',
      defaultValue: null,
      type: 'SingleSelect',
      nonNullable: false,
      props: {
        placeholder: 'Specify your country',
        options: () => [],
      },
    },
  },
});
