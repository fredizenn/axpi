<script lang="ts">
	import { page } from '$app/stores';
	import { Search, Bell, Menu } from '@lucide/svelte';
	export let toggleSidebar: () => void;

	// Reactive title based on route
	$: currentPath = $page.url.pathname;

	const getPageTitle = (path: string) => {
		if (path.startsWith('/projects')) return 'Projects';
		if (path.startsWith('/members')) return 'Members';
		if (path === '/' || path.startsWith('/dashboard')) return 'Dashboard';
		return 'CleverTrack';
	};

	$: pageTitle = getPageTitle(currentPath);
</script>

<header
	class="fixed top-0  w-full bg-white border-b border-gray-100 z-40 flex justify-between items-center px-4 sm:px-6 transition-all duration-300">
	
	<div class="flex items-center gap-3">
		<!-- Mobile Sidebar Toggle -->
		<!-- <button
			class="sm:hidden p-2 rounded-md hover:bg-gray-100"
			on:click={toggleSidebar}>
			<Menu class="w-5 h-5 text-gray-700" />
		</button> -->

		<h1 class="font-semibold flex items-center space-x-2 text-gray-800 text-lg capitalize transition-all duration-200">
			<span><img src="/axonlogo.svg" alt="Axon Logo" class="w-28 h-20 mr-2 rounded-full border-2 border-white" /></span>
			Projects Overview Panel
		</h1>
	</div>

	<div class="flex items-center gap-4">
		<!-- <div class="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
			<Search class="w-4 h-4 text-gray-400" />
			<input
				type="text"
				placeholder="Search..."
				class="bg-transparent text-sm outline-none ml-2 w-40 focus:w-60 transition-all"
			/>
		</div>

		<button class="relative p-2 rounded-full hover:bg-gray-100">
			<Bell class="w-5 h-5 text-gray-600" />
			<span class="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
		</button> -->

		<!-- Profile -->
		<!-- <img
			src="/avatars/tahlia.jpg"
			alt="Profile"
			class="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer"
		/> -->
	</div>
</header>
