// src/routes/projects/[id]/+page.server.ts
import type { PageServerLoad } from './$types';
import members from '$lib/data/GHIMSProjectMembers.json';

export const load: PageServerLoad = async ({ params }) => {
	const project = {
		id: params.id,
		slug: params.id,
		name: 'GHIMS',
		client: 'Ministry of Health, Ghana Health Service',
		mode: '',
		duration: '',
		start: '2025-10-29',
        logos: [
            '/ghs-official.avif',
            '/coa.svg',
        ],
		end: '2025-11-01',
		status: 'In Progress',
		progress: 80,
		overview:
			'The project encompasses the deployment, training, and support of the Ghana Health Information Management System across healthcare institutions in all regions of Ghana.',
		objectives: [
			'Provide trainers with a comprehensive understanding of system modules, workflows and reporting.',
			'Standardise facilitation methods and training materials for consistent field delivery.',
			'Familiarise trainers with system configuration, data structures, and reporting tools.',
			'Ensure trainers understand data protection, confidentiality, and professional communication protocols.'
		],
		requirements: [
			'Laptop or desktop with a working microphone',
			'Stable internet connection',
			'Quiet, distraction-free environment for sessions',
			'Display full name when joining sessions'
		]
	};

	const membersList = Array.isArray(members) ? members : [];

	return {
		project,
		members: membersList
	};
};
