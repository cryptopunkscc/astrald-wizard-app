import type { SettingsState } from '../astral/types';
import { treeApi, type TreeSubscription } from '../astral/api/tree';
import { log } from '../astral/client';

export const TCP_LISTEN_PATH = '/mod/tcp/listen';
export const TCP_DIAL_PATH = '/mod/tcp/dial';

export const settingsState = $state<SettingsState>({
  tcp: {
    listen: false,
    dial: false,
  },
  loading: false,
  error: null,
});

let subscriptions: TreeSubscription[] = [];

// Subscribe to TCP settings changes
export function subscribeToSettings() {
  settingsState.loading = true;
  settingsState.error = null;

  const listenSub = treeApi.subscribe<boolean>(
    TCP_LISTEN_PATH,
    (value) => {
      settingsState.tcp.listen = value;
      settingsState.loading = false;
    },
    (error) => {
      settingsState.error = error instanceof Error ? error.message : 'Failed to subscribe to tcp/listen';
      settingsState.loading = false;
    }
  );

  const dialSub = treeApi.subscribe<boolean>(
    TCP_DIAL_PATH,
    (value) => {
      settingsState.tcp.dial = value;
      settingsState.loading = false;
    },
    (error) => {
      settingsState.error = error instanceof Error ? error.message : 'Failed to subscribe to tcp/dial';
      settingsState.loading = false;
    }
  );

  subscriptions = [listenSub, dialSub];
}

// Unsubscribe from all settings
export function unsubscribeFromSettings() {
  for (const sub of subscriptions) {
    sub.stop();
  }
  subscriptions = [];
}

// Fetch initial values (one-time read)
export async function fetchSettings() {
  settingsState.loading = true;
  settingsState.error = null;

  try {
    const [listen, dial] = await Promise.all([
      treeApi.get<boolean>(TCP_LISTEN_PATH),
      treeApi.get<boolean>(TCP_DIAL_PATH),
    ]);

    settingsState.tcp.listen = listen ?? false;
    settingsState.tcp.dial = dial ?? false;
  } catch (e) {
    settingsState.error = e instanceof Error ? e.message : 'Failed to fetch settings';
  } finally {
    settingsState.loading = false;
  }
}

// Set a TCP setting value
export async function setTcpSetting(path: string, value: boolean): Promise<boolean> {
  try {
    const success = await treeApi.set(path, { Type: 'bool', Object: value});
    if (!success) {
      log(`Failed to set ${path} to ${value}`);
      settingsState.error = `Failed to update ${path}`;
    }
    return success;
  } catch (e) {
    log(e);
    settingsState.error = e instanceof Error ? e.message : `Failed to update ${path}`;
    return false;
  }
}
