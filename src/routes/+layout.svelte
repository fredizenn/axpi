<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import { page } from '$app/stores';
	import { ChevronRight, Home } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let sidebarOpen = false;
	const toggleSidebar = () => (sidebarOpen = !sidebarOpen);

	$: currentPath = $page.url.pathname;

	// Create readable breadcrumbs
	const formatSegment = (segment) =>
		segment
			.replace(/-/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());

	$: segments = currentPath
		.split('/')
		.filter(Boolean)
		.map((s, i, arr) => ({
			name: formatSegment(s),
			href: '/' + arr.slice(0, i + 1).join('/')
		}));

		onMount(() => {
			goto('/projects');
		});

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen bg-[#F4F7FB] overflow-hidden">
	<!-- Sidebar (always wide on desktop) -->
	<Sidebar bind:isOpen={sidebarOpen} />

	<!-- Mobile overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
			on:click={() => (sidebarOpen = false)}>
		</div>
	{/if}

	<!-- Main area -->
	<div class="flex w-full h-screen bg-gray-50">
	<!-- Sidebar -->
	<Sidebar bind:isOpen={sidebarOpen} />

	<!-- Mobile overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
			on:click={() => (sidebarOpen = false)}>
		</div>
	{/if}

	<!-- Main container -->
	<div class="flex flex-col flex-1 sm:ml-64 h-screen overflow-hidden">
		<Topbar on:toggleSidebar={toggleSidebar} />

		<!-- Breadcrumb bar -->
		<section
			class="mt-16 px-4 sm:px-8 py-3 bg-white border-b border-gray-100 flex items-center justify-between flex-wrap">
		</section>

		<!-- Main scrollable area -->
		<main class="overflow-y-auto px-4 pb-10 pt-6">
			<slot />
		</main>
	</div>
</div>
</div>
