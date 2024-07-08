import { inject } from '@angular/core';
import { TableConfig } from '../models';
import { POLYMORPHEUS_TABLE_CONFIG } from '../providers';

export const injectTableConfig = <Config extends TableConfig>(): Config => inject<Config>(POLYMORPHEUS_TABLE_CONFIG);
