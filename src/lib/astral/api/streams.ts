import type { StreamInfo, RpcResponse } from '../types';
import { astralRpc, log } from '../client';

export const streamsApi = {
  async getStreams(): Promise<StreamInfo[]> {
    try {
      const response = await astralRpc()
        .call("nodes.streams")
        .collect<RpcResponse<StreamInfo>[]>({ "out": "json" });

      const streams: StreamInfo[] = [];

      if (Array.isArray(response)) {
        for (const item of response) {
          if (item.Type !== 'eos' && item.Object) {
            streams.push(item.Object);
          }
        }
      }

      return streams;
    } catch (e) {
      log(e);
      return [];
    }
  },
};
