import type { PageServerLoad } from './$types';
import { getIntervalReports, summary, topMetrics } from '$lib/googleAnalytics/services';

export const load = (async () => {
	const startDate = '2023-02-12';
	const endDate = '2023-02-24';
	const limit = 10;

	const summaryReportPromise = summary({
		startDate,
		endDate
	});
	const intervalReportsPromise = getIntervalReports({
		startDate,
		endDate,
		interval: 'day'
	});

	const topSourcesPromise = topMetrics({
		startDate,
		endDate,
		metricType: 'TOP_SOURCES',
		limit
	});
	const topPagesPromise = topMetrics({
		startDate,
		endDate,
		metricType: 'TOP_PAGES',
		limit
	});
	const topCountriesPromise = topMetrics({
		startDate,
		endDate,
		metricType: 'TOP_COUNTRIES',
		limit
	});
	const topDevicesPromise = topMetrics({
		startDate,
		endDate,
		metricType: 'TOP_DEVICES',
		limit
	});

	const [summaryReport, intervalReports, topSources, topPages, topCountries, topDevices] =
		await Promise.all([
			summaryReportPromise,
			intervalReportsPromise,
			topSourcesPromise,
			topPagesPromise,
			topCountriesPromise,
			topDevicesPromise
		]);

	return {
		summaryReport,
		intervalReports,
		topSources,
		topPages,
		topCountries,
		topDevices
	};
}) satisfies PageServerLoad;
