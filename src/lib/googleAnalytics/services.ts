import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Interval, getGoogleAnalyticsClient, MetricType } from './interfaces';

import type { SummaryReport, Summary } from './interfaces';

dayjs.extend(customParseFormat);

export async function getSummary({
	startDate,
	endDate
}: {
	startDate: string;
	endDate: string;
}): Promise<SummaryReport> {
	const currentPeriodStart = parseDate(startDate);
	const currentPeriodEnd = parseDate(endDate);
	const diffDay = currentPeriodEnd.diff(currentPeriodStart, 'day');

	const previousPeriodStart = currentPeriodStart.subtract(diffDay + 1, 'day');
	const previousPeriodEnd = currentPeriodEnd.subtract(diffDay + 1, 'day');

	const client = getGoogleAnalyticsClient();
	const currentPeriod = await client.getSummary(
		currentPeriodStart.format('YYYY-MM-DD'),
		currentPeriodEnd.format('YYYY-MM-DD')
	);
	const previousPeriod = await client.getSummary(
		previousPeriodStart.format('YYYY-MM-DD'),
		previousPeriodEnd.format('YYYY-MM-DD')
	);
	const diff = getDiff(currentPeriod, previousPeriod);
	return { currentPeriod, previousPeriod, diff };
}

function getDiff(currentPeriod: Summary, previousPeriod: Summary): Summary {
	return {
		uniqueVisitors: currentPeriod.uniqueVisitors - previousPeriod.uniqueVisitors,
		totalPageviews: currentPeriod.totalPageviews - previousPeriod.totalPageviews,
		bounceRate: currentPeriod.bounceRate - previousPeriod.bounceRate,
		visitDuration: currentPeriod.visitDuration - previousPeriod.visitDuration
	};
}

/**
 * Helper function to parse a date string into a dayjs object.
 */
function parseDate(dateString: string): dayjs.Dayjs {
	const date = dayjs(dateString, 'YYYY-MM-DD');
	if (!date.isValid()) {
		throw new Error(`Invalid date: ${dateString}`);
	}
	return date;
}

export async function topMetrics({
	startDate,
	endDate,
	metricType,
	limit
}: {
	startDate: string;
	endDate: string;
	metricType: string;
	limit: number;
}) {
	const client = getGoogleAnalyticsClient();
	return await client.getTopMetrics(startDate, endDate, metricType as MetricType, limit);
}

export async function getIntervalReports({
	startDate,
	endDate,
	interval
}: {
	startDate: string;
	endDate: string;
	interval: string;
}) {
	const client = getGoogleAnalyticsClient();
	return await client.getIntervalReports(startDate, endDate, interval as Interval);
}
