import { TableColumnDef, TableConfig } from '@shared/ui-polymorpheus-tables';
import { Signal } from '@angular/core';

export interface MaterialTableProps<ColumnKey = string, Data = any> {
  isLoading: Signal<boolean>;
  isLastPage: Signal<boolean>;
  onSelected: (selected: Data) => void;
  onSort: (columnName: ColumnKey) => void;
}

export interface ScrollEvent {
  offsetY: number;
  offsetX: number;
}

export type MaterialTableConfig<
  Columns extends Record<
    string,
    TableColumnDef<Data, MaterialTableColumnProps>
  >,
  Data = any
> = TableConfig<Columns, Data, MaterialTableProps<keyof Columns, Data>>;

export interface MaterialTableColumnProps {
  minWidth: number;
  maxWidth: number;
  sortable: boolean;
}
