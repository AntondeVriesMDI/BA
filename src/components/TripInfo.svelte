<script>
  import { currentDataPoint } from "../store.js";
  let traveledDistance = 0;
  let calcSpeed = 0;
  let timestamp = 0;
  let timestampStart;
  let speed_interpolated = 0;
  currentDataPoint.subscribe(newValue => {
    if (newValue) {
      if (!timestampStart) {
        timestampStart = newValue.timestamp;
      }
      timestamp = newValue.timestamp;
      calcSpeed =
        newValue.speed_from_rpm !== null
          ? Math.round(newValue.speed_from_rpm)
          : "Err";
      speed_interpolated = newValue.speed_lin_int ? newValue.speed_lin_int : 0;
      // The Distance in KM = Speed (km/h) * Time (h) one Datapoint lasts 100ms so it is 1/3600 of a hour
      // speed in km / h
      // time between dataponts 100 ms
      // speed
      traveledDistance += calcSpeed / 36000;
      // console.log( speed_interpolated ,speed_interpolated / 36000)
    }
  });
</script>

<style>

  svg {
    width: 100%;
    height: auto;
  }
</style>

<svg
  viewBox="0 0 368 240"
  version="1.1"
  
  >

  <text
    text-anchor="middle"
    alignment-baseline="central"
    x="184px"
    y="160px"
    style="font-family:'Roboto-Medium',
    'Roboto';font-weight:500;font-size:32px;fill:rgb(204,204,204);">
    Trip: {traveledDistance.toFixed(1)} km
  </text>

  <text
    text-anchor="middle"
    alignment-baseline="central"
    x="184px"
    y="100px"
    style="font-family:'Roboto-Light',
    'Roboto';font-weight:300;font-size:48px;fill:white;fill-opacity:0.9;">
    {calcSpeed} km/h
  </text>

  <!-- </g> -->
  <!-- </g> -->
  <!-- </g> -->
  <!--  -->
</svg>
