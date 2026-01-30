import type { SwarmMember, RpcResponse } from '../types';
import { astralRpc, log } from '../client';

export const swarmApi = {
  async getMembers(): Promise<SwarmMember[]> {
    try {
      const response = await astralRpc()
        .call("user.swarm_status")
        .collect<RpcResponse<SwarmMember>[]>({ "out": "json" });

      const members: SwarmMember[] = [];

      if (Array.isArray(response)) {
        for (const item of response) {
          if (item.Type !== 'eos' && item.Object) {
            members.push(item.Object);
          }
        }
      }

      return members;
    } catch (e) {
      log(e);
      return [];
    }
  },
};
