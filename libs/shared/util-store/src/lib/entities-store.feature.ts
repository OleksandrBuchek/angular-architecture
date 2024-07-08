import { patchState, signalStore, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import {
  setAllEntities,
  addEntity,
  removeEntity,
  removeAllEntities,
  withEntities,
  setEntities,
  setEntity,
  removeEntities,
} from '@ngrx/signals/entities';
import { EntityIdKey } from '@ngrx/signals/entities/src/models';

import { withRequestStatus } from './request-status-store.feature';
import { withError } from './error-store.feature';
import { withDataLoadingState } from './loading-store.feature';
import { createInstance } from '@shared/util-helpers';

export const withSimpleEntities = <TEntity>(initialValue: TEntity[] = []) => {
  return signalStoreFeature(
    withState<{ entities: TEntity[] }>({ entities: initialValue }),
    withMethods((store) => ({
      setAllEntities(entities: TEntity[]): void {
        patchState(store, { entities });
      },
      prependEntities(newValue: TEntity[]): void {
        const currenctValue = store.entities();
        patchState(store, { entities: [...newValue, ...currenctValue] });
      },
      appendEntities(newValue: TEntity[]): void {
        const currenctValue = store.entities();
        patchState(store, { entities: [...currenctValue, ...newValue] });
      },
      clearAllEntities(): void {
        patchState(store, { entities: [] });
      },
    })),
  );
};

export const simpleEntitiesStore = <TEntity>(initialValue: TEntity[] = []) => {
  return createInstance(
    signalStore(
      withSimpleEntities<TEntity>(initialValue),
      withRequestStatus(),
      withError(),
      withDataLoadingState((store) => ({ ...store, data: store.entities })),
    ),
  );
};

export const extendedEntitiesStore = <TEntity>(props: { idKey: EntityIdKey<TEntity> }) => {
  return createInstance(
    signalStore(
      withExtendedEnitities<TEntity>(props),
      withRequestStatus(),
      withError(),
      withDataLoadingState((store) => ({ ...store, data: store.entities })),
    ),
  );
};

export function withExtendedEnitities<TEntity>(props: { idKey: EntityIdKey<TEntity> }) {
  return signalStoreFeature(
    withEntities<TEntity>(),
    withMethods((store) => ({
      setAllEntities(data: TEntity[]): void {
        patchState(store, setAllEntities(data, props));
      },
      setEntities(data: TEntity[]): void {
        patchState(store, setEntities(data, props));
      },
      setEntity(data: TEntity): void {
        patchState(store, setEntity(data, props));
      },
      addEntity(entity: TEntity): void {
        patchState(store, addEntity(entity, props));
      },
      removeEntity(id: EntityIdKey<TEntity>): void {
        patchState(store, removeEntity(id));
      },
      prependEntities(newValue: TEntity[]): void {
        const currenctValue = store.entities();
        patchState(store, setAllEntities([...newValue, ...currenctValue], props));
      },
      appendEntities(newValue: TEntity[]): void {
        const currenctValue = store.entities();
        patchState(store, setAllEntities([...currenctValue, ...newValue], props));
      },
      clearEntities(ids: EntityIdKey<TEntity>[]): void {
        patchState(store, removeEntities(ids));
      },
      clearAllEntities(): void {
        patchState(store, removeAllEntities());
      },
    })),
  );
}
