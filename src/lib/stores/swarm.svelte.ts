import type { SwarmState } from '../astral/types';
import { swarmApi } from '../astral/api/swarm';

export const swarmState = $state<SwarmState>({
  members: [],
  loading: false,
  error: null,
});

export async function fetchSwarm() {
  swarmState.loading = true;
  swarmState.error = null;
  try {
    swarmState.members = await swarmApi.getMembers();
  } catch (e) {
    swarmState.error = e instanceof Error ? e.message : 'Failed to fetch swarm';
  } finally {
    swarmState.loading = false;
  }
}
