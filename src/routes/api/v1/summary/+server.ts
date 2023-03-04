import { getSummary } from '$lib/googleAnalytics/services';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const startDate = url.searchParams.get('startDate') || '2023-02-12';
	const endDate = url.searchParams.get('endDate') || '2023-02-24';
	const resp = await getSummary({
		startDate,
		endDate
	});
	return json(resp);
}) satisfies RequestHandler;
