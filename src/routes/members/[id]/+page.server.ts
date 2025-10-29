// src/routes/members/[id]/+page.server.ts
import type { PageServerLoad } from './$types';
import members from '$lib/data/GHIMSProjectMembers.json';

export const load: PageServerLoad = async ({ params }) => {
	const member = (Array.isArray(members) ? members : []).find(
		(m) => m.IdNumber.toLowerCase() === params.id.toLowerCase()
	);

	if (!member) {
		return {
			status: 404,
			error: new Error('Member not found')
		};
	}

	return {
		member
	};
};
