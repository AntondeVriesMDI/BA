<script>
  const NUMBER_OF_DATAPOINTS_IN_HISTORY = 100;
  import { extent } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { line, curveBasis, area } from "d3-shape";

  import { currentDataPoint } from "../store.js";

  let consumption = 0;
  //   let data = []
  let data = [[0, 0]];
  let length = 0;
  let dataLength = 0;
  let positiveConsumption = true;
  let subdata = [];

  currentDataPoint.subscribe(newValue => {
    if (newValue) {
      if (newValue.consumption_filled !== null) {
        consumption = Math.round(newValue.consumption_filled);
        length += 1;

        if (
          (newValue.consumption_filled >= 0 && positiveConsumption) ||
          (newValue.consumption_filled < 0 && !positiveConsumption)
        ) {
          // continue postive
          

          data[data.length - 1].push({
            consumption: newValue.consumption_filled,
            index: length
          });
        } else {
          positiveConsumption = !positiveConsumption;
          //new subDaten
          const lastDatapoint =
            data[data.length - 1][data[data.length - 1].length - 1];
          data.push([
            lastDatapoint,
            { consumption: newValue.consumption_filled, index: length }
          ]);
        }

        dataLength = data
          .map(d => d.length)
          .reduce((accumulator, currentValue) => accumulator + currentValue);        
        while (dataLength > NUMBER_OF_DATAPOINTS_IN_HISTORY + data.length) {
          console.log(dataLength)
          if (data[0].length > 1) {
            data[0].shift();
          } else {
            data.shift();
          }
          dataLength = data
            .map(d => d.length)
            .reduce((accumulator, currentValue) => accumulator + currentValue);
          // data.shift();
        }
        data = [...data];

      } else {
        consumption = "ERR";
      }
    }
  });
  const VISWIDTH = 350;
  // the scales
  const xScale = scaleLinear()
    .domain([0, NUMBER_OF_DATAPOINTS_IN_HISTORY])
    .range([50, VISWIDTH]);

  const yScale = scaleLinear()
    .domain([-100, 100])
    .range([-40, 40]);

  // the path generator
  const pathLine = line()
    .x((d, i) =>
      xScale(
        length > NUMBER_OF_DATAPOINTS_IN_HISTORY
          ? d.index - (length - NUMBER_OF_DATAPOINTS_IN_HISTORY)
          : length
      )
    )
    .y(d => 110 / 2 - yScale(d.consumption))
    .curve(curveBasis);
  let myAreas = [];
  let myLines = [];
  $: {
    let offset = 0;
    let tmp = [];
    let tmpLine = [];
    for (let i = 0; i < data.length; i++) {
      subdata = data[i];
      tmp.push({
        d: area()
          .x((d, j) => xScale(j + offset))
          .y0(d => 110 / 2 - yScale(d.consumption))
          .y1(110 / 2 - yScale(0))(subdata),
        positive: subdata[subdata.length - 1].consumption >= 0 ? true : false
      });

      tmpLine.push(
        line()
          .x((d, j) => xScale(j + offset))
          .y(d => 110 / 2 - yScale(d.consumption))
          .curve(curveBasis)(subdata)
      );
      offset += subdata.length - 1;
    }
    myAreas = tmp;
    myLines = tmpLine;
    // console.log(myAreas);
  }

  const yTicks = [100, 50, 0, -50, -100];
  const yTexts = [100, 50, 0, -50, -100];
</script>

<style>
  .line {
    stroke: white;
    stroke-width: 1;
    fill: none;
  }

    .circle {
    stroke: white;
    fill: white;
  }

  .line-posinegativetive {
    stroke: black;
    stroke-width: 0.2;
    fill: none;
  }
  .area-positive {
    fill: orange;
  }
  .area-negative {
    fill: turquoise;
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
  }
</style>

<svg viewBox="0 0 368 110">
  <g class="axis y-axis">

    {#each yTicks as tick}
      {#if yTexts.includes(tick)}
        <text
          class="axis-text"
          x={45}
          y={110 / 2 - yScale(tick)}
          dy=".4em"
          style="font-size:10px;fill:#82828;text-anchor:end;">
          {tick} kW
        </text>
        <line
          class="tick-main"
          y1={110 / 2 - yScale(tick)}
          y2={110 / 2 - yScale(tick)}
          x1={50}
          x2={VISWIDTH} />
      {:else}
        <line
          class="tick"
          y1={110 / 2 - yScale(tick)}
          y2={110 / 2 - yScale(tick)}
          x1={50}
          x2={VISWIDTH} />
      {/if}
    {/each}
  </g>
  {#if data.length > 0}
    {#each myAreas as area}
      <!-- class={subdata[subdata.length - 1].consumption < 0 ? 'area-negative' : 'area-positive'} -->

      <path
        d={area.d}
        class={area.positive ? 'area-positive' : 'area-negative'} />
    {/each}
    {#each myLines as line}
      <path class="line" d={line} />
    {/each}
    <circle
    cx={xScale(NUMBER_OF_DATAPOINTS_IN_HISTORY)}
    cy={110 / 2 - yScale(data[data.length - 1][data[data.length - 1].length - 1].consumption)}
    r={yScale(12.5)}
    fill="white" />
  {/if}
</svg>
