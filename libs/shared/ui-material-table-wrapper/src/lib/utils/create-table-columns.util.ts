import { TableColumnDef } from '@shared/ui-polymorpheus-tables';
import { CreateMaterialTableColumnsListParams, MaterialTableColumnProps } from '../models';

export const createNgxColumns =
  <
    ColumnKey extends string,
    Data,
    FactoryFn extends (...args: any[]) => Record<ColumnKey, TableColumnDef<Data, MaterialTableColumnProps>>,
  >(
    params: CreateMaterialTableColumnsListParams<ColumnKey, Data, FactoryFn>,
  ) =>
  (...args: Parameters<FactoryFn>): ReturnType<FactoryFn> =>
    params.factory(...args) as ReturnType<FactoryFn>;
