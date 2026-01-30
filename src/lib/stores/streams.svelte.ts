import type { StreamsState } from '../astral/types';
import { streamsApi } from '../astral/api/streams';

export const streamsState = $state<StreamsState>({
  streams: [],
  loading: false,
  error: null,
});

export async function fetchStreams() {
  streamsState.loading = true;
  streamsState.error = null;
  try {
    streamsState.streams = await streamsApi.getStreams();
  } catch (e) {
    streamsState.error = e instanceof Error ? e.message : 'Failed to fetch streams';
  } finally {
    streamsState.loading = false;
  }
}

// Helper to count streams per remote identity
export function getStreamCount(remoteIdentity: string): number {
  return streamsState.streams.filter(s => s.RemoteIdentity === remoteIdentity).length;
}
