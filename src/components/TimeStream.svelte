<script>
  import { onMount } from "svelte";
  import { currentDataPoint } from "../store.js";

  export let data;
  let start = false;
  let currentIndex = 0;

  onMount(async () => {
    currentDataPoint.set(data[0]);
    currentDataPoint.subscribe(dataPoint => {
    //   console.log(dataPoint);
      let timeDiff =  dataPoint.timestamp - data[currentIndex].timestamp;
      currentIndex += 1;
      console.log(currentIndex);
      console.log("timeDiff",timeDiff)
      setTimeout(() => {
        currentDataPoint.set(data[currentIndex + 1]);
      }, (timeDiff));
    });

    console.log(data);
  });
</script>
