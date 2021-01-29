<script>
  import Video from "./components/Video.svelte";
  import TimeStream from "./components/TimeStream.svelte";
  import TripInfo from "./components/TripInfo.svelte";
  import EnergyFlow from "./components/EnergyFlow.svelte";
  import EnergyFlowWithKm from "./components/EnergyFlowWithKm.svelte";
  import Pedals from "./components/Pedals.svelte";
  import HistoryCurve from "./components/HistoryCurve.svelte";
  import HistoryCurveWithKm from "./components/HistoryCurveWithKm.svelte";
  import HistoryCurveKmX from "./components/HistoryCurveKmX.svelte";
  import ConsumptionBar from "./components/ConsumptionBar.svelte";
  import ConsumptionBarWithKm from "./components/ConsumptionBarWithKm.svelte";
  import ConsumptionText from "./components/ConsumptionText.svelte";
  import ConsumptionTextWithKm from "./components/ConsumptionTextWithKm.svelte";
  import { onMount } from "svelte";

  const USE_VIDEO = true;
  export let dataObject;
  let data;
  let paused = true;
  $: {
    data = dataObject[selectedVideo.filename];
  }

  const visOptions = [
    { name: "HistoryCurveKmX", component: HistoryCurveKmX },
    { name: "EnergyFlow", component: EnergyFlow },
    { name: "EnergyFlowWithKm", component: EnergyFlowWithKm },
    { name: "HistoryCurve", component: HistoryCurve },
    { name: "HistoryCurveWithKm", component: HistoryCurveWithKm },
    { name: "ConsumptionBar", component: ConsumptionBar },
    { name: "ConsumptionBarWithKm", component: ConsumptionBarWithKm },
    { name: "ConsumptionText", component: ConsumptionText },
    { name: "ConsumptionTextWithKm", component: ConsumptionTextWithKm }
  ];

  let selectedVis = visOptions[0];

// Marli Low E 1:30-3:53
// Marli High E 1:18-4:28
// Insel Low E 2:43-5:37
// Insel High E 5:05-7:27
// Schwartauer Low E 1:43-6:26
// Schwartauer High E 2:07-5:10

  const videoOptions = [
    { filename: "AufMarli_LowEfficiency", offset: 25.2 },
    { filename: "Schwartauer_HighEfficiency", offset: 28.4, },
    { filename: "Schwartauer_LowEfficiency", offset: 21.8, },
    { filename: "Insel_HighEfficiency", offset: 19 },
    { filename: "Insel_LowEfficiency", offset: 19.8 },
    { filename: "AufMarli_HighEfficiency", offset: 20.9 },
    { filename: "Test", offset: 17.8 },
  ];
  // Chang this for different Videos
  let selectedVideo = videoOptions[0];

  function playPause(event) {
    console.log(event)
    paused = !event.detail;
  }
</script>

<style>
  :root {
    --blue: #38b3f5;
  }
  main {
    background-image: linear-gradient(#44505e, #2a3a48);
    height: 100%;
    width: 100%;
  }
  .container {
    height: 100%;
  }
  .card {
    background-image: linear-gradient(#3c4957, #344351);

    border-radius: 5px;
  }
</style>

<main>
  <div class="container-fluid  pt-5 pb-5 ">
    <div class="columns is-centered ">
      {#if paused}
        <div class="colum is-1">
          <select bind:value={selectedVideo}>
            {#each videoOptions as option}
              <option value={option}>{option.filename}</option>
            {/each}
          </select>
          <select bind:value={selectedVis}>
            {#each visOptions as option}
              <option value={option}>{option.name}</option>
            {/each}
          </select>
        </div>
      {/if}
      {#if USE_VIDEO}
        <div class="column is-8">
          <Video
            on:playPause={playPause}
            video={selectedVideo.filename}
            {data}
            offset={selectedVideo.offset} />
        </div>
      {:else}
        <TimeStream {data} />
      {/if}
    </div>
    <div class="columns is-centered is-variable is-6">
      <div class="column is-2 ">
        <div class="card">
          <TripInfo />
        </div>
      </div>
      <div class="column is-4">
        <div class="card">
          <svelte:component this={selectedVis.component} />
          <!-- <ConsumptionBarWithKm/> -->
          <!-- <EnergyFlow />
            <HistoryCurve  /> -->

          <!-- <ConsumptionBar /> -->

        </div>
      </div>
      <div class="column is-2 ">
        <div class="card">
          <Pedals />
        </div>
      </div>
    </div>
  </div>
</main>
