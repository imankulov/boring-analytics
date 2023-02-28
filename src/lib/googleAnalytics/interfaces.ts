import { LiveGoogleAnalyticsClient } from './liveGoogleAnalyticsClient';
import { MockGoogleAnalyticsClient } from './mockGoogleAnalyticsClient';
import { env } from '$env/dynamic/private';

export interface IntervalReportSet {
	total: number;
	rows: IntervalReport[];
}

export interface IntervalReport {
	date: string;
	totalUsers: number;
}

export interface Summary {
	uniqueVisitors: number;
	totalPageviews: number;
	bounceRate: number;
	visitDuration: number;
}

export interface TopMetric {
	name: string;
	value: number;
}

export enum Interval {
	DATE = 'date',
	DATE_HOUR = 'dateHour'
}

export enum MetricType {
	TOP_SOURCES = 'TOP_SOURCES',
	TOP_PAGES = 'TOP_PAGES',
	TOP_DEVICES = 'TOP_DEVICES',
	TOP_COUNTRIES = 'TOP_COUNTRIES',
	TOP_CITIES = 'TOP_CITIES'
}

export interface GoogleAnalyticsClient {
	getIntervalReports(
		startDate: string,
		endDate: string,
		interval: Interval
	): Promise<IntervalReportSet>;
	getTopMetrics(
		startDate: string,
		endDate: string,
		metricType: MetricType,
		limit: number
	): Promise<TopMetric[]>;
	getSummary(startDate: string, endDate: string): Promise<Summary>;
}

export function getGoogleAnalyticsClient(): GoogleAnalyticsClient {
	if (env.GOOGLE_ANALYTICS_CLIENT === 'mock') {
		return new MockGoogleAnalyticsClient();
	}
	if (env.GOOGLE_ANALYTICS_CLIENT === 'live') {
		return new LiveGoogleAnalyticsClient(
			env.GOOGLE_ANALYTICS_KEY,
			env.GOOGLE_ANALYTICS_PROPERTY_ID
		);
	}
	throw new Error('Unknown value for GOOGLE_ANALYTICS_CLIENT. Expected "mock" or "live"');
}
