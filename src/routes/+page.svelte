<script lang="ts">
	import YouTubePlayer from '$lib/comps/YouTubePlayer.svelte';
	import { PlayerState } from '$lib/player.svelte';

	let playerState = $state(new PlayerState());
</script>

<YouTubePlayer bind:playerState />

<button onclick={() => playerState.togglePlay()}>{playerState.isPlaying ? 'Pause' : 'Play'}</button>
<button onclick={() => playerState.playTrack('2vATGqooQMM')}>Play</button>
