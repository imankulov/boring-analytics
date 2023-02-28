<script>
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<div class="container mx-auto">
		<div class="flex flex-row items-end">
			<span class="material-symbols-outlined text-xl">monitoring</span>
			<span class="text-xl">boring analytics</span>
		</div>
	</div>
</AppBar>
<div
	class="py-4 flex-col gap-4 container h-full mx-auto flex justify-start align-items-stretch px-4 sm:px-0"
>
	<slot />
</div>
