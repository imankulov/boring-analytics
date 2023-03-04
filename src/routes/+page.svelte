<script lang="ts">
	import Summary from '$lib/components/Summary.svelte';
	import IntervalPlot from '$lib/components/IntervalPlot.svelte';
	import TopMetrics from '$lib/components/TopMetrics.svelte';

	let startDate = '2023-02-12';
	let endDate = '2023-02-24';

	function setLastWeek() {
		const today = new Date();
		const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
		startDate = lastWeek.toISOString().split('T')[0];
		endDate = today.toISOString().split('T')[0];
	}

	function setLast30Days() {
		const today = new Date();
		const last30Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
		startDate = last30Days.toISOString().split('T')[0];
		endDate = today.toISOString().split('T')[0];
	}

	setLastWeek();
</script>

<div class="flex gap-4 flex-col sm:flex-row">
	<a on:click|preventDefault={setLastWeek} href="."> Last week </a>
	<a on:click|preventDefault={setLast30Days} href="."> Last 30 days </a>
</div>

<Summary {startDate} {endDate} />
<IntervalPlot {startDate} {endDate} />

<div class="flex gap-4 sm:flex-row flex-col">
	<TopMetrics
		{startDate}
		{endDate}
		metricLabel="Source"
		metricLabelPlural="sources"
		metricType="TOP_SOURCES"
	/>
	<TopMetrics
		{startDate}
		{endDate}
		metricLabel="Page"
		metricLabelPlural="pages"
		metricType="TOP_PAGES"
	/>
</div>

<div class="flex gap-4 sm:flex-row flex-col">
	<TopMetrics
		{startDate}
		{endDate}
		metricLabel="Country"
		metricLabelPlural="countries"
		metricType="TOP_COUNTRIES"
	/>
	<TopMetrics
		{startDate}
		{endDate}
		metricLabel="Device"
		metricLabelPlural="devices"
		metricType="TOP_DEVICES"
	/>
</div>
