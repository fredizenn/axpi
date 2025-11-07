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

		// onMount(() => {
		// 	goto('/projects');
		// });

</script>

<svelte:head>
	<link rel="icon" href='/axonlogo.svg' />
</svelte:head>

<div class="flex flex-col min-h-screen bg-gray-50">
	<!-- Fixed Topbar -->
	<Topbar {toggleSidebar} />

	<!-- Main Content Area -->
	<main class="flex-1 overflow-y-auto mt-16  px-4 sm:px-8 py-6">
		<slot />
	</main>
</div>