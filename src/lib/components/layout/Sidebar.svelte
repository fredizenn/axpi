<script lang="ts">
	import { page } from '$app/stores';
	import { Folder, Users, X } from '@lucide/svelte';
	export let isOpen: boolean = false;

	// helper function to check if a route is active
	$: currentPath = $page.url.pathname;
	const isActive = (path: string) => currentPath.startsWith(path);
</script>

<aside
	class={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transition-transform duration-300
	sm:w-64 w-64
	${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
	
	<!-- Logo Section -->
	<div class="flex items-center justify-between">
		<div class="w-full flex items-center">
			<div class="text-white font-bold w-full rounded-lg flex items-center justify-center">
				<img src="/axonlogo.svg" alt="Logo" class="w-48 h-32" />
			</div>
		</div>
		<button
			on:click={() => (isOpen = !isOpen)}
			class="text-gray-500 hover:text-indigo-600 sm:hidden">
			<X class="w-5 h-5" />
		</button>
	</div>

	<!-- Navigation -->
	<nav class="mt-2">
		<ul class="flex flex-col space-y-2 px-3">
			<li>
				<a
					href="/projects"
					class={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-150
						${isActive('/projects')
							? 'bg-[#635BFF] text-white font-medium'
							: 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}>
					<Folder
						class={`w-5 h-5 transition-colors duration-150
							${isActive('/projects') ? 'text-white0' : 'text-gray-500'}`}
					/>
					<span>Projects</span>
				</a>
			</li>

			<!-- <li>
				<a
					href="/members"
					class={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-150
						${isActive('/members')
							? 'bg-indigo-50 text-indigo-700 font-medium'
							: 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}>
					<Users
						class={`w-5 h-5 transition-colors duration-150
							${isActive('/members') ? 'text-indigo-600' : 'text-gray-500'}`}
					/>
					<span>Members</span>
				</a>
			</li> -->
		</ul>
	</nav>
</aside>
