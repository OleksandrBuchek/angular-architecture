import { TableColumnDef, TableConfig } from '@shared/ui-polymorpheus-tables';
import { MaterialTableColumnProps, MaterialTableProps } from './table-config.model';

export interface CreateMaterialTableConfigParams<
  ColumnKey extends string,
  Data,
  ColumnsMap extends Record<ColumnKey, TableColumnDef<Data, MaterialTableColumnProps>>,
  FactoryFn extends (...args: any[]) => TableConfig<ColumnsMap, Data, MaterialTableProps<ColumnKey, Data>>,
> {
  columnKey: ColumnKey;
  data: Data;
  factory: FactoryFn;
}
