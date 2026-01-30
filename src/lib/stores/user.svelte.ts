import type { UserState } from '../astral/types';
import { userApi } from '../astral/api/user';

export const userState = $state<UserState>({
  user: null,
  loading: false,
  initialized: false,
  error: null,
});

export async function fetchUser() {
  userState.loading = true;
  userState.error = null;
  try {
    userState.user = await userApi.get();
  } catch (e) {
    userState.error = e instanceof Error ? e.message : 'failed to fetch user';
  } finally {
    userState.loading = false;
    userState.initialized = true;
  }
}

export async function createUser(alias: string) {
  userState.loading = true;
  userState.error = null;
  try {
    userState.user = await userApi.create(alias);
  } catch (e) {
    userState.error = e instanceof Error ? e.message : 'failed to create user';
    throw e;
  } finally {
    userState.loading = false;
  }
}
