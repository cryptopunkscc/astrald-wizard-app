<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { User, Shield, Zap, Users } from '@lucide/svelte';
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

      <h2 class="text-lg font-bold text-center mb-1">No User Found</h2>
      <p class="text-muted-foreground text-center text-xs mb-3">
        Please create a user in your Astral node to continue.
      </p>
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
