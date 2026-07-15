<script lang="ts">
	import Player from '$lib/comps/Player.svelte';
	import { PlayerState } from '$lib/player.svelte';

	const tabs = [
		{ label: 'Home', icon: 'ph-house' },
		{ label: 'Navigate', icon: 'ph-navigation-arrow' },
		{ label: 'Music', icon: 'ph-music-note' },
		{ label: 'Car', icon: 'ph-car' },
		{ label: 'Settings', icon: 'ph-gear-six' }
	];

	let musicApp: 'YouTube' | 'Spotify' = 'Spotify';

	let currentTab = $state(0);
	let playerState = $state(new PlayerState());
</script>

<main>
	<div class="nav">
		{#each tabs as tab, i (i)}
			<button onclick={() => (currentTab = i)} aria-label={tab.label} disabled={currentTab == i}>
				<i class="ph{currentTab == i ? '-fill' : ''} {tab.icon}"></i>
			</button>
		{/each}
	</div>
	{#if currentTab == 0}
		<div class="home-content">
			<div class="map"></div>
			<div class="map"></div>
			{#if playerState.metadata.title}
				<Player {playerState} />
			{/if}
		</div>
	{:else if currentTab == 2}
		<div class="music-content">
			<h1>{musicApp}</h1>
			<button onclick={() => playerState.playTrack('6186PJhauYc')}>Play</button>
		</div>
	{/if}
</main>

<style>
	main {
		position: fixed;
		inset: 0;
		background-color: black;
		color: white;

		display: flex;
		align-items: stretch;
		padding: 16px;
		gap: 16px;
	}
	.nav {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 32px;
		display: flex;
		flex-direction: column;
		padding: 16px;
	}
	.nav button {
		background-color: transparent;
		display: flex;
		border: none;
		color: white;
		font-size: 32px;
		padding: 16px;
		width: 100%;
		text-align: center;
		border-radius: 16px;
	}
	.nav button:disabled {
		background-color: white;
		color: black;
	}

	.home-content {
		flex: 1;
		display: flex;
		align-items: stretch;
		gap: 16px;
	}

	.map {
		flex: 1;
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 32px;
	}
</style>
