import { signal } from '@angular/core';
import { MaterialTableProps } from '../models';

export const MATERIAL_TABLE_PROPS_DEFAULT: MaterialTableProps = {
  onSort: () => ({}),
  onSelected: () => ({}),
  isLoading: signal(false),
  isLastPage: signal(false),
};
