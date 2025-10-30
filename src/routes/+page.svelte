<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const timer = setTimeout(() => {
			goto('/projects');
		}, 3000);

		return () => clearTimeout(timer);
	});
</script>

<div class="flex items-center justify-center overflow-hidden h-160 ">
	<div class="flex flex-col items-center">
		<img
			src="/axonlogo.svg"
			alt="Logo"
			class="w-84 h-auto animate-pulse drop-shadow-lg"
		/>
		<p class="mt-2 text-gray-400 text-sm tracking-wide animate-fade-in">
			Loading, please wait...
		</p>
	</div>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 1s ease-in-out forwards;
	}
</style>
