// RPC Response wrapper
export interface RpcResponse<T> {
  Type: string;
  Object: T;
}

// User contract
export interface UserContract {
  UserID: string;
  NodeID: string;
  StartsAt: string;
  ExpiresAt: string;
  UserSig: string;
  NodeSig: string;
}

// user.info response
export interface UserInfo {
  NodeAlias: string;
  UserAlias: string;
  ContractID: string;
  Contract: UserContract;
}

// App state
export interface UserState {
  user: UserInfo | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

// Swarm member contract (simplified, no signatures)
export interface SwarmContract {
  UserID: string;
  NodeID: string;
  StartsAt: string;
  ExpiresAt: string;
}

// user.swarm_status response item
export interface SwarmMember {
  SignedContractID: string;
  Identity: string;
  Alias: string;
  Linked: boolean;
  Contract: SwarmContract;
}

// Swarm state
export interface SwarmState {
  members: SwarmMember[];
  loading: boolean;
  error: string | null;
}

// Stream info from nodes.streams
export interface StreamInfo {
  ID: string;
  LocalIdentity: string;
  RemoteIdentity: string;
  LocalEndpoint: string | null;
  RemoteEndpoint: string;
  Outbound: boolean;
  Network: string;
}

export interface StreamsState {
  streams: StreamInfo[];
  loading: boolean;
  error: string | null;
}

// Node types
export interface Node {
  id: string;
  name: string;
  address: string;
  status: 'online' | 'pending' | 'offline';
}


export interface TreeValue<T = unknown> {
  Type: string;
  Object: T;
}




export interface TcpSettings {
  listen: boolean;
  dial: boolean;
}

export interface SettingsState {
  tcp: TcpSettings;
  loading: boolean;
  error: string | null;
}
