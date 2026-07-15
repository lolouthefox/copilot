<script lang="ts">
	let { data } = $props();
</script>

<div class="car-info">
	<div class="speed">
		<div class="speed-gear">
			{#if data.Gear}
				<p>{data.Gear}</p>
			{/if}
			<h1>{Math.round(data.FilteredSpeedKmh * 1)}</h1>
		</div>
		<p>KM/H</p>
	</div>
	<img src="http://localhost:8888/imagelibrary?Picture=CarView\Top.png" class="car" alt="" />
</div>

<style>
	.speed {
		width: 100%;
		padding: 32px;
	}
	.speed-gear {
		display: flex;
		align-items: baseline;
		gap: 12px;
	}
	.speed-gear p {
		font-size: 16px;
		height: 32px;
		width: 32px;
		background-color: white;
		color: black;
		border-radius: calc(1px * infinity);
		font-weight: bold;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.speed h1 {
		font-size: 64px;
	}
	.car-info {
		flex: 1;
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 32px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.car {
		width: 35%;
		height: 50%;
		object-fit: contain;
	}
</style>
