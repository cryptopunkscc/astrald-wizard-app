import type { TreeValue } from '../types';
import type { RpcConnection } from 'portal';
import { astralRpc, log } from '../client';

export interface TreeSubscription {
  stop: () => void;
}

export const treeApi = {
  // Get a single value from a tree path
  async get<T = unknown>(path: string): Promise<T | null> {
    try {
      const results = await astralRpc()
        .call("tree.get")
        .collect<TreeValue<T>[]>({ out: "json", path });

      const value = results?.find(r => r.Type !== 'eos');
      return value?.Object ?? null;
    } catch (e) {
      log(e);
      return null;
    }
  },

  // Set a value at a tree path
  async set<T = unknown>(path: string, value: T): Promise<boolean> {
    let conn: RpcConnection | undefined;
    try {
      conn = await astralRpc().call("tree.set").conn({ in: "json",out: "json", path});
      await conn.encode(value);
      return true;
    } catch (e) {
      log(e);
      return false;
    } finally {
      await conn?.close();
    }
  },

  // Subscribe to value changes at a tree path
  subscribe<T = unknown>(
    path: string,
    onValue: (value: T) => void,
    onError?: (error: unknown) => void
  ): TreeSubscription {
    let stopped = false;

    const run = async () => {
      try {
        await astralRpc()
          .call("tree.get")
          .map<TreeValue<T>, TreeValue<T>>((item) => {
            if (!stopped && item.Type !== 'eos') {
              onValue(item.Object);
            }
            return item;
          })
          .collect({ out: "json", path, follow: true });
      } catch (e) {
        if (!stopped) {
          log(e);
          onError?.(e);
        }
      }
    };

    run();

    return {
      stop: () => {
        stopped = true;
      },
    };
  },
};
