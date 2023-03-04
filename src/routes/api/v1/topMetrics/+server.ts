import { topMetrics } from '$lib/googleAnalytics/services';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const startDate = url.searchParams.get('startDate') || '2023-02-12';
	const endDate = url.searchParams.get('endDate') || '2023-02-24';
	const metricType = url.searchParams.get('metricType') || 'TOP_COUNTRIES';
	const limit = parseInt(url.searchParams.get('limit') || '10');
	const resp = await topMetrics({
		startDate,
		endDate,
		metricType,
		limit
	});
	return json(resp);
}) satisfies RequestHandler;
