<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler
	} from 'chart.js';
	import type { IntervalReportSet } from '$lib/googleAnalytics/interfaces';
	import { get } from '$lib/apiClient';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler
	);

	export let startDate: string;
	export let endDate: string;
	let graphHeight: string = '30vh';

	async function loadIntervalPlotData(startDate: string, endDate: string) {
		const intervalReports = await get<IntervalReportSet>('intervalReports', { startDate, endDate });
		const lineData = {
			labels: intervalReports.rows.map((row) => row.date),
			datasets: [
				{
					label: `Total visitors between ${startDate} and ${endDate}`,
					data: intervalReports.rows.map((row) => row.totalUsers),
					// Color const comes from the theme "--color-surface-800".
					borderColor: 'rgba(59, 71, 98, 0.6)',
					backgroundColor: 'rgba(59, 71, 98, 0.2)',
					fill: 'start',
					pointRadius: 0,
					pointHitRadius: 16
				}
			]
		};
		return { lineData, intervalReports };
	}
</script>

<div class="card variant-filled-primary">
	{#await loadIntervalPlotData(startDate, endDate)}
		<div style={`height: ${graphHeight}`} class="p-2">Total visitors: Loading...</div>
	{:then { lineData, intervalReports }}
		<header class="card-header">Total visitors: {intervalReports.total.toFixed()}</header>
		<div class="chart-container p-2" style={`height: ${graphHeight}`}>
			<Line data={lineData} options={{ maintainAspectRatio: false }} />
		</div>
	{:catch}
		<div>Failed to load data</div>
	{/await}
</div>
