<script lang="ts">
	import { get } from '$lib/apiClient';
	import type { TopMetric } from '$lib/googleAnalytics/interfaces';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	export let startDate: string;
	export let endDate: string;
	export let metricLabel: string;
	export let metricLabelPlural: string;
	export let metricType: string;

	let limit: number = 10;

	async function loadTopMetrics(startDate: string, endDate: string, limit: number) {
		const topSources = await get<TopMetric[]>('topMetrics', {
			startDate,
			endDate,
			metricType,
			limit
		});
		const tableTopSources: TableSource = {
			head: [metricLabel, 'Total visitors'],
			body: tableMapperValues(topSources, ['name', 'value'])
		};
		return tableTopSources;
	}

	function setLimit(newLimit: number) {
		limit = newLimit;
	}
</script>

<div class="card variant-filled-primary grow">
	<header class="card-header">
		Top {limit}
		{metricLabelPlural}

		<div class="flex gap-4 flex-col sm:flex-row">
			<a on:click|preventDefault={() => setLimit(10)} href="."> Limit 10 </a>
			<a on:click|preventDefault={() => setLimit(20)} href="."> Limit 20 </a>
			<a on:click|preventDefault={() => setLimit(50)} href="."> Limit 50 </a>
		</div>
	</header>
	<div class="p-4 text-xl">
		{#await loadTopMetrics(startDate, endDate, limit)}
			<div>Loading...</div>
		{:then topMetrics}
			<Table source={topMetrics} interactive={true} />
		{:catch error}
			<div>{error.message}</div>
		{/await}
	</div>
</div>
