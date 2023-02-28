import type {
  IntervalReportSet,
  TopMetric,
  Summary,
  GoogleAnalyticsClient,
} from './interfaces'

export class MockGoogleAnalyticsClient implements GoogleAnalyticsClient {
  async getIntervalReports(): Promise<IntervalReportSet> {
    return {
      total: 330,
      rows: [
        { date: '20230101', totalUsers: 100 },
        { date: '20230102', totalUsers: 80 },
        { date: '20230103', totalUsers: 91 },
        { date: '20230104', totalUsers: 95 },
        { date: '20230105', totalUsers: 77 },
        { date: '20230106', totalUsers: 60 },
        { date: '20230107', totalUsers: 101 },
      ],
    }
  }
  async getSummary(): Promise<Summary> {
    return {
      uniqueVisitors: 100,
      totalPageviews: 330,
      bounceRate: 0.9,
      visitDuration: 33,
    }
  }
  async getTopMetrics(): Promise<TopMetric[]> {
    return [
      { name: 'google.com', value: 100 },
      { name: 'facebook.com', value: 80 },
      { name: 'instagram.com', value: 91 },
      { name: 'twitter.com', value: 95 },
      { name: 'linkedin.com', value: 77 },
      { name: 'youtube.com', value: 60 },
      { name: 'reddit.com', value: 101 },
    ]
  }
}
