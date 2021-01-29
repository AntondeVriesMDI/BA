<script>
  import { extent } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { line, curveBasis, area } from "d3-shape";

  import { currentDataPoint } from "../store.js";

  let consumption = -80;
  //   let data = []

  currentDataPoint.subscribe(newValue => {
    if (newValue) {
      if (newValue["consumption_Wh/km"] !== null) {
        consumption = Math.round(newValue["consumption_Wh/km"]);
      } else {
        // consumption = "ERR";
      }
    }
  });

  let show = true;

  // the scales


  const yScale = scaleLinear()
    .domain([-2000, 2000])
    .range([-40, 40]);



  const yTicks = [2000,  1000,  0,  -1000, -2000];
  const yTexts = [2000, 1000, 0, -1000, -2000];
  const margins = { top: 20, right: 20, bottom: 40, left: 25 };
</script>

<style>
  .line {
    stroke: purple;
    stroke-width: 0.5;
    fill: none;
  }
  .area {
    fill: #4ca3bd;
  }
  svg {
    width: 100%;
    height: auto;
  }
  .y-axis > text {
    font-family: "Roboto-Medium", "Roboto";
    font-weight: 300;
    font-size: 14px;
    fill: white;
    fill-opacity: 0.7;
  }
  .tick {
    stroke: #a3a3a3;
    stroke-dasharray: 2;
    opacity: 0.5;
  }

  .tick-main {
    stroke: #a3a3a3;
    opacity: 0.9;
  }
</style>

<svg viewBox="0 0 368 110">

  <g class="axis y-axis">

    {#each yTicks as tick}
      <!-- {#if yTexts.includes(tick)} -->
        <text
          class="axis-text"
          x={184 - 75 - 5}
          y={110 / 2 - yScale(tick)}
          dy=".4em"
          style="font-size:10px;fill:#82828;text-anchor:end;">
          {tick} Wh / km
        </text>
        <line
          class="tick-main"
          y1={110 / 2 - yScale(tick)}
          y2={110 / 2 - yScale(tick)}
          x1={184 - 75}
          x2={184 + 75} />
      <!-- {:else}
        <line
          class="tick"
          y1={110 / 2 - yScale(tick)}
          y2={110 / 2 - yScale(tick)}
          x1={184 - 75}
          x2={184 + 75} />
      {/if} -->
    {/each}
  </g>

  {#if consumption < 0}
    <rect
      x={184 - 50}
      y={110 / 2}
      width="100"
      height={-yScale(consumption)}
      style="fill:#38B3F5" />
  {:else}
    <rect
      x={184 - 50}
      y={110 / 2 - yScale(consumption)}
      width="100"
      height={yScale(consumption)}
      style="fill:#FFB300" />
  {/if}
</svg>
<!-- 
<g class='tick' transform='{translate}'>
	<line x1='{x1}' x2='{x2}'/>
	<text x='{x}' y='{y}' style='font-size:14px;fill:#82828;text-anchor:end;'>{text}</text>
</g> -->

<!-- {#each yTicks as tick}
      <g class="axis y-axis">
          <Axis
            axisType="yAxis"
            translate="translate(0, {yScale(tick)})"
            x1={xScale(0)}
            x2={xScale(extent(xTicks)[1])}
            x={margins.left - 8}
            y="+4"
            text={tick} />
        
      </g>
    {/each} -->
