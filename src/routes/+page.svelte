<script lang="ts">
	import YouTubePlayer from '$lib/comps/YouTubePlayer.svelte';
	import { PlayerState } from '$lib/player.svelte';

	let playerState = $state(new PlayerState());
</script>

<YouTubePlayer bind:playerState />
