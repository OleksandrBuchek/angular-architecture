import { MaterialTableProps, MaterialTableColumnProps, CreateMaterialTableConfigParams } from '../models';
import { TableColumnDef, TableConfig } from '@shared/ui-polymorpheus-tables';

export const createMaterialTableConfig =
  <
    ColumnKey extends string,
    Data,
    ColumnsMap extends Record<ColumnKey, TableColumnDef<Data, MaterialTableColumnProps>>,
    FactoryFn extends (...args: any[]) => TableConfig<ColumnsMap, Data, MaterialTableProps<ColumnKey, Data>>,
  >(
    params: CreateMaterialTableConfigParams<ColumnKey, Data, ColumnsMap, FactoryFn>,
  ) =>
  (...args: Parameters<FactoryFn>): ReturnType<FactoryFn> =>
    params.factory(...args) as ReturnType<FactoryFn>;
