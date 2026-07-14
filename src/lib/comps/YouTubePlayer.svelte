<script lang="ts">
	import { PlayerState } from '$lib/player.svelte';
	import { onMount } from 'svelte';

	let {
		playerState = $bindable(new PlayerState())
	}: {
		playerState: PlayerState;
	} = $props();

	let player: YT.Player | undefined;
	let progressInterval: ReturnType<typeof setInterval>;

	interface YouTubeTrackMeta {
		title: string;
		author_name: string;
		thumbnail_url: string;
	}

	async function getTrackMetadata(trackId: string): Promise<YouTubeTrackMeta> {
		const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${trackId}&format=json`;
		const response = await fetch(url);
		const data = await response.json();
		return {
			title: data.title,
			author_name: data.author_name, // The channel / artist name
			thumbnail_url: data.thumbnail_url
		};
	}

	onMount(() => {
		// 1. Load the YouTube IFrame API script globally
		if (!window.YT) {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
		}

		// 2. The API calls this global function once the script is ready
		window.onYouTubeIframeAPIReady = () => {
			initializePlayer();
		};

		// If the script was already loaded by another page/component
		if (window.YT && window.YT.Player) {
			initializePlayer();
		}

		return () => {
			clearInterval(progressInterval);
		};
	});

	function initializePlayer() {
		player = new window.YT.Player('hidden-yt-player', {
			height: '0',
			width: '0',
			videoId: playerState.currentTrackId,
			playerVars: {
				playsinline: 1,
				controls: 0, // Disable default YouTube overlays
				disablekb: 1
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
			}
		});
	}

	function onPlayerReady(event: YT.PlayerEvent) {
		if (!player) return;
		console.log('YouTube Player is ready!', event);
		playerState.duration = player.getDuration();
	}

	function onPlayerStateChange(event: YT.OnStateChangeEvent) {
		if (!player) return;
		// YT.PlayerState.PLAYING === 1
		if (event.data === window.YT.PlayerState.PLAYING) {
			playerState.isPlaying = true;
			playerState.duration = player.getDuration();
			getTrackMetadata(playerState.currentTrackId).then((meta) => {
				playerState.metadata = {
					title: meta.title,
					artist: meta.author_name,
					thumbnail: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${playerState.currentTrackId}&format=json`
				};
			});

			// Start tracking song progress for your custom bar
			progressInterval = setInterval(() => {
				if (!player) return;
				playerState.currentTime = player.getCurrentTime();
			}, 250);
		} else {
			playerState.isPlaying = false;
			clearInterval(progressInterval);
		}
	}

	playerState.events = {
		play: () => {
			player?.playVideo();
		},
		pause: () => {
			player?.pauseVideo();
		},
		seek: (time: number) => {
			player?.seekTo(time, true);
		},
		playTrack: (id: string) => {
			playTrack(id);
		}
	};

	function playTrack(trackId: string) {
		if (!player) return;
		player.loadVideoById(trackId);
	}
</script>

<div id="hidden-yt-player" style="display: none;"></div>
