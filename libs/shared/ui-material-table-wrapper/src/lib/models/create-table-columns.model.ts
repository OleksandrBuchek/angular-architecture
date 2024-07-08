import { TableColumnDef } from '@shared/ui-polymorpheus-tables';
import { MaterialTableColumnProps } from './table-config.model';

export interface CreateMaterialTableColumnsListParams<
  ColumnKey extends string,
  Data,
  FactoryFn extends (...args: any[]) => Record<ColumnKey, TableColumnDef<Data, MaterialTableColumnProps>>,
> {
  columnKey: ColumnKey;
  data: Data;
  factory: FactoryFn;
}
