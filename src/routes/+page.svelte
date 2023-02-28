<script lang="ts">
	import type { PageData } from './$types';
	import {
		formatBounceRate,
		formatBounceRateWithPlusSign,
		formatVisitDuration,
		formatVisitDurationWithPlusSign,
		formatWithPlusSign
	} from './formatters';
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

	export let data: PageData;

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

	const lineData = {
		labels: data.intervalReports.rows.map((row) => row.date),
		datasets: [
			{
				label: 'Total visitors',
				data: data.intervalReports.rows.map((row) => row.totalUsers),
				// Color const comes from the theme "--color-surface-800".
				borderColor: 'rgba(59, 71, 98, 0.6)',
				backgroundColor: 'rgba(59, 71, 98, 0.2)',
				fill: 'start',
				pointRadius: 0,
				pointHitRadius: 16
			}
		]
	};

	const tableTopSources: TableSource = {
		head: ['Source', 'Visitors'],
		body: tableMapperValues(data.topSources, ['name', 'value'])
	};
	const tableTopPages: TableSource = {
		head: ['Page', 'Visitors'],
		body: tableMapperValues(data.topPages, ['name', 'value'])
	};
	const tableTopCountries: TableSource = {
		head: ['Country', 'Visitors'],
		body: tableMapperValues(data.topCountries, ['name', 'value'])
	};
	const tableTopDevices: TableSource = {
		head: ['Device', 'Visitors'],
		body: tableMapperValues(data.topDevices, ['name', 'value'])
	};
</script>

<div class="flex gap-4 sm:flex-row flex-col">
	<div class="card variant-filled-primary grow">
		<header class="card-header">Unique visitors</header>
		<div class="p-4 text-xl">
			{data.summaryReport.currentPeriod.uniqueVisitors.toLocaleString()}
			<span class="text-sm">
				{formatWithPlusSign(data.summaryReport.diff.uniqueVisitors)}
			</span>
		</div>
	</div>

	<div class="card variant-filled-primary grow">
		<header class="card-header">Total pageviews</header>
		<div class="p-4 text-xl">
			{data.summaryReport.currentPeriod.totalPageviews.toLocaleString()}
			<span class="text-sm">
				{formatWithPlusSign(data.summaryReport.diff.totalPageviews)}
			</span>
		</div>
	</div>

	<div class="card variant-filled-primary grow">
		<header class="card-header">Bounce rate</header>
		<div class="p-4 text-xl">
			{formatBounceRate(data.summaryReport.currentPeriod.bounceRate)}
			<span class="text-sm">{formatBounceRateWithPlusSign(data.summaryReport.diff.bounceRate)}</span
			>
		</div>
	</div>

	<div class="card variant-filled-primary grow">
		<header class="card-header">Visit duration</header>
		<div class="p-4 text-xl">
			{formatVisitDuration(data.summaryReport.currentPeriod.visitDuration)}
			<span class="text-sm">
				{formatVisitDurationWithPlusSign(data.summaryReport.diff.visitDuration)}
			</span>
		</div>
	</div>
</div>

<div class="card variant-filled-primary">
	<header class="card-header">Total visitors: {data.intervalReports.total.toFixed()}</header>
	<div class="chart-container" style="height:40vh">
		<Line data={lineData} options={{ maintainAspectRatio: false }} />
	</div>
</div>

<div class="flex gap-4 sm:flex-row flex-col">
	<div class="card variant-filled-primary grow">
		<header class="card-header">Top 20 sources</header>
		<div class="p-4 text-xl">
			<Table source={tableTopSources} interactive={true} />
		</div>
	</div>

	<div class="card variant-filled-primary grow">
		<header class="card-header">Top 20 pages</header>
		<div class="p-4 text-xl">
			<Table source={tableTopPages} interactive={true} />
		</div>
	</div>
</div>

<div class="flex gap-4 sm:flex-row flex-col">
	<div class="card variant-filled-primary grow">
		<header class="card-header">Top 20 countries</header>
		<div class="p-4 text-xl">
			<Table source={tableTopCountries} interactive={true} />
		</div>
	</div>

	<div class="card variant-filled-primary grow">
		<header class="card-header">Top devices</header>
		<div class="p-4 text-xl">
			<Table source={tableTopDevices} interactive={true} />
		</div>
	</div>
</div>
