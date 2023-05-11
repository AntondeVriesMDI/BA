<script>
  import Video from "./components/Video.svelte";
  import Ici from "./components/Ici.svelte";
  import Aci from "./components/Aci.svelte";
  import Td from "./components/Td.svelte";
  import Iecei from "./components/Iecei.svelte";
  import Tdece from "./components/Tdece.svelte";
  import Aecei from "./components/Aecei.svelte";
  /**
   * Top-Level Komponente der Web-App
   * Enthält alle weiteren Komponenten (Displays+Video)
   * Sowie das Grundlayout der Web-App
   *
   * ÜBERNOMMEN AUS WEBAPP DER EDA-STUDIE
   * Kleine Veränderungen im Style sowie Grid-Struktur wurden von selbst durchgeführt
   */

  /**
   * Optionen für das Display-DropDown
   */
  const displayOptions = [
    { name: "ICI", component: Ici },
    { name: "ACI", component: Aci },
    { name: "TD", component: Td },
    { name: "IECEI", component: Iecei },
    { name: "TD-ECE", component: Tdece },
    { name: "AECEI", component: Aecei },
  ];

  /**
   * Optionen für das Video-DropDown
   */
  const videoOption = [{ name: "v1_stark", offset: 6.2 }];

  const USE_VIDEO = true;
  let selectedVideo = videoOption[0];
  let selectedDisplay = displayOptions[0];
  let data;
  let paused = true;

  export let dataObject;

  /**
   * Speichert DataObjekt (data.json) in data-variable
   */
  $: {
    data = dataObject["v1_stark"];
  }
  /**
   * Regelt das Asubölenden der DropDown-Felder + das Absielen des Videos
   * @param event
   */
  function playPause(event) {
    paused = !event.detail;
  }
</script>

<main>
  <div class="container-fluid  pt-5 pb-5">
    <div class="columns is-centered">
      <div class="column" />
      {#if USE_VIDEO}
        <div class="column is-half">
          <Video
            on:playPause={playPause}
            video={selectedVideo.name}
            {data}
            offset={selectedVideo.offset}
          />
        </div>
      {/if}
      <div class="column" />
    </div>

    <div class="columns is-cenered is-variable">
      <div class="column">
        {#if paused}
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child">
                <select bind:value={selectedVideo}>
                  {#each videoOption as option}
                    <option value={option}>{option.name}</option>
                  {/each}
                </select>
              </div>
              <div class="tile is-child">
                <select bind:value={selectedDisplay}>
                  {#each displayOptions as option}
                    <option value={option}>{option.name}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <div class="column is-on-third">
        <div class="card is-centered">
          <svelte:component this={selectedDisplay.component} />
        </div>
      </div>
      <div class="column" />
    </div>
  </div>
</main>

<style>
  main {
    background-color: #232f38;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .card {
    background-color: #2d3d49;
  }
  select {
    display: block;
    margin: auto;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
