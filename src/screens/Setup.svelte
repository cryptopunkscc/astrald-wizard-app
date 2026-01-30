<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { User, Shield, Zap, Users } from '@lucide/svelte';
  import { createUser, userState } from '$lib/stores/user.svelte';
  import { router } from '../router';

  let alias = $state('');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!alias.trim()) return;

    try {
      await createUser(alias.trim());
      router.navigate('/');
    } catch {
      // Error is already set in userState
    }
  }
</script>

<div class="h-screen flex flex-col items-center justify-center p-4">
  <h1 class="text-3xl font-bold mb-6">Welcome to Astral!</h1>

  <Card.Root class="w-full max-w-xs">
    <Card.Content class="pt-4 pb-4">
      <div class="flex justify-center mb-3">
        <div class="p-2 rounded-lg bg-muted">
          <User class="w-6 h-6" />
        </div>
      </div>

      <h2 class="text-lg font-bold text-center mb-1">Create Your Identity</h2>
      <p class="text-muted-foreground text-center text-xs mb-4">
        Choose an alias to get started with Astral.
      </p>

      <form onsubmit={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="alias">Alias</Label>
          <Input
            id="alias"
            type="text"
            placeholder="Enter your alias"
            bind:value={alias}
            disabled={userState.loading}
          />
        </div>

        {#if userState.error}
          <p class="text-sm text-destructive">{userState.error}</p>
        {/if}

        <Button type="submit" class="w-full" disabled={userState.loading || !alias.trim()}>
          {userState.loading ? 'Creating...' : 'Create Identity'}
        </Button>
      </form>
    </Card.Content>
  </Card.Root>

  <div class="flex gap-8 mt-6 text-center">
    <div class="flex flex-col items-center max-w-24">
      <Shield class="w-4 h-4 text-primary mb-1" />
      <span class="text-xs font-medium">Secure</span>
      <span class="text-[10px] text-muted-foreground">End-to-end encrypted</span>
    </div>
    <div class="flex flex-col items-center max-w-24">
      <Zap class="w-4 h-4 text-primary mb-1" />
      <span class="text-xs font-medium">Fast</span>
      <span class="text-[10px] text-muted-foreground">Low-latency peers</span>
    </div>
    <div class="flex flex-col items-center max-w-24">
      <Users class="w-4 h-4 text-primary mb-1" />
      <span class="text-xs font-medium">Decentralized</span>
      <span class="text-[10px] text-muted-foreground">No single point of failure</span>
    </div>
  </div>
</div>
