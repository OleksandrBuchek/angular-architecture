import { TableConfig } from './table-config.model';

export interface TableCss {
  classNames: {
    table: string;
    headers: Record<keyof TableConfig['columns'], string>;
  };
}
