import {
  FormGroupConfig,
  overrideAsSingleSelect,
  overrideAsTextInput,
  overrideFormGroup,
} from '@shared/ui-polymorpheus-forms';
import { PersonInfoForm, getPersonInfoFormConfig, withCountriesOptions } from '../../../shared';
import { UpdateUserFacade } from '../update-user.facade';
import { asObservable } from '@shared/util-rxjs-interop';
import { filter, tap } from 'rxjs';
import { User } from '../../../models';

export const getUpdateUserFormConfig = (): FormGroupConfig<PersonInfoForm> => {
  const configBase = getPersonInfoFormConfig();
  const facade = UpdateUserFacade.inject();

  configBase.controls.address.controls.country = overrideAsSingleSelect(configBase.controls.address.controls.country, {
    props: withCountriesOptions(),
  });

  configBase.controls.firstName = overrideAsTextInput(configBase.controls.firstName, {
    states: {
      disabled: true,
    },
  });

  configBase.controls.lastName = overrideAsTextInput(configBase.controls.lastName, {
    states: {
      disabled: true,
    },
  });

  const overridenConfig = overrideFormGroup(configBase, {
    hooks: {
      onInit: (form) => {
        return asObservable(facade.user).pipe(
          filter((user): user is User => Boolean(user)),
          tap((user) => {
            form.patchValue(user);
          }),
        );
      },
    },
  });

  return overridenConfig;
};
