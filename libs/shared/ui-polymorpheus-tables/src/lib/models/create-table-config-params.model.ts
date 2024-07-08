import { TableColumnDef, TableConfig } from './table-config.model';

export interface CreateTableConfigParams<
  ColumnKey extends string,
  Data,
  TableProps extends object,
  TableColumnProps extends object,
  ColumnsMap extends Record<ColumnKey, TableColumnDef<Data, TableColumnProps>>,
  FactoryFn extends (...args: any[]) => TableConfig<ColumnsMap, Data, TableProps>,
> {
  columnKey: ColumnKey;
  data: Data;
  tableProps: TableProps;
  tableColumnProps: TableColumnProps;
  factory: FactoryFn;
}
