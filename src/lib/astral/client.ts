import { rpc, log } from 'portal';

export const ASTRAL_TARGET = "localnode";

// Helper to create RPC calls to astral
export function astralRpc() {
  return rpc.target(ASTRAL_TARGET);
}

export { log };
