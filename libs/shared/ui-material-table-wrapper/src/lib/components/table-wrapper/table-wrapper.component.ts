/* eslint-disable @angular-eslint/component-selector */
import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MaterialTableColumnProps,
  MaterialTableConfig,
  MaterialTableProps,
} from '../../models/table-config.model';
import {
  PolymorpheusTableDirective,
  TableColumnDef,
  TableColumnNameDirective,
} from '@shared/ui-polymorpheus-tables';
import { memoWithParamsUntilDestroyed } from '@shared/util-memoization';
import { PolymorpheusComponentOutletDirective } from '@shared/ui-polymorpheus-outlet';
import {
  MATERIAL_TABLE_COLUMN_PROPS_DEFAULT,
  MATERIAL_TABLE_PROPS_DEFAULT,
} from '../../constants';
import { createColumnHeaderPartial } from '../column-header/column-header.component';

import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'material-table-wrapper',
  standalone: true,
  imports: [
    PolymorpheusComponentOutletDirective,
    TableColumnNameDirective,
    MatTableModule,
  ],
  hostDirectives: [
    {
      directive: PolymorpheusTableDirective,
      inputs: ['tableData'],
    },
  ],
  templateUrl: './table-wrapper.component.html',
  styleUrl: './table-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTableWrapperComponent<
  ColumnKey extends string = string,
  Data = any
> {
  public readonly table = inject<
    PolymorpheusTableDirective<
      MaterialTableConfig<
        Record<ColumnKey, TableColumnDef<Data, MaterialTableColumnProps>>
      >,
      Data
    >
  >(PolymorpheusTableDirective);

  public readonly props: MaterialTableProps<ColumnKey, Data> = {
    ...MATERIAL_TABLE_PROPS_DEFAULT,
    ...this.table.config.props,
  } as MaterialTableProps<ColumnKey, Data>;

  public readonly columnPropsDefault = MATERIAL_TABLE_COLUMN_PROPS_DEFAULT;

  public onSelected(selected: Data): void {
    this.props.onSelected(selected);
  }

  public getHeader = memoWithParamsUntilDestroyed(
    (
      item: KeyValue<ColumnKey, TableColumnDef<Data, MaterialTableColumnProps>>
    ) => {
      return this.table.getHeader(
        item,
        createColumnHeaderPartial({
          inputs: {
            sortable: item.value.props?.sortable,
          },
          outputsHandlers: {
            onClick: () => {
              this.props.onSort(item.key);
            },
          },
        })
      );
    },
    {
      resolver: ({ key }) => key,
    }
  );
}
