<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		CheckCircle,
		XCircle,
		Calendar,
		Users,
		User,
		Search,
		X,
		Loader2,
		MoveLeft
	} from '@lucide/svelte';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let project: any = null;
	let members: any[] = [];
	let filteredMembers: any[] = [];
	let isLoading = true;
	let error: string | null = null;
	let searchQuery = '';

	// Simulate async API fetching
	async function fetchProjectData() {
		try {
			await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

			// Fetch the members JSON from static directory
			const res = await fetch('/data/GHIMSProjectMembers.json');
			if (!res.ok) throw new Error('Failed to load members data');

			const data = await res.json();
			members = Array.isArray(data) ? data : [];
			filteredMembers = members;

			// Static project details (based on your document)
			project = {
				id: $page.params.id,
				name: 'Ghana Health Information Management System (GHIMS)',
				client: 'Ministry of Health & Ghana Health Service',
				mode: 'Hybrid (Virtual + Onsite)',
				duration: 'Multi-phase Implementation',
				start: '2025-08-01',
				end: '2026-03-30',
				status: 'In Progress',
				progress: 80,
				overview:
					'The Ghana Health Information Management System (GHIMS) Implementation Project, led by Axon Information Systems Ltd in partnership with the Ministry of Health and the Ghana Health Service, aims to digitize healthcare data management nationwide. It focuses on improving accuracy, accountability, and efficiency across all public health facilities. The initiative includes system deployment, nationwide training, technical support, and performance monitoring to establish a unified and sustainable digital health infrastructure.',
				objectives: [
					'Digitize health records and reporting processes across facilities.',
					'Build trainer capacity through the Virtual Train-the-Trainer programme.',
					'Ensure compliance with national data protection standards.',
					'Strengthen institutional capacity for data-driven decision-making.',
					'Deploy standardized health information workflows nationwide.'
				],
				requirements: [
					'Laptop or desktop computer with a functioning microphone.',
					'Stable internet connection for virtual sessions.',
					'Quiet and distraction-free training environment.',
					'Display full name during virtual participation.'
				],
				logos: ['/coa.svg', '/ghs-official.avif']
			};
		} catch (err) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}

	onMount(fetchProjectData);

	function handleSearch() {
		const query = searchQuery.toLowerCase().trim();
		filteredMembers = members.filter(
			(m) => m.FullName.toLowerCase().includes(query) || m.IdNumber.toLowerCase().includes(query)
		);
	}

	function clearSearch() {
		searchQuery = '';
		filteredMembers = members;
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Completed':
				return 'bg-green-100 text-green-700';
			case 'In Progress':
				return 'bg-blue-100 text-blue-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	const getActiveBadge = (isActive: boolean) =>
		isActive
			? 'bg-green-100 text-green-700 border border-green-200'
			: 'bg-gray-100 text-gray-500 border border-gray-200';

	const fmt = (iso: string) =>
		iso
			? new Date(iso).toLocaleDateString('en-GB', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			: '-';
</script>

<!-- Loading state -->
<div class="py-2">
	<Button onclick={() => goto('/projects')} color="light" class="cursor-pointer">
		<MoveLeft class="mr-2 h-4 w-4" />Back to projects</Button
	>
</div>
{#if isLoading}
	<div class="flex h-[70vh] flex-col items-center justify-center text-gray-500">
		<Loader2 class="mb-2 h-6 w-6 animate-spin" />
		<p>Loading project details...</p>
	</div>
{:else if error}
	<div class="p-6">
		<p class="font-medium text-red-500">{error}</p>
	</div>
{:else if project}
	<section class="space-y-6">
		<!-- Header card -->
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
				<div>
					<h1 class="text-2xl font-semibold text-gray-800">{project.name}</h1>
					<p class="mt-1 text-sm text-gray-500">{project.client}</p>
				</div>

				<div class="flex items-center gap-4">
					<span
						class={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(project.status)}`}
					>
						{project.status}
					</span>
				</div>
			</div>

			<p class="mt-4 text-sm leading-relaxed text-gray-600">{project.overview}</p>

			<!-- Logos -->
			{#if project.logos?.length}
				<div class="mt-4 flex flex-wrap items-center gap-4">
					{#each project.logos as logo}
						<img src={logo} alt="Logo" class="h-10 w-auto object-contain" />
					{/each}
				</div>
			{/if}

			<!-- Project meta -->
			<div class="mt-6 flex items-center gap-2 text-sm text-gray-700">
				<Users class="h-4 w-4 text-gray-400" />
				<span><strong>Members:</strong> {members.length}</span>
			</div>
		</div>

		<!-- Objectives -->
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
				<h2 class="mb-3 text-lg font-semibold text-gray-800">Project Objectives</h2>
				<ul class="list-disc space-y-2 pl-5 text-sm text-gray-600">
					{#each project.objectives ?? [] as obj}
						<li>{obj}</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Members grid -->
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 class="text-lg font-semibold text-gray-800">Project Members</h2>
					<span class="text-sm text-gray-500"
						>{filteredMembers.length} result{filteredMembers.length === 1 ? '' : 's'}</span
					>
				</div>

				<!-- Search bar -->
				<div class="relative w-full sm:w-80">
					<Search class="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
					<input
						type="text"
						bind:value={searchQuery}
						on:input={handleSearch}
						placeholder="Search by name, or ID number"
						class="w-full rounded-lg border border-gray-200 py-2 pr-10 pl-9 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
					/>
					{#if searchQuery}
						<button
							on:click={clearSearch}
							class="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
						>
							<X class="h-4 w-4" />
						</button>
					{/if}
				</div>
			</div>

			<!-- Members grid -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#if filteredMembers.length > 0}
					{#each filteredMembers as m (m.IdNumber)}
						<a
							href={`/members/${m.IdNumber}`}
							class="flex cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white p-4 transition hover:shadow-md"
						>
							<div class="flex items-center gap-3">
								<User class="h-12 w-12 rounded-full bg-gray-100 p-2 text-gray-400" />
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
						</a>
					{/each}
				{:else}
					<p class="text-sm text-gray-500">No members found matching “{searchQuery}”.</p>
				{/if}
			</div>
		</div>
	</section>
{:else}
	<div class="p-6">
		<p class="text-gray-500">Project data not available.</p>
	</div>
{/if}

<style>
	article {
		min-height: 160px;
	}
</style>
