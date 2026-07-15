<script lang="ts">
	let { playerState } = $props();
</script>

<div class="player" style="background-image: url('{playerState.metadata.thumbnail}');">
	<div class="inside">
		<img src={playerState.metadata.thumbnail} alt="" />
		<div class="song-info">
			<div class="metadata">
				<h1>{playerState.metadata.title}</h1>
				<p>{playerState.metadata.artist}</p>
			</div>
			<button class="liked" aria-label="Like">
				<i class="ph-fill ph-heart"></i>
			</button>
		</div>
		<div class="seek">
			<div class="seek-bar">
				<div
					class="progress"
					style="width: {(playerState.currentTime / playerState.duration) * 100}%;"
				></div>
			</div>
		</div>
		<div class="controls">
			<button onclick={() => void 0} aria-label="Previous track">
				<i class="ph-fill ph-skip-back"></i>
			</button>
			<button onclick={() => playerState.togglePlay()} aria-label="Toggle Play" class="play">
				<i class="ph-fill ph-{playerState.isPlaying ? 'pause' : 'play'}"></i>
			</button>
			<button onclick={() => void 0} aria-label="Next track">
				<i class="ph-fill ph-skip-forward"></i>
			</button>
		</div>
	</div>
</div>

<style>
	.player {
		width: 512px;
		border-radius: 32px;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		background-color: white;
	}
	.player .inside {
		background-color: rgba(10, 10, 10, 0.75);
		backdrop-filter: blur(32px);
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 32px;
		color: white;
	}
	.player .inside img {
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 16px;
	}
	.player .inside .song-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.player .inside .metadata {
		display: flex;
		flex-direction: column;
		padding: 32px 0;
	}
	.player .inside h1 {
		font-size: 32px;
		opacity: 1;
	}
	.player .inside p {
		font-size: 16px;
		opacity: 0.75;
	}

	.liked {
		background-color: rgba(255, 255, 255, 0.25);
		border-radius: calc(1px * infinity);
		border: none;
		color: white;
		font-size: 24px;
		padding: 16px;
		display: flex;
		align-items: center;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px 0;
		gap: 16px;
	}
	.controls button {
		border-radius: calc(1px * infinity);
		background: rgba(255, 255, 255, 0.25);
		color: white;
		border: none;
		font-size: 24px;
		padding: 16px;
		display: flex;
		align-items: center;
	}
	.controls .play {
		background: white;
		color: black;
		font-size: 32px;
		padding: 24px;
	}

	.seek {
		padding: 16px 0;
	}
	.seek-bar {
		height: 8px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.25);
		border-radius: calc(1px * infinity);
		overflow: hidden;
	}
	.progress {
		height: 8px;
		height: 100%;
		background-color: white;
	}
</style>
