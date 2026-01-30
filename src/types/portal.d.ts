declare module 'portal' {
  interface RpcTarget {
    call(method: string): RpcCall;
  }

  interface RpcCall {

    request<T = unknown>(params: Record<string, unknown>): Promise<T>;
    map<TIn = unknown, TOut = TIn>(mapper: (item: TIn) => TOut): Collect<TOut>;
    conn( params: Record<string, unknown>): Promise<RpcConnection>;
    collect<T = unknown>(params: Record<string, unknown>): Promise<T>;
  }

  interface Collect<T = unknown> {
    collect(params: Record<string, unknown>): Promise<T[]>;
  }

  interface RpcConnection {
    done: boolean;
    encode<T = unknown>(data: T): Promise<void>;
    decode<T = unknown>(): Promise<T>;
    close(): Promise<void>;
  }

  export const rpc: {
    target(id: string): RpcTarget;
  };

  export function log(...args: unknown[]): void;
}
