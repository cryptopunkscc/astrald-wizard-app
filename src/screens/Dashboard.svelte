<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Trash2, Server, User, Hash, Copy, Check, Plus, Settings } from '@lucide/svelte';
  import { router } from '../router';
  import { userState } from '$lib/stores/user.svelte';
  import { swarmState } from '$lib/stores/swarm.svelte';
  import { getStreamCount } from '$lib/stores/streams.svelte';

  let copied = $state(false);

  async function copyNodeId() {
    const nodeId = userState.user?.Contract?.NodeID ?? '';
    await navigator.clipboard.writeText(nodeId);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  function getStatusColor(linked: boolean) {
    return linked ? 'bg-green-500' : 'bg-yellow-500';
  }

  // Filter out self from swarm members
  const otherMembers = $derived(
    swarmState.members.filter(m => m.Identity !== userState.user?.Contract?.NodeID)
  );
</script>

<div class="min-h-screen p-6">
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="mb-2 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Swarm</h1>
        <p class="text-sm text-muted-foreground">Manage your swarm</p>
      </div>
      <Button variant="outline" onclick={() => router.navigate('/settings')}>
        <Settings class="w-4 h-4 mr-2" />
        Configure Node
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card.Root>
        <Card.Content class="pt-4 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-primary/10">
              <Server class="w-5 h-5 text-primary" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-muted-foreground">Node Alias</p>
              <p class="font-semibold truncate">{userState.user?.NodeAlias ?? '-'}</p>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Content class="pt-4 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-muted">
              <Hash class="w-5 h-5 text-muted-foreground" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-muted-foreground">Node ID</p>
              <p class="font-mono text-xs truncate" title={userState.user?.Contract?.NodeID ?? ''}>
                {userState.user?.Contract?.NodeID ?? '-'}
              </p>
            </div>
            <button
              onclick={copyNodeId}
              class="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Copy Node ID"
            >
              {#if copied}
                <Check class="w-4 h-4 text-green-500" />
              {:else}
                <Copy class="w-4 h-4" />
              {/if}
            </button>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Content class="pt-4 pb-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-muted">
              <User class="w-5 h-5 text-muted-foreground" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-muted-foreground">User</p>
              <p class="font-semibold truncate">{userState.user?.UserAlias ?? '-'}</p>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <Card.Root>
      <Card.Header class="pb-3 flex flex-row items-center justify-between">
        <Card.Title class="text-lg">Swarm Nodes ({otherMembers.length})</Card.Title>
        <Button size="sm" onclick={() => router.navigate('/claim-node')}>
          <Plus class="w-4 h-4 mr-1" />
          Claim Node
        </Button>
      </Card.Header>
      <Card.Content class="space-y-3">
        {#if swarmState.loading}
          <p class="text-sm text-muted-foreground text-center py-4">Loading...</p>
        {:else if otherMembers.length === 0}
          <p class="text-sm text-muted-foreground text-center py-4">No swarm nodes found</p>
        {:else}
          {#each otherMembers as member}
            <Card.Root class="bg-card/50">
              <Card.Content class="py-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full {getStatusColor(member.Linked)}"></div>
                  <div>
                    <p class="font-medium">{member.Alias}</p>
                    <p class="text-sm text-muted-foreground font-mono">{member.Identity.slice(0, 16)}...</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Badge variant="secondary">
                    {getStreamCount(member.Identity)} streams
                  </Badge>
                  <Badge
                    variant="outline"
                    class={member.Linked
                      ? 'border-green-500 text-green-500'
                      : 'border-yellow-500 text-yellow-500'}
                  >
                    {member.Linked ? 'linked' : 'unlinked'}
                  </Badge>
                  <button class="text-muted-foreground hover:text-foreground transition-colors">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </Card.Content>
            </Card.Root>
          {/each}
        {/if}
      </Card.Content>
    </Card.Root>
  </div>
</div>
