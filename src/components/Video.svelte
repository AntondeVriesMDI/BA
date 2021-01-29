<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { currentDataPoint } from "../store.js";

  // These values are bound to properties of the video
  export let video;
  export let data;

  let timeMs = 0;
  let duration;
  let paused = true;

  let showControls = true;
  let showControlsTimeout;

  export let offset;

  let loading = true;
  let currentTime = offset;

  function handleMousedown(e) {
    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves

    function handleMouseup() {
      if (paused) e.target.play();
      else e.target.pause();
      dispatch('playPause', paused);
      cancel();
    }

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup);
    }

    e.target.addEventListener("mouseup", handleMouseup);

    setTimeout(cancel, 200);
  }

  function format(seconds) {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  }

  $: {
    

    if (timeMs < Math.round(currentTime * 10 - offset * 10)) {
      timeMs = Math.round(currentTime * 10 - offset * 10);
      // console.log(timeMs)
      if (data[timeMs]) {
        // console.log(data)
        currentDataPoint.set(data[timeMs]);
      }
    }

  }


</script>

<style>
  video {
    height: 600;
    width: auto;
  } -->
<!-- </style>

{#if paused}
  <span>{currentTime}</span>
  <input bind:value={offset} />
{/if}

{#if video}
  <video
    src={'videos/' + video + '.MP4'}
    on:mousedown={handleMousedown}
    bind:currentTime
    bind:duration
    bind:paused />
{/if}
