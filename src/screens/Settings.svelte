<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  import { Settings as SettingsIcon, Wifi, WifiOff } from '@lucide/svelte';
  import { settingsState, subscribeToSettings, unsubscribeFromSettings, setTcpSetting, TCP_LISTEN_PATH, TCP_DIAL_PATH } from '$lib/stores/settings.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    subscribeToSettings();
    return () => unsubscribeFromSettings();
  });

  async function handleListenChange(checked: boolean) {
    await setTcpSetting(TCP_LISTEN_PATH, checked);
  }

  async function handleDialChange(checked: boolean) {
    await setTcpSetting(TCP_DIAL_PATH, checked);
  }
</script>

<div class="min-h-screen p-6">
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="mb-2">
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-sm text-muted-foreground">Node module configuration</p>
    </div>

    <Card.Root>
      <Card.Header class="pb-3">
        <Card.Title class="text-lg flex items-center gap-2">
          <SettingsIcon class="w-5 h-5" />
          TCP Module
        </Card.Title>
        <Card.Description>
          Network connectivity settings for the TCP module
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-4">
        {#if settingsState.loading}
          <p class="text-sm text-muted-foreground text-center py-4">Loading settings...</p>
        {:else if settingsState.error}
          <p class="text-sm text-destructive text-center py-4">{settingsState.error}</p>
        {:else}
          <div class="flex items-center justify-between py-3 border-b">
            <div class="flex items-center gap-3">
              {#if settingsState.tcp.listen}
                <Wifi class="w-5 h-5 text-green-500" />
              {:else}
                <WifiOff class="w-5 h-5 text-muted-foreground" />
              {/if}
              <Label for="tcp-listen" class="flex flex-col gap-1 cursor-pointer">
                <span class="font-medium">Listen</span>
                <span class="text-sm text-muted-foreground font-normal">Accept incoming TCP connections</span>
              </Label>
            </div>
            <Switch
              id="tcp-listen"
              checked={settingsState.tcp.listen}
              onCheckedChange={handleListenChange}
            />
          </div>

          <div class="flex items-center justify-between py-3">
            <div class="flex items-center gap-3">
              {#if settingsState.tcp.dial}
                <Wifi class="w-5 h-5 text-green-500" />
              {:else}
                <WifiOff class="w-5 h-5 text-muted-foreground" />
              {/if}
              <Label for="tcp-dial" class="flex flex-col gap-1 cursor-pointer">
                <span class="font-medium">Dial</span>
                <span class="text-sm text-muted-foreground font-normal">Allow outgoing TCP connections</span>
              </Label>
            </div>
            <Switch
              id="tcp-dial"
              checked={settingsState.tcp.dial}
              onCheckedChange={handleDialChange}
            />
          </div>
        {/if}
      </Card.Content>
    </Card.Root>
  </div>
</div>
