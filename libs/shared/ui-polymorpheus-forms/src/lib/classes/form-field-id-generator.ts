/* eslint-disable @typescript-eslint/naming-convention */
import { FormGroup } from '@angular/forms';

import { objectEntries } from '@shared/util-object';
import { Signal, computed } from '@angular/core';
import { FormGroupFacadeParamsBase } from '../models';

type FormFieldLabelId = `${string}Label${number}`;
type FormFieldDescriptionId = `${string}Description${number}`;
type FormFieldErrorsId = `${string}Errors${number}`;

export class FormFieldIdGenerator<Form extends FormGroup> {
  private static ID = 0;
  private readonly fieldsIdsMap: Signal<Map<keyof Form['controls'], number>>;

  constructor(private readonly config: FormGroupFacadeParamsBase<Form>['config']) {
    this.fieldsIdsMap = computed(() => new Map(this.getIdsEntries()));
  }

  label<Key extends keyof Form['controls']>(key: Key): FormFieldLabelId {
    return `${key as string}Label${this.fieldsIdsMap().get(key) as number}`;
  }

  description<Key extends keyof Form['controls']>(key: Key): FormFieldDescriptionId {
    return `${key as string}Description${this.fieldsIdsMap().get(key) as number}`;
  }

  errors<Key extends keyof Form['controls']>(key: Key): FormFieldErrorsId {
    return `${key as string}Errors${this.fieldsIdsMap().get(key) as number}`;
  }

  private getIdsEntries(): Array<[keyof Form['controls'], number]> {
    return objectEntries(this.config()?.controls ?? {}).map(([key]) => [key, FormFieldIdGenerator.ID++]);
  }
}
