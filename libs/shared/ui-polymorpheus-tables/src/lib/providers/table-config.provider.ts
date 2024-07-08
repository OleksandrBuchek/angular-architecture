import { InjectionToken, Provider } from '@angular/core';
import { TableConfig } from '../models';
import { ValueOrFactory } from '@shared/util-types';
import { getValue } from '@shared/util-helpers';

export const POLYMORPHEUS_TABLE_CONFIG = new InjectionToken<TableConfig>('POLYMORPHEUS_TABLE_CONFIG');

export const provideTableConfig = <T extends TableConfig>(configOrFactory: ValueOrFactory<T>): Provider => ({
  provide: POLYMORPHEUS_TABLE_CONFIG,
  useFactory: () => getValue(configOrFactory),
});
