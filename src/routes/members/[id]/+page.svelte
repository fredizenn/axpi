<script lang="ts">
	import { CheckCircle, XCircle, Calendar, User, Briefcase, Building, IdCard } from '@lucide/svelte';
	export let data;

	const member = data?.member;

	const getActiveBadge = (isActive: boolean) =>
		isActive
			? 'bg-green-100 text-green-700 border border-green-200'
			: 'bg-gray-100 text-gray-500 border border-gray-200';

	const fmt = (iso: string) =>
		iso
			? new Date(iso).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
			: '-';
</script>

{#if member}
	<section class="space-y-8 mx-auto w-full">
		<!-- Profile header -->
		<div class="bg-white mx-auto w-full rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
			<User class="w-20 h-20 text-gray-400 rounded-full bg-gray-100 p-4" />

			<div class="flex-1">
				<h2 class="text-2xl font-semibold text-gray-800">{member.FullName}</h2>
				<p class="text-gray-500 text-sm mt-1">{member.Designation}</p>
				<p class="text-gray-400 text-sm">{member.Department}</p>

				<div class="mt-4">
					<span class={`text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1 ${getActiveBadge(member.IsActive)}`}>
						{#if member.IsActive}
							<CheckCircle class="w-3.5 h-3.5" /> Active
						{:else}
							<XCircle class="w-3.5 h-3.5" /> Inactive
						{/if}
					</span>
				</div>
			</div>
		</div>

		<!-- Details grid -->
		<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Profile Information</h3>

			<div class="grid sm:grid-cols-2 gap-6 text-sm text-gray-600">
				<div class="flex items-center gap-2">
					<IdCard class="w-4 h-4 text-gray-400" />
					<p><strong>ID Number:</strong> {member.IdNumber}</p>
				</div>

				<div class="flex items-center gap-2">
					<Briefcase class="w-4 h-4 text-gray-400" />
					<p><strong>Designation:</strong> {member.Designation}</p>
				</div>

				<div class="flex items-center gap-2">
					<Building class="w-4 h-4 text-gray-400" />
					<p><strong>Department:</strong> {member.Department}</p>
				</div>

				<div class="flex items-center gap-2">
					<Calendar class="w-4 h-4 text-gray-400" />
					<p><strong>Date of Issue:</strong> {fmt(member.DateOfIssue)}</p>
				</div>

				<div class="flex items-center gap-2">
					<Calendar class="w-4 h-4 text-gray-400" />
					<p><strong>Date of Expiry:</strong> {fmt(member.DateOfExpiry)}</p>
				</div>
			</div>
		</div>

		<!-- Placeholder for future sections -->
		<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-3">Assigned Projects</h3>
			<p class="text-gray-500 text-sm">No specific projects assigned yet.</p>
		</div>
	</section>
{:else}
	<div class="p-6">
		<p class="text-gray-500">Member not found.</p>
	</div>
{/if}
