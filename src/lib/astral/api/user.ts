import type { UserInfo, RpcResponse } from '../types';
import { astralRpc, log } from '../client';

export const userApi = {
  async get(): Promise<UserInfo | null> {
    try {
      const response = await astralRpc()
        .call("user.info")
        .request<RpcResponse<UserInfo>>({ "out": "json" });

      const userInfo = response?.Object;
      if (!userInfo?.UserAlias) return null;

      return userInfo;
    } catch (e) {
      log(e);
      return null;
    }
  },

  async create(alias: string): Promise<UserInfo | null> {
    try {
      const response = await astralRpc()
        .call("user.create")
        .request<RpcResponse<UserInfo>>({ "out": "json", alias });

      return response?.Object ?? null;
    } catch (e) {

      log(e);
      throw e;
    }
  },
};
