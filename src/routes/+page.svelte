<script lang="ts">
	import CarInfo from '$lib/comps/CarInfo.svelte';
	import Player from '$lib/comps/Player.svelte';
	import { PlayerState } from '$lib/player.svelte';
	import { onMount } from 'svelte';

	const tabs = [
		{ label: 'Home', icon: 'ph-house' },
		{ label: 'Navigate', icon: 'ph-navigation-arrow' },
		{ label: 'Music', icon: 'ph-music-note' },
		{ label: 'Car', icon: 'ph-car' },
		{ label: 'Settings', icon: 'ph-gear-six' }
	];

	let ws: undefined | WebSocket = undefined;
	onMount(() => {
		let socket = new WebSocket('ws://localhost:5273');
		ws = socket;

		socket.onopen = () => {
			isConnected = true;
			console.log('Connected to SimHub WebSocket!');
		};

		// 3. Handle incoming telemetry ticks
		socket.onmessage = (event) => {
			try {
				data = JSON.parse(event.data);
			} catch (err) {
				console.error('Failed to parse SimHub data:', err);
			}
		};

		socket.onerror = (error) => {
			console.error('SimHub WebSocket Error:', error);
		};

		socket.onclose = () => {
			isConnected = false;
			console.log('Disconnected from SimHub');
		};

		return () => {
			socket.close();
			ws = undefined;
		};
	});

	let isConnected = $state(false);
	let data: Record<string, any> = $state({});

	let musicApp: 'YouTube' | 'Spotify' = 'Spotify';

	let currentTab = $state(0);
	let playerState = $state(new PlayerState());

	let availableGameMaps = ['FH6', 'ETS'];
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
			<CarInfo {data} />
			{#if availableGameMaps.includes(data.GameName)}
				<div class="map">
					{#if data.GameName == 'ETS'}
						<iframe
							src="http://localhost:8888/maps/map.html?v=1784127038753#norefresh"
							title="map"
							style="pointer-events: auto;"
						></iframe>
					{/if}
					{#if data.GameName == 'FH6'}
						<iframe
							src="https://wand.com/maps/forza-horizon-6/japan"
							allow="clipboard-write"
							title="map"
							style="pointer-events: auto;"
						></iframe>
					{/if}
				</div>
			{/if}
			{#if playerState.metadata.title}
				<Player {playerState} />
			{/if}
		</div>
	{:else if currentTab == 2}
		<div class="music-content">
			<h1>{musicApp}</h1>
			<button onclick={() => playerState.playTrack('6186PJhauYc')}>Play</button>
		</div>
	{:else if currentTab == 4}
		<div class="test" style="height: 100vh; flex: 1; overflox-y: scroll;">
			<pre>{JSON.stringify(data, null, '  ')}</pre>
		</div>
	{/if}
</main>

<style>
	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
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
		overflow: hidden;
	}
</style>
