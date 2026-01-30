declare module 'portal' {
  interface RpcTarget {
    call(method: string): RpcCall;
  }

  interface RpcCall {
    request<T = unknown>(params: Record<string, unknown>): Promise<T>;
    collect<T = unknown>(params: Record<string, unknown>): Promise<T>;
  }

  export const rpc: {
    target(id: string): RpcTarget;
  };

  export function log(...args: unknown[]): void;
}
