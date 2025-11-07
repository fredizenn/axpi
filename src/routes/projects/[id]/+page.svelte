<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		CheckCircle,
		XCircle,
		Users,
		User,
		Search,
		X,
		Loader2,
		MoveLeft
	} from '@lucide/svelte';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import MemberCard from '$lib/modules/members/MemberCard.svelte';

	let project: any = null;
	let coreMembers: any[] = [];
	let externalMembers: any[] = [];
	let filteredCore: any[] = [];
	let filteredExternal: any[] = [];
	let isLoading = true;
	let error: string | null = null;
	let searchQuery = '';
	let activeTab = 'core'; // or 'external'

	async function fetchProjectData() {
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));

			const [coreRes, extRes] = await Promise.all([
				fetch('/data/GHIMSProjectMembers.json'),
				fetch('/data/GHIMSExternalMembers.json')
			]);

			if (!coreRes.ok || !extRes.ok)
				throw new Error('Failed to load one or more member datasets');

			coreMembers = (await coreRes.json()) || [];
			externalMembers = (await extRes.json()) || [];

			filteredCore = coreMembers;
			filteredExternal = externalMembers;

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

		if (activeTab === 'core') {
			filteredCore = coreMembers.filter(
				(m) =>
					m.FullName.toLowerCase().includes(query) ||
					m.IdNumber.toLowerCase().includes(query)
			);
		} else {
			filteredExternal = externalMembers.filter(
				(m) =>
					m.FullName.toLowerCase().includes(query) ||
					m.IdNumber.toLowerCase().includes(query)
			);
		}
	}

	function clearSearch() {
		searchQuery = '';
		filteredCore = coreMembers;
		filteredExternal = externalMembers;
	}

	function switchTab(tab: string) {
		activeTab = tab;
		searchQuery = '';
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

<div class="py-2">
	<Button onclick={() => goto('/projects')} color="light" class="cursor-pointer">
		<MoveLeft class="mr-2 h-4 w-4" />Back to projects
	</Button>
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
		<!-- Project Overview -->
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
				<div>
					<h1 class="text-2xl font-semibold text-gray-800">{project.name}</h1>
					<p class="mt-1 text-sm text-gray-500">{project.client}</p>
				</div>
				<span class={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
					{project.status}
				</span>
			</div>

			<p class="mt-4 text-sm leading-relaxed text-gray-600">{project.overview}</p>

			{#if project.logos?.length}
				<div class="mt-4 flex flex-wrap items-center gap-4">
					{#each project.logos as logo}
						<img src={logo} alt="Logo" class="h-10 w-auto object-contain" />
					{/each}
				</div>
			{/if}
		</div>

		<!-- Members Section -->
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<!-- Tabs -->
			<div class="flex items-center justify-between mb-4">
				<div class="flex space-x-2">
					<button
						on:click={() => switchTab('core')}
						class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
							activeTab === 'core'
								? 'bg-indigo-600 text-white shadow'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						}`}
					>
						Core Members
					</button>
					<button
						on:click={() => switchTab('external')}
						class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
							activeTab === 'external'
								? 'bg-indigo-600 text-white shadow'
								: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
						}`}
					>
						External Members
					</button>
				</div>

				<!-- Search -->
				<div class="relative w-full sm:w-80">
					<Search class="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
					<input
						type="text"
						bind:value={searchQuery}
						on:input={handleSearch}
						placeholder={`Search ${activeTab === 'core' ? 'Core' : 'External'} Members`}
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

			<!-- Members Grid -->
			<!-- Members Grid -->
<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[70vh] p-1">
	{#if activeTab === 'core'}
		{#if filteredCore.length > 0}
			{#each filteredCore as m (m.IdNumber)}
				{#if m}
					<a
						href={`/members/${m.IdNumber}`}
						in:fade={{ duration: 150 }}
						class="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg hover:border-indigo-200"
					>
						<div class="flex items-center gap-3">
							{#if m.ImageUrl}
								<img
									src={m.ImageUrl}
									alt={m.FullName}
									title={m.FullName}
									class="h-14 w-14 rounded-full object-cover"
								/>
							{:else}
								<div
									class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-lg font-medium"
								>
									{m.FullName ? m.FullName.charAt(0) : '?'}
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
					</a>
				{/if}
			{/each}
		{:else}
			<p class="text-sm text-gray-500 col-span-full text-center py-6">
				No core members found.
			</p>
		{/if}
	{:else}
		{#if filteredExternal.length > 0}
			{#each filteredExternal as m (m.IdNumber)}
				{#if m}
					<a
						href={`/external/${m.IdNumber}`}
						in:fade={{ duration: 150 }}
						class="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg hover:border-indigo-200"
					>
						<div class="flex items-center gap-3">
							{#if m.ImageUrl}
								<img
									src={m.ImageUrl}
									alt={m.FullName}
									title={m.FullName}
									class="h-14 w-14 rounded-full object-cover"
								/>
							{:else}
								<div
									class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-lg font-medium"
								>
									{m.FullName ? m.FullName.charAt(0) : '?'}
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
					</a>
				{/if}
			{/each}
		{:else}
			<p class="text-sm text-gray-500 col-span-full text-center py-6">
				No external members found.
			</p>
		{/if}
	{/if}
</div>

		</div>
	</section>
{/if}

<!-- Member Card Component (inline for simplicity) -->

