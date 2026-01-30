<script lang="ts">
  import { Router } from 'sv-router';
  import { userState, fetchUser } from '$lib/stores/user.svelte';
  import { fetchSwarm } from '$lib/stores/swarm.svelte';
  import { fetchStreams } from '$lib/stores/streams.svelte';
  import { router } from './router';
  import './router';

  $effect(() => {
    fetchUser().then(() => {
      if (userState.user) {
        fetchSwarm();
        fetchStreams();
      } else {
        router.navigate('/setup');
      }
    });
  });
</script>

{#if !userState.initialized}
  <div class="h-screen flex items-center justify-center">
    <p class="text-muted-foreground">Loading...</p>
  </div>
{:else}
  <Router />
{/if}
