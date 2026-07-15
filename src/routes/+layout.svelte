<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '@phosphor-icons/web/regular';
	import '@phosphor-icons/web/fill';
	import '../global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
