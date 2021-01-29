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

</script>

<style>
 
  svg {
    width: 100%;
    height: auto;
  }
</style>

<svg viewBox="0 0 368 110">

 <text
    text-anchor="middle"
    alignment-baseline="central"
    x="184px"
    y="50px"
    style="font-family:'Roboto-Medium',
    'Roboto';font-weight:500;font-size:24px;fill:rgb(204,204,204);">
    {consumption.toFixed(1)} Wh / km
  </text>
</svg>
