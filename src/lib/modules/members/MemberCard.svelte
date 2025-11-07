<script lang="ts">
	import { CheckCircle, XCircle } from "@lucide/svelte";
	import { fade } from "svelte/transition";

	export let m;
	export let getActiveBadge;
	export let fmt;
</script>

<div
	class="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
	in:fade={{ duration: 150 }}
>
	<div class="flex items-center gap-3">
		{#if m.ImageUrl}
			<img src={m?.ImageUrl} alt={m.FullName} title={m.FullName} class="h-14 w-14 rounded-full object-cover" />
		{:else}
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-lg font-medium"
			>
				{m.FullName.charAt(0)}
			</div>
		{/if}
		<div>
			<p class="font-semibold text-gray-800">{m.FullName}</p>
			<p class="text-sm text-gray-500">{m.Designation}</p>
		</div>
	</div>

	<div class="mt-3 space-y-1 text-sm text-gray-600">
		<p><strong>ID:</strong> {m.IdNumber}</p>
		<p><strong>Dept:</strong> {m.Department}</p>
		<p><strong>Issued:</strong> {fmt(m.DateOfIssue)}</p>
		<p><strong>Expiry:</strong> {fmt(m.DateOfExpiry)}</p>
	</div>

	<div class="mt-3">
		<span
			class={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getActiveBadge(
				m.IsActive
			)}`}
		>
			{#if m.IsActive}
				<CheckCircle class="h-4 w-4" /> Active
			{:else}
				<XCircle class="h-4 w-4" /> Inactive
			{/if}
		</span>
	</div>
</div>