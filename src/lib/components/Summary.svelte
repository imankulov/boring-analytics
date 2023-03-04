<script lang="ts">
	import { get } from '$lib/apiClient';
	import {
		formatBounceRate,
		formatBounceRateWithPlusSign,
		formatVisitDuration,
		formatVisitDurationWithPlusSign,
		formatWithPlusSign
	} from './formatters';
	import type { SummaryReport } from '$lib/googleAnalytics/interfaces';
	import SummaryCard from './SummaryCard.svelte';

	export let startDate: string;
	export let endDate: string;

	async function loadSummaryReport(startDate: string, endDate: string) {
		return await get<SummaryReport>('summary', { startDate, endDate });
	}
</script>

<div class="flex gap-4 sm:flex-row flex-col">
	{#await loadSummaryReport(startDate, endDate)}
		<SummaryCard header="Unique visitors" />
		<SummaryCard header="Total pageviews" />
		<SummaryCard header="Bounce rate" />
		<SummaryCard header="Visit duration" />
	{:then summary}
		<SummaryCard
			header="Unique visitors"
			value={summary.currentPeriod.uniqueVisitors.toLocaleString()}
			diff={formatWithPlusSign(summary.diff.uniqueVisitors)}
		/>
		<SummaryCard
			header="Total pageviews"
			value={summary.currentPeriod.totalPageviews.toLocaleString()}
			diff={formatWithPlusSign(summary.diff.totalPageviews)}
		/>

		<SummaryCard
			header="Bounce rate"
			value={formatBounceRate(summary.currentPeriod.bounceRate)}
			diff={formatBounceRateWithPlusSign(summary.diff.bounceRate)}
		/>

		<SummaryCard
			header="Visit duration"
			value={formatVisitDuration(summary.currentPeriod.visitDuration)}
			diff={formatVisitDurationWithPlusSign(summary.diff.visitDuration)}
		/>
	{:catch}
		<div>Failed to load summary report</div>
	{/await}
</div>
