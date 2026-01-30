<script lang="ts" module>
	import type { WithElementRef } from "$lib/utils.js";
	import type { SwitchRootProps } from "bits-ui";

	export type SwitchProps = WithElementRef<SwitchRootProps>;
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Switch as SwitchPrimitive } from "bits-ui";

	let {
		checked = $bindable(false),
		class: className,
		ref = $bindable(null),
		...restProps
	}: SwitchProps = $props();
</script>

<SwitchPrimitive.Root
	bind:checked
	bind:ref
	class={cn(
		"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		class={cn(
			"bg-background pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
		)}
	/>
</SwitchPrimitive.Root>
