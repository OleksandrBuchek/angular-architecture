import { CreateTableConfigParams, TableColumnDef, TableConfig } from '../models';

export const createTableConfig =
  <
    ColumnKey extends string,
    Data,
    TableProps extends object,
    TableColumnProps extends object,
    ColumnsMap extends Record<ColumnKey, TableColumnDef<Data, TableColumnProps>>,
    FactoryFn extends (...args: any[]) => TableConfig<ColumnsMap, Data, TableProps>,
  >(
    params: CreateTableConfigParams<ColumnKey, Data, TableProps, TableColumnProps, ColumnsMap, FactoryFn>,
  ) =>
  (...args: Parameters<FactoryFn>): ReturnType<FactoryFn> =>
    params.factory(...args) as ReturnType<FactoryFn>;
