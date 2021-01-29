<script>
  const NUMBER_OF_DATAPOINTS_IN_HISTORY = 100;
  const SHOWN_DISTANCE = 0.1; // Distance is in km
  import { extent } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { line, curveBasis, area } from "d3-shape";

  import { currentDataPoint } from "../store.js";

  let consumption = 0;
  //   let data = []
  let data = [[]];
  let length = 0;
  let totalDistance = 0;
  let positiveConsumption = true;
  let subdata = [];

  currentDataPoint.subscribe(newValue => {
    if (newValue) {
      if (
        newValue["consumption_Wh/km"] !== null &&
        newValue.speed_from_rpm > 0
      ) {
        consumption = Math.round(newValue["consumption_Wh/km"]);
        length += 1;

        if (
          (consumption >= 0 && positiveConsumption) ||
          (consumption < 0 && !positiveConsumption)
        ) {
          // continue postive

          data[data.length - 1].push({
            consumption: consumption,
            index: length,
            distance: newValue.speed_from_rpm / 36000
          });
        } else {
          positiveConsumption = !positiveConsumption;
          //new subDaten
          const lastDatapoint =
            data[data.length - 1][data[data.length - 1].length - 1];
          data.push([
            lastDatapoint,
            {
              consumption: consumption,
              index: length,
              distance: newValue.speed_from_rpm / 36000
            }
          ]);
        }
        totalDistance = 0;
        
        data.forEach(element => {
          element.forEach(innerEl => {
            totalDistance += innerEl.distance;
            innerEl.rollingDistance = totalDistance;
          });
        });

        

        if (totalDistance > SHOWN_DISTANCE) {
          loop1: for (let i = 0; i < data.length; i++) {
            loop2: for (let j = 0; j < data[i].length; j++) {
              if (
                totalDistance - data[i][j].rollingDistance <=
                SHOWN_DISTANCE
              ) {
                
                data[i].splice(0, j+1);
                data.splice(0, i);
                break loop1;
              }
            }
          }
          totalDistance = 0;
          
          data.forEach(element => {
            element.forEach(innerEl => {
              totalDistance += innerEl.distance;
              innerEl.rollingDistance = totalDistance;
            });
          });
        }

        console.log("totoalDistance:",totalDistance)
        data = [...data];
      } else {
        consumption = "ERR";
      }
    }
  });
  const VISWIDTH = 350;
  // the scales
  const xScale = scaleLinear()
    .domain([0, SHOWN_DISTANCE])
    .range([65, VISWIDTH]);

  const yScale = scaleLinear()
    .domain([-2000, 2000])
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
      if (subdata.length > 0) {
        tmp.push({
          d: area()
            .x((d, j) => xScale(d.rollingDistance))
            .y0(d => 110 / 2 - yScale(d.consumption))
            .y1(110 / 2 - yScale(0))(subdata),
          positive: subdata[subdata.length - 1].consumption >= 0 ? true : false
        });

        // tmpLine.push(
        //   line()
        //     .x((d, j) => xScale(j + offset))
        //     .y(d => 110 / 2 - yScale(d.consumption))
        //     .curve(curveBasis)(subdata)
        // );
        offset += subdata.length - 1;
      }
    }
    myAreas = tmp;
    myLines = tmpLine;
    
  }

  const yTicks = [2000, 1000, 0, -1000, -2000];
  const yTexts = [2000, 1000, 0, -1000, -2000];
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
          x={60}
          y={110 / 2 - yScale(tick)}
          dy=".4em"
          style="font-size:9px;fill:#82828;text-anchor:end;">
          {tick} Wh/km
        </text>
        <line
          class="tick-main"
          y1={110 / 2 - yScale(tick)}
          y2={110 / 2 - yScale(tick)}
          x1={65}
          x2={VISWIDTH} />
      {:else}
        <line
          class="tick"
          y1={110 / 2 - yScale(tick)}
          y2={110 / 2 - yScale(tick)}
          x1={65}
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
    {#if totalDistance > 0}
      <circle
        cx={xScale(SHOWN_DISTANCE)}
        cy={110 / 2 - yScale(data[data.length - 1][data[data.length - 1].length - 1].consumption)}
        r={yScale(250)}
        fill="white" />
    {/if}
  {/if}
</svg>
