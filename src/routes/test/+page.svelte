<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let socket: WebSocket | undefined = $state(undefined);
  let connected = $state(false);

  // Initialize all values with defaults so the HSL math doesn't result in NaN before connecting!
  let telemetry = $state({
    speed: 0,
    gear: '?',
    tyreTempFL: 50, // Default safe temp (degrees C)
    tyreTempFR: 50,
  });

  function connectSimHub() {
    socket = new WebSocket('ws://127.0.0.1:8888/ws');

    socket.onopen = () => {
      connected = true;

      if (!socket) return;

      // Cleaned up: Removed 'DataCorePlugin.' from the property names
      socket.send(JSON.stringify({
        "Header": {
          "Type": "RegisterReader"
        },
        "Payload": {
          "Properties": [
            "GameData.NewData.SpeedKmh",
            "GameData.NewData.Gear",
            "GameData.NewData.TyreTemperatureFrontLeft",
            "GameData.NewData.TyreTemperatureFrontRight"
          ]
        }
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data && data.Values) {
        // Cleaned up here as well to match the new keys!
        telemetry = {
          speed: Math.round(data.Values["GameData.NewData.SpeedKmh"] || 0),
          gear: data.Values["GameData.NewData.Gear"] || '?',
          tyreTempFL: Math.round(data.Values["GameData.NewData.TyreTemperatureFrontLeft"] || 50),
          tyreTempFR: Math.round(data.Values["GameData.NewData.TyreTemperatureFrontRight"] || 50),
        };
      }
    };

    socket.onclose = () => {
      connected = false;
    };
  }

  onMount(() => {
    connectSimHub();
  });

  onDestroy(() => {
    if (socket) socket.close();
  });
</script>

<main>
  <div class="status">
    {#if connected}
      <span class="badge online">LIVE RIG TELEMETRY</span>
    {:else}
      <span class="badge offline">OFFLINE</span>
    {/if}
  </div>

  <div class="dash-grid">
    <div class="telemetry-card">
      <h2>Speed: {telemetry.speed} km/h</h2>
      <h2>Gear: {telemetry.gear}</h2>
    </div>

    <div class="car-visual">
      <!-- Dynamic HSL transitions safely now that defaults are 50! -->
      <div
        class="tire front-left"
        style="background-color: hsl({Math.max(0, 220 - (telemetry.tyreTempFL - 50) * 4)}, 80%, 50%)"
      >
        FL: {telemetry.tyreTempFL}°C
      </div>

      <div
        class="tire front-right"
        style="background-color: hsl({Math.max(0, 220 - (telemetry.tyreTempFR - 50) * 4)}, 80%, 50%)"
      >
        FR: {telemetry.tyreTempFR}°C
      </div>
    </div>
  </div>
</main>

<style>
  .badge { padding: 4px 8px; border-radius: 4px; font-weight: bold; }
  .online { background: #059669; color: white; }
  .offline { background: #d97706; color: white; }
  .car-visual { display: flex; gap: 20px; margin-top: 20px; }
  .tire {
    width: 80px;
    height: 120px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
    transition: background-color 0.1s ease;
  }
</style>
