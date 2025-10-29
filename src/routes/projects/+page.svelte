<script lang="ts">
	import { onMount } from 'svelte';
	import { Users, Calendar, ChevronRight } from '@lucide/svelte';

	let projects: any = [];

	// dummy data (replace with JSON import later)
	onMount(() => {
		projects = [
			{
				id: 1,
				name: 'GHIMS',
				summary: 'Onboarding trainers for GHIMS deployment.',
				status: 'In Progress',
				progress: 72,
				members: [
					{ id: 1, name: 'Tahlia', avatar: '' },
					{ id: 2, name: 'James', avatar: '' },
					{ id: 3, name: 'Kwame', avatar: '' }
				],
				start: '2025-10-29',
				// end: '2025-12-01'
			},
			
		];
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Completed':
				return 'bg-green-100 text-green-700';
			case 'In Progress':
				return 'bg-blue-100 text-blue-700';
			case 'Pending':
				return 'bg-yellow-100 text-yellow-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};
</script>

<section class="w-full">
	<div class="flex items-center justify-between mb-6">
		<h2 class="text-2xl font-semibold text-gray-800">Projects</h2>
		<!-- <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition">
			+ New Project
		</button> -->
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project}
			<div
				class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition p-5 flex flex-col justify-between">
				<div>
					<div class="flex items-start justify-between">
						<h3 class="text-lg font-semibold text-gray-800 leading-tight">
							{project.name}
						</h3>
						<span
							class={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
								project.status
							)}`}>
							{project.status}
						</span>
					</div>
					<p class="text-gray-500 text-sm mt-2 line-clamp-2">{project.summary}</p>
				</div>

				<!-- Progress -->
				<!-- <div class="mt-4">
					<div class="flex justify-between text-sm text-gray-600 mb-1">
						<span>Progress</span>
						<span>{project.progress}%</span>
					</div>
					<div class="w-full bg-gray-100 rounded-full h-2">
						<div
							class="bg-indigo-600 h-2 rounded-full transition-all duration-500"
							style={`width: ${project.progress}%`}>
						</div>
					</div>
				</div> -->

				<!-- Footer -->
				<div class="flex justify-between items-center mt-4">
					<!-- Members -->
					<div class="flex items-center justify-center space-x">
							 <img
								src='/axonlogo.svg'
								alt="Axon Logo"
								title="Axon Logo"
								class="w-12 h-12 rounded-full border-2 border-white"
							/>
                            <img
								src='/coa.svg'
								alt="Coat of Arms"
								title="Coat of Arms"
								class="w-12 h-12 rounded-full border-2 border-white"
							/>
                            <img
								src='/ghs-official.avif'
								alt="GHS Official Logo"
								title="GHS Official Logo"
								class="w-8 h-8 rounded-full border-2 border-white"
							/>
					</div>

					<!-- Dates -->
					<div class="flex items-center text-gray-500 text-sm gap-1">
						<Calendar class="w-4 h-4" />
						<span>{new Date(project.start).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</span>
					</div>
				</div>

				<!-- Link -->
				<a
					href={`/projects/${project.id}`}
					class="flex items-center justify-end text-indigo-600 text-sm font-medium mt-3 hover:underline">
					View Details <ChevronRight class="w-4 h-4 ml-1" />
				</a>
			</div>
		{/each}
	</div>
</section>
