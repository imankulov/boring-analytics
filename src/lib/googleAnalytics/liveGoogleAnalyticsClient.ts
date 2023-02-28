import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from '@google-analytics/data/build/protos/protos';

import { logger } from '$lib/logger';
import type {
	IntervalReportSet,
	Interval,
	TopMetric,
	Summary,
	GoogleAnalyticsClient
} from './interfaces';

import { MetricType } from './interfaces';

import MetricAggregation = google.analytics.data.v1beta.MetricAggregation;

export class LiveGoogleAnalyticsClient implements GoogleAnalyticsClient {
	private analyticsDataClient: BetaAnalyticsDataClient;

	constructor(private keyFilename: string, private propertyId: string) {
		this.analyticsDataClient = new BetaAnalyticsDataClient({
			keyFilename
		});
	}

	/**
	 * Return the total number of visitors by day.
	 */
	async getIntervalReports(
		startDate: string,
		endDate: string,
		interval: Interval
	): Promise<IntervalReportSet> {
		const [response] = await this.analyticsDataClient.runReport({
			property: `properties/${this.propertyId}`,
			dateRanges: [
				{
					startDate,
					endDate
				}
			],
			dimensions: [
				{
					name: interval
				}
			],
			metrics: [
				{
					name: 'activeUsers'
				}
			],
			metricAggregations: [MetricAggregation.TOTAL],
			keepEmptyRows: true,
			orderBys: [{ dimension: { dimensionName: interval }, desc: false }]
		});

		const total = parseInt(response.totals?.[0].metricValues?.[0]?.value ?? '0');
		const rows = (response.rows ?? []).map((row) => {
			const dm = getFirstDimensionAndMetric(row);
			return {
				date: dm.dimension,
				totalUsers: dm.metric
			};
		});

		const query = { startDate, endDate, interval };
		const data = { total, rows };
		logger.debug({ query, data }, 'Getting interval reports from Google Analytics');
		return data;
	}

	/** Return the summary of the website for the given period. */
	async getSummary(startDate: string, endDate = 'today'): Promise<Summary> {
		const [response] = await this.analyticsDataClient.runReport({
			property: `properties/${this.propertyId}`,
			dateRanges: [
				{
					startDate,
					endDate
				}
			],
			dimensions: [],
			metrics: [
				{
					name: 'activeUsers'
				},
				{
					name: 'screenPageViews'
				},
				{
					name: 'bounceRate'
				},
				{
					name: 'averageSessionDuration'
				}
			],
			metricAggregations: [MetricAggregation.TOTAL]
		});

		const metricValues = response.totals?.[0].metricValues;
		const query = { startDate, endDate };
		const data = {
			uniqueVisitors: parseInt(metricValues?.[0]?.value ?? '0'),
			totalPageviews: parseInt(metricValues?.[1]?.value ?? '0'),
			bounceRate: parseFloat(metricValues?.[2]?.value ?? '0'),
			visitDuration: parseFloat(metricValues?.[3]?.value ?? '0')
		};
		logger.debug({ query, data }, 'Getting summary from Google Analytics');
		return data;
	}

	async getTopMetrics(
		startDate: string,
		endDate: string,
		metricType: MetricType,
		limit: number
	): Promise<TopMetric[]> {
		const googleMetricType = {
			[MetricType.TOP_SOURCES]: 'sessionSource',
			[MetricType.TOP_PAGES]: 'unifiedPagePathScreen',
			[MetricType.TOP_DEVICES]: 'deviceCategory',
			[MetricType.TOP_COUNTRIES]: 'country',
			[MetricType.TOP_CITIES]: 'city'
		}[metricType];

		const [response] = await this.analyticsDataClient.runReport({
			property: `properties/${this.propertyId}`,
			dateRanges: [
				{
					startDate,
					endDate
				}
			],
			dimensions: [
				{
					name: googleMetricType
				}
			],
			metrics: [
				{
					name: 'activeUsers'
				}
			],
			metricAggregations: [MetricAggregation.TOTAL],
			limit
		});
		const query = { startDate, endDate, metricType };
		const data = (response.rows ?? []).map((row) => {
			const dm = getFirstDimensionAndMetric(row);
			return {
				name: dm.dimension,
				value: dm.metric
			};
		});
		logger.debug({ query, data }, 'Getting top metrics from Google Analytics');
		return data;
	}
}

function getFirstDimensionAndMetric(row: google.analytics.data.v1beta.IRow) {
	if (
		!row.dimensionValues ||
		!row.metricValues ||
		!row.dimensionValues[0] ||
		!row.metricValues[0].value
	) {
		return {
			dimension: '',
			metric: 0
		};
	}
	return {
		dimension: row.dimensionValues[0].value ?? '',
		metric: parseInt(row.metricValues[0].value)
	};
}
