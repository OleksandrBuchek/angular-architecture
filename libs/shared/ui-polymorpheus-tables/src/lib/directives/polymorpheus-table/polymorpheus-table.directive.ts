import {
  ChangeDetectorRef,
  Directive,
  InputSignalWithTransform,
  Signal,
  Type,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { TableColumnDef, TableConfig } from '../../models/table-config.model';
import { KeyValue } from '@angular/common';
import { injectTableConfig } from '../../injectors';
import { asSignal } from '@shared/util-rxjs-interop';
import { memoWithParamsUntilDestroyed } from '@shared/util-memoization';
import { objectEntries, objectKeys } from '@shared/util-object';
import { PolymorpheusComponentFactory, composeWrappers } from '@shared/util-polymorpheus-content';
import { toCssClass } from '@shared/util-helpers';
import { polymorpheusOutlet } from '@shared/ui-polymorpheus-outlet';
import { TableCss } from '../../models';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tableData]',
})
export class PolymorpheusTableDirective<Config extends TableConfig, Data = any> {
  public readonly columnsOrder: Signal<Array<keyof TableConfig['columns']>>;
  private readonly columnsSelectionMap: Signal<Record<keyof TableConfig['columns'], boolean>>;

  public readonly data = input.required<Data[]>({ alias: 'tableData' });

  public readonly config = injectTableConfig<Config>();
  public readonly columnsEntries = computed(() => this.sortedColumnsEntries());
  public readonly columnsVisibilityMap: Record<keyof TableConfig['columns'], Signal<boolean>>;

  public readonly css: TableCss;

  constructor(private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef)) {
    this.columnsOrder = asSignal(this.config.order, {
      initialValue: [],
    });

    this.columnsSelectionMap = this.createColumnsSelectionsMap();
    this.columnsVisibilityMap = this.createColumnsVisibilityMap();

    this.css = this.getTableCss();

    this.clearCellCacheOnDataChange();
  }

  public getCell = memoWithParamsUntilDestroyed(
    ({ value: columnDef }: KeyValue<keyof TableConfig['columns'], TableColumnDef<Data>>, data: Data) => {
      const dataCell = columnDef.cell(data);

      const value = 'value' in dataCell ? dataCell.value : null;

      const columnCellCmp = polymorpheusOutlet({
        className: dataCell.className,
        inputs: {
          content: value,
        },
      });

      const template = 'template' in dataCell ? dataCell.template : null;

      return composeWrappers(dataCell.wrappers, template ?? columnCellCmp);
    },
    {
      resolver: ({ key }, data) => `${key}-${this.config.cacheKey(data)}`,
    },
  );

  public getHeader = memoWithParamsUntilDestroyed(
    (
      { value: columnDef }: KeyValue<keyof TableConfig['columns'], TableColumnDef<Data>>,
      createColumnHeader: PolymorpheusComponentFactory<
        Type<{
          title: InputSignalWithTransform<string, string | undefined>;
        }>
      >,
    ) => {
      const title = 'title' in columnDef.header ? columnDef.header.title : '';

      const columnHeaderCmp = createColumnHeader({
        inputs: {
          title,
        },
      });

      const template = 'template' in columnDef.header ? columnDef.header.template : null;

      return composeWrappers(columnDef.header.wrappers, template ?? columnHeaderCmp);
    },
    {
      resolver: ({ key }) => key,
    },
  );

  private clearCellCacheOnDataChange(): void {
    effect(() => {
      if (this.data().length > 0) {
        this.getCell.clear();
        this.cdr.markForCheck();
      }
    });
  }

  private createColumnsSelectionsMap(): Signal<Record<keyof TableConfig['columns'], boolean>> {
    const selectionsMapDefault = objectKeys(this.config.columns).reduce(
      (acc, key: keyof TableConfig['columns']) => ({
        ...acc,
        [key]: true,
      }),
      {} as Record<keyof TableConfig['columns'], boolean>,
    );

    return asSignal(this.config.selection ?? selectionsMapDefault, { initialValue: selectionsMapDefault });
  }

  private createColumnsVisibilityMap(): Record<keyof TableConfig['columns'], Signal<boolean>> {
    return objectEntries(this.config.columns).reduce(
      (acc, [key, { isVisible }]) => {
        const isColumnVisible = asSignal(isVisible ?? true, { initialValue: true });

        return {
          ...acc,
          [key]: computed(() => isColumnVisible() && this.columnsSelectionMap()[key]),
        };
      },
      {} as Record<keyof TableConfig['columns'], Signal<boolean>>,
    );
  }

  private sortedColumnsEntries(): Array<KeyValue<keyof Config['columns'], Config['columns'][keyof Config['columns']]>> {
    return this.columnsOrder().map((orderedColumnKey) => ({
      key: orderedColumnKey,
      value: this.config.columns[orderedColumnKey],
    })) as Array<KeyValue<keyof Config['columns'], Config['columns'][keyof Config['columns']]>>;
  }

  private getTableCss(): TableCss {
    return {
      classNames: {
        table: toCssClass(this.config.className),
        headers: objectEntries(this.config.columns).reduce(
          (
            acc,
            [
              key,
              {
                header: { className },
              },
            ],
          ) => ({
            ...acc,
            [key]: toCssClass(className),
          }),
          {},
        ),
      },
    };
  }
}
