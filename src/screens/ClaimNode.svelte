<script>
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Badge } from '$lib/components/ui/badge';
  import { ArrowLeft, Search, Server, Check, Hash } from '@lucide/svelte';
  import { router } from '../router';

  // Tab state: 'nearby' | 'manual'
  let activeTab = 'nearby';

  // Search state
  let searchQuery = '';

  // Manual entry state
  let manualNodeId = '';

  // Hardcoded nearby claimable nodes
  const nearbyNodes = [
    { name: 'Node Echo', id: '0x8a4b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', address: '192.168.1.100:8080' },
    { name: 'Node Foxtrot', id: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e', address: '192.168.1.101:8080' },
    { name: 'Node Golf', id: '0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f', address: '192.168.1.102:8080' }
  ];

  let selectedNode = null;

  function selectNode(node) {
    selectedNode = node;
  }

  function claimSelected() {
    if (selectedNode) {
      router.navigate('/');
    }
  }

  function claimManual() {
    if (manualNodeId.trim()) {
      router.navigate('/');
    }
  }

  $: filteredNodes = nearbyNodes.filter(node =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.address.includes(searchQuery)
  );
</script>

<div class="min-h-screen p-6">
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="sm" onclick={() => router.navigate('/')}>
        <ArrowLeft class="w-4 h-4 mr-1" />
        Back
      </Button>
      <div>
        <h1 class="text-2xl font-bold">Claim Node</h1>
        <p class="text-sm text-muted-foreground">Add a node to your network</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 border-b border-border">
      <button
        class="px-4 py-2 text-sm font-medium transition-colors relative {activeTab === 'nearby' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}"
        onclick={() => activeTab = 'nearby'}
      >
        Nearby Nodes
        {#if activeTab === 'nearby'}
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
        {/if}
      </button>
      <button
        class="px-4 py-2 text-sm font-medium transition-colors relative {activeTab === 'manual' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}"
        onclick={() => activeTab = 'manual'}
      >
        Manual Entry
        {#if activeTab === 'manual'}
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
        {/if}
      </button>
    </div>

    {#if activeTab === 'nearby'}
      <!-- Search -->
      <div class="space-y-2">
        <Label class="flex items-center gap-2 text-sm">
          <Search class="w-4 h-4" />
          Search Nodes
        </Label>
        <Input
          placeholder="Search by name or address..."
          bind:value={searchQuery}
          class="h-9"
        />
      </div>

      <!-- Nearby Nodes List -->
      <Card.Root>
        <Card.Header class="pb-3">
          <Card.Title class="text-lg">Available Nodes ({filteredNodes.length})</Card.Title>
        </Card.Header>
        <Card.Content class="space-y-3">
          {#if filteredNodes.length === 0}
            <p class="text-sm text-muted-foreground text-center py-4">No claimable nodes found</p>
          {:else}
            {#each filteredNodes as node}
              <button
                class="w-full text-left"
                onclick={() => selectNode(node)}
              >
                <Card.Root class="transition-colors {selectedNode?.id === node.id ? 'border-primary bg-primary/5' : 'bg-card/50 hover:bg-muted/50'}">
                  <Card.Content class="py-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-lg {selectedNode?.id === node.id ? 'bg-primary/20' : 'bg-muted'}">
                        <Server class="w-5 h-5 {selectedNode?.id === node.id ? 'text-primary' : 'text-muted-foreground'}" />
                      </div>
                      <div>
                        <p class="font-medium">{node.name}</p>
                        <p class="text-sm text-muted-foreground font-mono">{node.address}</p>
                      </div>
                    </div>
                    {#if selectedNode?.id === node.id}
                      <Badge variant="outline" class="border-primary text-primary">
                        <Check class="w-3 h-3 mr-1" />
                        Selected
                      </Badge>
                    {:else}
                      <Badge variant="outline">Claimable</Badge>
                    {/if}
                  </Card.Content>
                </Card.Root>
              </button>
            {/each}
          {/if}
        </Card.Content>
      </Card.Root>

      <!-- Claim Button -->
      <Button
        class="w-full"
        size="lg"
        disabled={!selectedNode}
        onclick={claimSelected}
      >
        {#if selectedNode}
          Claim {selectedNode.name}
        {:else}
          Select a node to claim
        {/if}
      </Button>

    {:else}
      <!-- Manual Entry -->
      <Card.Root>
        <Card.Header class="pb-3">
          <Card.Title class="text-lg">Enter Node ID</Card.Title>
          <p class="text-sm text-muted-foreground">Paste the Node ID to claim it directly</p>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="space-y-2">
            <Label class="flex items-center gap-2 text-sm">
              <Hash class="w-4 h-4" />
              Node ID
            </Label>
            <Input
              placeholder="0x7f3a9b2c4d5e6f1a8b9c0d1e2f3a4b5c6d7e8f9a"
              bind:value={manualNodeId}
              class="h-10 font-mono text-sm"
            />
          </div>

          <Button
            class="w-full"
            size="lg"
            disabled={!manualNodeId.trim()}
            onclick={claimManual}
          >
            Claim Node
          </Button>
        </Card.Content>
      </Card.Root>
    {/if}
  </div>
</div>
