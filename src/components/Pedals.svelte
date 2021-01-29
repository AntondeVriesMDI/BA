<script>
  import { currentDataPoint } from "../store.js";
  let throttle = 30;
  let requestedTotalTorque = 0;
  let coasting_torque = 0;
  let elecbrakewheelstorqueapplied = 0;
  let brakePercent = 12;
  currentDataPoint.subscribe(newValue => {
    if (newValue) {
      throttle = newValue.throttle ? newValue.throttle : 0;
      requestedTotalTorque = newValue.break_percent
        ? newValue.break_percent
        : 0;
      coasting_torque = newValue.coasting_torque ? newValue.coasting_torque : 0;
      elecbrakewheelstorqueapplied = newValue.elecbrakewheelstorqueapplied
        ? newValue.elecbrakewheelstorqueapplied
        : 0;
      // 3216 is the maximum value for all rides ... the relationship is proberbly not linear but maybe it is good enough

      // Fehler 1: wir vernachlässigen die Abhängigkeit vom Zylinder (siehe https://canze.fisch.lu/the-zoe-braking-system/)
      // Fehler 2: Das Maximum unserer Fahrten (3216) ist nicht zwangsläufig das reale Maximum
      // Fehler 3: Wir setzen eine lineare Beziehung zwischen Bremspedal und requestedTotalTorque vorraus
      brakePercent = requestedTotalTorque
        // Math.round((requestedTotalTorque * 100) / 3216) > 100
        //   ? 100
        //   : Math.round((requestedTotalTorque * 100) / 3216);
    }
  });

  const rectWidth = 66.9;
</script>

<style>
  .text {
    font-family: "Roboto-Medium", "Roboto";
    font-weight: 500;
    font-size: 18px;
    fill: white;
    fill-opacity: 0.9;
  }
</style>

<svg viewBox="0 0 368 240">

  <rect x={rectWidth * 1.25} y=40 width={rectWidth} height="135" style="fill:#607287" />
  <rect
    x={rectWidth* 1.25}
    y={40 +135 - brakePercent * 135 / 100}
    width={rectWidth}
    height={brakePercent * 135 / 100}
    style="fill:#CFD4DB" />

  <text class="text" text-anchor="middle" x={rectWidth * 1.75} y={40 + 135 + 25}>Bremspedal</text>

  <rect x={rectWidth *3.25} y=40 width={rectWidth} height="135" style="fill:#607287" />
  <rect
    x={rectWidth *3.25}
    y={40 +135 - throttle * 135 / 120}
    width={rectWidth}
    height={throttle * 135 / 120 }
    style="fill:#CFD4DB" />
  <text class="text" text-anchor="middle" x={rectWidth *3.75} y={40 + 135 + 25}>Gaspedal</text>
</svg>
