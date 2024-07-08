import { FormGroupConfig, overrideAsSingleSelect } from '@shared/ui-polymorpheus-forms';
import { PersonInfoForm, getPersonInfoFormConfig, withCountriesOptions } from '../../../shared';

export const getCreateUserFormConfig = (): FormGroupConfig<PersonInfoForm> => {
  const configBase = getPersonInfoFormConfig();

  configBase.controls.address.controls.country = overrideAsSingleSelect(configBase.controls.address.controls.country, {
    props: withCountriesOptions(),
  });

  return configBase;
};
