import { describe, expect, it } from 'vitest'
import { env } from '$env/dynamic/private';


import {
  Interval,
  MetricType,
} from './interfaces'
import { LiveGoogleAnalyticsClient } from './liveGoogleAnalyticsClient'

const client = new LiveGoogleAnalyticsClient(
  env.GOOGLE_ANALYTICS_KEY,
  env.GOOGLE_ANALYTICS_PROPERTY_ID
)

describe('LiveGoogleAnalyticsClient', () => {
  it('returns daily reports', async () => {
    const dailyReports = await client.getIntervalReports(
      '2023-01-16',
      '2023-01-17',
      Interval.DATE
    )
    expect(dailyReports.total).toBeGreaterThan(0)
    expect(dailyReports.rows.length).toEqual(2)
    expect(dailyReports.rows[0].date).toEqual('20230116')
    expect(dailyReports.rows[0].totalUsers).toBeGreaterThan(0)
    expect(dailyReports.rows[1].date).toEqual('20230117')
    expect(dailyReports.rows[1].totalUsers).toBeGreaterThan(0)
  })

  it('returns summary', async () => {
    const summary = await client.getSummary('2023-01-16', '2023-01-17')
    expect(summary.uniqueVisitors).toBeGreaterThan(0)
    expect(summary.totalPageviews).toBeGreaterThan(0)
    expect(summary.bounceRate).toBeGreaterThan(0)
    expect(summary.visitDuration).toBeGreaterThan(0)
  })

  it('returns top metrics', async () => {
    const topMetrics = await client.getTopMetrics(
      '2023-01-16',
      '2023-01-17',
      MetricType.TOP_PAGES
    )
    expect(topMetrics.length).toBeGreaterThan(0)
    expect(topMetrics[0].name).toBeTruthy()
    expect(topMetrics[0].value).toBeGreaterThan(0)
  })
})
