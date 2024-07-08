import { Signal } from '@angular/core';
import { createInjectionToken } from '@shared/util-di';
import { getValue } from '@shared/util-helpers';
import { Sorting } from '@shared/util-store';
import { ValueOrFactory } from '@shared/util-types';

export interface TableFacadeParams<ColumnKey extends string, Entity> {
  effects: ValueOrFactory<{
    fetchTableData(): void;
  }>;
  store: ValueOrFactory<{
    entities: Signal<Entity[]>;
    sorting: Signal<Sorting<ColumnKey> | null>;
    nextPage(): void;
    sortBy(column: ColumnKey): void;
    clearAllEntities(): void;
    toFirstPage(): void;
    isLoading: Signal<boolean>;
    isLastPage: Signal<boolean>;
  }>;
}

export const TableFacadeFeature = createInjectionToken(
  <ColumnKey extends string, Entity>(
    params: TableFacadeParams<ColumnKey, Entity>
  ) => {
    const store = getValue(params.store);
    const effects = getValue(params.effects);

    return {
      tableData: store.entities,
      isLastPage: store.isLastPage,
      sortBy(column: ColumnKey) {
        store.sortBy(column);
        this.refreshTableData();
      },
      loadTableDataNextPage() {
        store.nextPage();
        effects.fetchTableData();
      },
      isTableDataLoading: store.isLoading,
      fetchTableData() {
        effects.fetchTableData();
      },
      clearTable() {
        store.clearAllEntities();
        store.toFirstPage();
      },
      refreshTableData() {
        this.clearTable();
        this.fetchTableData();
      },
    };
  }
);
