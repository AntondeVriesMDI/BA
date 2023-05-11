<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { currentDataPoint } from "../Stores/dataPoints.js";
  import { futureDataPoint } from "../Stores/dataPoints.js";

  /**
   * Video Komponente, enthält das Video.
   * Regelt das durchlaufen des data.json files
   *
   * AUS WEBAPP DER EDA-STUDIE ÜBERNOMMEN
   * Selbsgeschriebene Zeilen: (52-60)
   * leichte Anpassunngen in onMount-funktion (Zeile 40-46)
   */
  export let video;
  export let data;
  export let offset;

  const dispatch = createEventDispatcher();
  let paused = true;
  let started = false;
  let currentTime;
  let currentIndex = 0;

  /**
   * Durchläuft das data Objekt und setzt den currentDataPoint
   * + futureDataPoint
   */
  onMount(async () => {
    currentDataPoint.set(data[0]);
    currentDataPoint.subscribe((dataPoint) => {
      if (!paused) {
        setTimeout(() => {
          currentDataPoint.set(data[currentIndex]);
          currentIndex += 10;
        }, 100);
      }
    });

    futureDataPoint.subscribe((dataPoint) => {
      if (!paused) {
        setTimeout(() => {
          futureDataPoint.set(data[currentIndex + 30]);
        }, 100);
      }
    });
  });

  /**
   * Setzt den ersten Datenpunkt beider Stores, beim Start des Videos
   */
  $: {
    if (!started && !paused) {
      started = true;
      setTimeout(() => {
        currentDataPoint.set(data[0]);
        futureDataPoint.set(data[20]);
      }, offset * 1000);
    }
  }

  /**
   * Regelt das Starten und Stoppen des Videos
   * @param e
   */
  function handleMousedown(e) {
    function handleMouseup() {
      if (paused) e.target.play();
      else e.target.pause();
      dispatch("playPause", paused);
      cancel();
    }
    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup);
    }
    e.target.addEventListener("mouseup", handleMouseup);
    setTimeout(cancel, 200);
  }
</script>

<!-- Video-Komponente-->
<!-- svelte-ignore a11y-media-has-caption -->
{#if video}
  <video
    src={"Videos/" + video + ".webm"}
    on:mousedown={handleMousedown}
    bind:paused
    bind:currentTime
  />
{/if}

<style>
  video {
    height: 300;
    width: auto;
  }
</style>
