import { dataStore } from '@shared/util-store';
import { User } from '../../models';
import { UsersApi } from '../../data-access';
import { fetchData } from '@shared/util-rxjs-interop';
import { inject } from '@angular/core';
import { createInjectionToken } from '@shared/util-di';

export const CurrentUserFeatureFacade = createInjectionToken((usersApi: UsersApi = inject(UsersApi)) => {
  const userStore = dataStore<User | null>(null);

  const fetchUser = fetchData<User, User['id']>({
    requestFn: (id: User['id']) => usersApi.getUserById(id),
    store: userStore,
  });

  return {
    fetchUser,
    user: userStore.data,
    loadingState: userStore.loadingState,
    isLoaded: userStore.isLoaded,
    onDestroy() {
      userStore.clearData();
      userStore.setRequestStatus('Idle');
    },
  };
});
