import { rpc, log } from 'portal';

export const ASTRAL_TARGET = "0319d3353b67931ff4417ce9b50fcb7ffbd0b2aa471d68506c305ce857a09fa4d1";

// Helper to create RPC calls to astral
export function astralRpc() {
  return rpc.target(ASTRAL_TARGET);
}

export { log };
