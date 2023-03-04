<script lang="ts">
	export let header: string;
	export let value: string | undefined = undefined;
	export let diff: string | undefined = undefined;
</script>

<div class="card variant-filled-primary grow">
	<header class="card-header">{header}</header>
	<div class="p-4 text-xl">
		{value ?? 'loading ...'}
		<span class="text-sm">
			{diff ?? ''}
		</span>
	</div>
</div>
