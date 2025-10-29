<!-- src/routes/projects/[id]/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { CheckCircle, XCircle, Calendar, Users, User } from '@lucide/svelte';
	export let data: {
		project: {
			id: string;
			name: string;
			client: string;
			mode: string;
			duration: string;
			start: string;
			end: string;
			status: string;
			progress: number;
			overview: string;
			objectives: string[];
			requirements: string[];
		};
		members: Array<{
			IdNumber: string;
			FullName: string;
			Designation: string;
			Department: string;
			ImageUrl: string;
			DateOfIssue: string;
			DateOfExpiry: string;
			IsActive: boolean;
		}>;
	};

	const project = data?.project;
	const members = data?.members ?? [];

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

	// Small helper for date formatting
	const fmt = (iso: string) =>
		iso
			? new Date(iso).toLocaleDateString('en-GB', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			: '-';
</script>

{#if project}
	<section class="space-y-6">
		<!-- header card -->
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
				<div>
					<h1 class="text-2xl font-semibold text-gray-800">{project.name}</h1>
					<p class="mt-1 text-sm text-gray-500">
						{project.client} 
					</p>
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
			<div class="flex space-x items-center mt-4">
                {#each project.logos as logo}
                    <img src={logo} alt="Logo" class="h-12 w-auto object-contain" />
                {/each}
                <!-- <img src={members[0].ImageUrl} alt={members[0].FullName} class="w-12 h-12 rounded-full border-2 border-white" /> -->
            </div>
			<!-- <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
				<div class="flex items-center gap-2">
					<Calendar class="w-4 h-4 text-gray-400" />
					<span><strong>Start:</strong> {fmt(project.start)}</span>
				</div>
				<div class="flex items-center gap-2">
					<Calendar class="w-4 h-4 text-gray-400" />
					<span><strong>End:</strong> {fmt(project.end)}</span>
				</div>
				<div class="flex items-center gap-2">
					<Users class="w-4 h-4 text-gray-400" />
					<span><strong>Members:</strong> {members.length}</span>
				</div>
			</div> -->

			<!-- progress -->
		</div>

		<!-- Objectives & requirements -->
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
				<h2 class="mb-3 text-lg font-semibold text-gray-800">Training Objectives</h2>
				<ul class="list-disc space-y-2 pl-5 text-sm text-gray-600">
					{#each project.objectives ?? [] as obj}
						<li>{obj}</li>
					{/each}
				</ul>
			</div>
			
		</div>

		<!-- Members grid -->
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-semibold text-gray-800">Project Members</h2>
				<span class="text-sm text-gray-500">{members.length} total</span>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each members as m (m.IdNumber)}
					<a
                        href='/members/{m.IdNumber}'
						class="cursor-pointer flex flex-col rounded-2xl border border-gray-100 bg-white p-4 transition hover:shadow-md"
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
								class={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getActiveBadge(m.IsActive)}`}
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
			</div>
		</div>
	</section>
{:else}
	<div class="p-6">
		<p class="text-gray-500">Project data not available.</p>
	</div>
{/if}

<style>
	/* optional small tweak to keep card heights similar */
	article {
		min-height: 160px;
	}
</style>
