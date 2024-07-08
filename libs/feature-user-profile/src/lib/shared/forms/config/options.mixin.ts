import { WithOptions } from '@shared/ui-polymorpheus-forms';
import { UserProfileCollectionsFeatureFacade } from '../../features';
import { FormGroup, FormArray } from '@angular/forms';

export const withCountriesOptions = <
  Form extends FormGroup | FormArray
>(): WithOptions<Form> => ({
  options: UserProfileCollectionsFeatureFacade.inject().countriesUIOptions,
});
