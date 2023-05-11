<script>
  import { currentDataPoint } from "../Stores/dataPoints.js";
  import { currentConsumption } from "../Stores/metrics.js";
  import { currentColor } from "../Stores/colors.js";
  import { currentAcc } from "../Stores/acceleration.js";
  import { scaleLinear } from "d3-scale";
  import { isAcc } from "../Stores/dataPoints.js";
  import { line, curveBasis } from "d3-shape";
  import { onMount } from "svelte";

  /**
   * Komponente des TD (kWh/km)
   */

  /**
   * Datenarray für Verbrauchslinie
   * Speichert alle verbrauchswerte der letzten 30 Sekunden
   */
  let data = [];
  //Bestimm die maximale Länge des data Arrays (30 Sekunden = 300 Einträge)
  const dLength = 300;
  //Speichert den aktuellen Verbrauchswert
  let currData = {};
  //Speichert alle Beschleunigungsobjekte innerhlab des Zeitfensters
  let accels = [{ id: -1 }];
  let currentAccel = { startPos: 3000 };

  /**
   * Skalen bestimmen die Position der Verbrauchswerte/Beschleunigungen
   * auf Zeit (xScale)
   * auf Höhe (yScale)
   */
  const yScale = scaleLinear().domain([0, 2]).range([610.832, 79.177]);
  const xScale = scaleLinear().domain([dLength, 0]).range([1069.88, 93.913]);

  let consumption = 0;
  let isBeschl = false;
  let toggle = false;

  /**
   * Beim Laden der Komponente:
   * Füllt das Array data mit leeren Werten
   */
  onMount(async () => {
    for (let i = 0; i < dLength; i++) {
      data.push({ con: 0, time: 0 });
    }
  });

  /**
   * Abonniert den Store "isAcc". Wird aufgerufen wenn sich Wert des Stores ändert.
   * Weise dann den aktuellen Wert der Variable "isBeschl" zu.
   */
  isAcc.subscribe((newValue) => {
    isBeschl = newValue;
  });

  /**
   * Abonniert den Store "currentDataPoint". Wird aufgerufen wenn sich Wert des Stores ändert.
   * Weise dann den aktuellen Wert der Variable "currData" zu.
   */
  currentDataPoint.subscribe((newValue) => {
    currData = newValue;
  });
  /**
   * Abonniere den Store "currentAcc"
   * Wird aufgerufen wenn sich Wert des Stores ändert.
   * Überprüft werte des Stores und speichert diese in dem Array accels
   *
   */
  currentAcc.subscribe((newValue) => {
    console.log(currentAccel);
    if (newValue && newValue.id !== undefined) {
      if (newValue.over == false && isBeschl == true) {
        if (toggle == false) {
          newValue.startPos = data.length - 1;
          newValue.pos = data.length - 1;
          currentAccel = newValue;
          currentAccel.startPos = newValue.startPos;
          currentAccel.pos = newValue.pos;
        }
        currentAccel.average = newValue.average;
        currentAccel.r = newValue.r;
        currentAccel.g = newValue.g;
        currentAccel.b = newValue.b;
        currentAccel.over = newValue.over;
        currentAccel.averageEce = newValue.averageEce;
        currentAccel.id = newValue.id;
        toggle = true;
      } else if (newValue.over == true) {
        toggle = false;
        if (newValue.duration > 1) {
          accels.push({
            startPos: currentAccel.startPos,
            pos: currentAccel.pos,
            average: currentAccel.average,
            r: currentAccel.r,
            g: currentAccel.g,
            b: currentAccel.b,
            over: currentAccel.over,
            averageEce: currentAccel.averageEce,
            id: currentAccel.id,
          });
          currentAccel = { over: true };
        }
      }
    }
  });

  /**
   * Abonniere den Store "currentConsumption"
   * Wird aufgerufen wenn sich Wert des Stores ändert.
   * Überprüft Werte des Stores und speichert diese in dem Array data
   * Bei überlauf des Arrays wird das älteset Element gelöscht
   */
  currentConsumption.subscribe((newValue) => {
    if (newValue && newValue !== consumption) {
      if (newValue >= 0) {
        consumption = newValue;
      } else {
        consumption = 0;
      }
      data.push({
        con: consumption,
        time: currData.time,
      });

      while (dLength < data.length) {
        data.shift();
        updateBeschPos();
      }
      data = [...data];
    }
  });

  /**
   * Akutaliseirt das Array accels
   * Wenn ein Beschleunigungsobjekt aus dem zeitfenster ragt,
   * wird es zunächst abgeschnitten,
   * dann ganz entfernt
   */
  const updateBeschPos = function () {
    currentAccel.startPos -= 1;
    for (let i = 0; i < accels.length; i++) {
      if (accels[i].pos <= 0) {
        accels.shift();
      } else {
        accels[i].pos -= 1;
        if (accels[i].startPos <= 0) {
          accels[i].startPos = 0;
        }
        accels[i].startPos -= 1;
      }
    }
  };
</script>

<!--
  ---DISPLAY---
  Code für Animation: Zeile 363 - 427
-->
<svg
  id="svg"
  width="100%"
  height="100%"
  viewBox="0 0 1356 709"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xml:space="preserve"
  xmlns:serif="http://www.serif.com/"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
>
  <g id="Trace">
    <use
      id="Hintergrund"
      xlink:href="#_Image1"
      x="8.397"
      y="8.115"
      width="1199.22px"
      height="691.982px"
      transform="matrix(0.99935,0,0,0.999974,0,0)"
    />
    <path
      id="Hintergrund1"
      serif:id="Hintergrund"
      d="M1168.7,90.482c0,-23.987 -19.474,-43.462 -43.462,-43.462l-1034.48,0c-23.987,0 -43.462,19.475 -43.462,43.462l0,527.248c0,23.987 19.475,43.462 43.462,43.462l1034.48,0c23.988,0 43.462,-19.475 43.462,-43.462l0,-527.248Z"
      style="fill:url(#_Linear2);"
    />
    <g>
      <use
        id="Display_Area"
        xlink:href="#_Image3"
        x="75.527"
        y="58.337"
        width="1015.28px"
        height="571.634px"
        transform="matrix(0.99929,0,0,0.99936,0,0)"
      />
      <rect
        id="Display_Area1"
        serif:id="Display_Area"
        x="94.712"
        y="77.537"
        width="976.803"
        height="533.158"
        style="fill:rgb(15,18,21);"
      />
      <g id="Skalierung-und-Achsen" serif:id="Skalierung und Achsen">
        <g id="Skalierung">
          <rect
            x="1059.56"
            y="502.232"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear4);stroke-width:3px;"
          />
          <rect
            x="1059.56"
            y="179.477"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear5);stroke-width:3px;"
          />
          <rect
            x="1059.56"
            y="79.177"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear6);stroke-width:3px;"
          />
          <rect
            x="1059.56"
            y="287.077"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear7);stroke-width:3px;"
          />
          <rect
            x="1059.56"
            y="394.632"
            width="10"
            height="1"
            style="fill:none;stroke:url(#_Linear8);stroke-width:3px;"
          />
        </g>
        <g id="Skalierung_Beschriftung">
          <text
            x="1096.07px"
            y="510.664px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.4</text
          >
          <text
            x="1096.07px"
            y="403.064px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.8</text
          >
          <text
            x="1096.07px"
            y="296.253px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >1.2</text
          >
          <text
            x="1096.07px"
            y="187.864px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >1.6</text
          >
          <text
            x="1096.07px"
            y="87.564px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >2.0</text
          >
        </g>
        <text
          x="90.863px"
          y="632.901px"
          style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
          >30</text
        >
        <g>
          <text
            x="409.616px"
            y="632.901px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >20</text
          >
          <path
            d="M420.842,611.801l0,-10l-1,0l0,10l1,0Z"
            style="fill:none;stroke:url(#_Linear9);stroke-width:3px;"
          />
          <path
            d="M95.243,611.801l0,-10l-1,0l0,10l1,0Z"
            style="fill:none;stroke:url(#_Linear10);stroke-width:3px;"
          />
        </g>
        <g>
          <text
            x="735.347px"
            y="632.901px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >10</text
          >
          <path
            d="M746.462,611.801l0,-10l-1,0l0,10l1,0Z"
            style="fill:none;stroke:url(#_Linear11);stroke-width:3px;"
          />
        </g>
      </g>
      <g id="Graphlines">
        <rect
          id="_30"
          serif:id="30"
          x="93.913"
          y="179.473"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear12);stroke-width:1px;"
        />
        <rect
          id="_301"
          serif:id="30"
          x="93.913"
          y="79.127"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear13);stroke-width:1px;"
        />
        <rect
          id="_302"
          serif:id="30"
          x="93.913"
          y="287.073"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear14);stroke-width:1px;"
        />
        <rect
          id="_303"
          serif:id="30"
          x="93.913"
          y="502.273"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear15);stroke-width:1px;"
        />
        <rect
          id="_60"
          serif:id="60"
          x="93.913"
          y="394.713"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear16);stroke-width:1px;"
        />
      </g>
      <g>
        <g>
          {#if currentAccel.over == false && isBeschl == true}
            <rect
              id="curr"
              y={yScale(currentAccel.average)}
              x={xScale(currentAccel.startPos)}
              width={xScale(currentAccel.pos) - xScale(currentAccel.startPos)}
              height={610.832 - yScale(currentAccel.average)}
              style=" stroke:rgb({currentAccel.r},{currentAccel.g},{currentAccel.b}); fill: rgb({currentAccel.r},{currentAccel.g},{currentAccel.b});fill-opacity:0.48;"
            />
          {/if}
          {#each accels as accel}
            <rect
              y={yScale(accel.average)}
              x={xScale(accel.startPos)}
              width={xScale(accel.pos) - xScale(accel.startPos)}
              height={610.832 - yScale(accel.average)}
              style=" stroke:rgb({accel.r},{accel.g},{accel.b}); 
                      fill:rgb({accel.r},{accel.g},{accel.b});
                      fill-opacity:0.48;"
            />
          {/each}

          <path
            class="line"
            d={line()
              .x((d, j) => xScale(j))
              .y((d) => yScale(d.con))
              .curve(curveBasis)(data)}
          />

          <line
            x1="1069.88"
            x2="1069.88"
            y1="610.832"
            y2={yScale(consumption)}
            stroke-width="4"
            stroke="#0171FE"
          />
          <circle
            id="dot"
            cx="1069.88"
            cy={yScale(consumption)}
            r="6"
            stroke="#0171FE"
            fill="#0171FE"
            style="stroke-width:3px;"
          />
        </g>
        <circle
          id="ball"
          cx="1069.91"
          cy={yScale(consumption)}
          r="20"
          style="fill:none;stroke:rgb({$currentColor.r}, {$currentColor.g}, {$currentColor.b});stroke-width:3px;"
          filter="url(#glow)"
        />

        <filter id="glow">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2.5"
            flood-color="rgb({$currentColor.r}, {$currentColor.g}, {$currentColor.b})"
          />
        </filter>
      </g>
      <rect
        id="yAchse"
        x="92.792"
        y="610.832"
        width="977.232"
        height="1"
        style="fill:none;stroke:url(#_Linear18);stroke-width:3px;stroke-linecap:square;"
      />
    </g>
    <text
      x="1076.63px"
      y="612.68px"
      style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
      >kWh/km</text
    >
    <text
      x="1039.19px"
      y="632.128px"
      style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
      >sek</text
    >
  </g>
  <defs>
    <image
      id="_Image1"
      width="1200px"
      height="692px"
      xlink:href="data:image/png;base64,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AJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAqegaewAABwzSURBVBYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgAAAAApCZgAQAAAJCagAUAAABAagIWAAAAAKkJWAAAAACkJmABAAAAkJqABQAAAEBqAhYAAAAAqQlYAAAAAKQmYAEAAACQmoAFAAAAQGoCFgAAAACpCVgA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"
    />
    <linearGradient
      id="_Linear2"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(1121.4,0,0,614.172,47.3013,354.106)"
      ><stop offset="0" style="stop-color:rgb(35,41,47);stop-opacity:1" /><stop
        offset="0.62"
        style="stop-color:rgb(40,48,55);stop-opacity:1"
      /><stop
        offset="0.82"
        style="stop-color:rgb(53,66,74);stop-opacity:1"
      /><stop
        offset="1"
        style="stop-color:rgb(68,85,95);stop-opacity:1"
      /></linearGradient
    >
    <image
      id="_Image3"
      width="1016px"
      height="572px"
      xlink:href="data:image/png;base64,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gMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIIPABAAAggMAHAACAAAIfAAAAAgh8AAAACCDwAQAAIIDABwAAgAACHwAAAAIIfAAAAAgg8AEAACCAwAcAAIAAAh8AAAACCHwAAAAIcEvgv5fbeh8AAADYb9bXV3f2rRP88QPFPQAAAPyasa9v6uw9gb96Y2EPAAAAv9fNDb53gv9ejvo8AAAAcLtVb+/u7muX6FuaDwAAAH/OzUv1LwX+LOTH/yC8LV4DAAAA7DNr7FWLL20F/lbYzyIfAAAAuN4s7rdCf2oV+HU5wCrs38p9AAAAYL9ZW68if3Ppfg382Ysuhf1reQ4AAAC4bGzs3tZboT/7/U+HyQ9m/xFYRf7siwAAAACXzQbnl+J+2e57N9mbTe9fj8fP4/HaBD4AAADs1dt67Ore1nun+J8unYPf79ej/3ehRr7ABwAAgH3e23nc99be2mxv8xz81bh/vD9blt+/yI9mig8AAAB7jdP73tS9q2fL9fvvrE6rX26yt7rW/Rj3sy8i8gEAAGBbXZpfB+d1M/vZZfRaK+39cuEDV8vz6/T+e2vt2/E4tNaeWmvPt/+tAAAAEOutfbR07+nv7XyKv1qmvxyoj4H/3j7CvP43YPxvwWtbB/5L+4j6p/YV+Zc28QMAAIC/yVv7aOnvrbX/tNb+29aBP16xbtbqbbjdPcHfOvf+5fhlno/HoX2F/Uv7in0AAAD4W/W27nH/3+Hogb91Lv7FCX5fRv803Pb7PdTHiXy9/1wej7/frZ4HAACAv0E/3f1H+wj6/5SjR34P/1Xoj0P48b1ba+29Bn6/vzpq8I9xP/sDzj6wfA4AAACkqavh+wr4rbgfI3+1VH+2q/6n2QS/DffHaX4N+q2wny3tr1+kfh4AAAA8uhr1Pd5r2Pe4ny3Tn+2o3zfdGyf5J2bn4I//CXhrHxHeb1/bR+T38/BnE/xxQ77+B/Ud9l/a12Z8h8Xvd+IfAACAezQ7D352eflx/7q6a/64JL+egz9G/Tgs3zwX/5pN9nro/2znS/brH1Pj/uV4+9y+Nt6rO+63yS0AAADco7pMfgzwHuY91nu4/2jz2J9tsPezXbnJXg38fqm8+twY7q2dh3j9Z0DdZX+c3I/T+3o5PZvxAQAA8CjG4B6n7OMUf5zkj61cg398vi7PX4X9yXNbE/zxy/Yd+nqAv5bX1CUI3463s7Afd95fndMv8gEAALhn9Zr0Yz+PQ/JV6P9o5+G/ukTeVuR/6oE/Tu7rJnjjfyNW4V0j/7Wdhv0Y9z3sxT0AAACPbCvy63L9cUf8uhT/dXJ/dnm8+lkn3+OlPFHjukf9YXhc/5j6BzwPX6wuyV9dYm9rkz3BDwAAwD2YXp5ueG42xZ8NxOsxnq8/21xvfK/Vd1ou0e8v6BP8umnA7I97Hr7IuBS/bqY3m9yvIl7cAwAAcE9Wy+TrFH8W+rOAr0v5Vxvr1Qn+mUu76Lf2tXv+oX1N9OuHHIbX9KOH/lbUXwp8AAAAeASzwF/F/p6j/u74GVOXdtGfRf74fP0j+mtq1Nfr3c/CXuQDAADwiFaNPD6eLbev0T/eb+1y3J883rs0fhXnWyG/Z1o/uy/0AQAAeASzc/JXsX9psl/vX1qWfzbJ34rprcgfH++d0ttQDwAAgDR7N97berwK+zZ5vPqsi0E9i/zx/mqq3yY/2/N+AAAA8GhWE/zxcQ378bmtaf2uuG9tX1TvjfJVyO+5xr24BwAA4JFt7a7fb2fhvhX0u+O+tf1hvSfMb1l+L+wBAABIsnWt+q1l/Fu/v/X8p2sC+5oN+X7l9wEAAOARXRvneyf0F+O+tV+P61uW+P/OzwcAAIB7shXje0J9V8zP/I7A/lORLv4BAAC4RzdH+J9833uN6Hv9XgAAANDan4v8m/0/jIy+NrC7lPUAAAAASUVORK5CYII="
    />
    <linearGradient
      id="_Linear4"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(11.8017,0,0,1,1059.56,502.732)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear5"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(11.8017,0,0,1,1059.56,179.977)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear6"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(11.8017,0,0,1,1059.56,79.6771)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear7"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(11.8017,0,0,1,1059.56,287.577)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear8"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(10,0,0,1,1059.56,395.132)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear9"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(6.12323e-16,10,-1,6.12323e-17,420.342,601.801)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear10"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(6.12323e-16,10,-1,6.12323e-17,94.743,601.801)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear11"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(6.12323e-16,10,-1,6.12323e-17,745.962,601.801)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.69"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="0.82"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="0.93"
        style="stop-color:rgb(232,251,255);stop-opacity:0.55"
      /><stop
        offset="0.97"
        style="stop-color:rgb(218,249,255);stop-opacity:0.28"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear12"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.51,179.973)"
      ><stop offset="0" style="stop-color:white;stop-opacity:0.25" /><stop
        offset="0.12"
        style="stop-color:rgb(242,253,255);stop-opacity:0.45"
      /><stop
        offset="0.27"
        style="stop-color:rgb(238,252,255);stop-opacity:0.5"
      /><stop
        offset="0.62"
        style="stop-color:rgb(229,250,255);stop-opacity:0.37"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear13"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.51,79.6265)"
      ><stop offset="0" style="stop-color:white;stop-opacity:0.25" /><stop
        offset="0.12"
        style="stop-color:rgb(242,253,255);stop-opacity:0.45"
      /><stop
        offset="0.27"
        style="stop-color:rgb(238,252,255);stop-opacity:0.5"
      /><stop
        offset="0.62"
        style="stop-color:rgb(229,250,255);stop-opacity:0.37"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear14"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.51,287.573)"
      ><stop offset="0" style="stop-color:white;stop-opacity:0.25" /><stop
        offset="0.12"
        style="stop-color:rgb(242,253,255);stop-opacity:0.45"
      /><stop
        offset="0.27"
        style="stop-color:rgb(238,252,255);stop-opacity:0.5"
      /><stop
        offset="0.62"
        style="stop-color:rgb(229,250,255);stop-opacity:0.37"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear15"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.51,502.773)"
      ><stop offset="0" style="stop-color:white;stop-opacity:0.25" /><stop
        offset="0.12"
        style="stop-color:rgb(242,253,255);stop-opacity:0.45"
      /><stop
        offset="0.27"
        style="stop-color:rgb(238,252,255);stop-opacity:0.5"
      /><stop
        offset="0.62"
        style="stop-color:rgb(229,250,255);stop-opacity:0.37"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <linearGradient
      id="_Linear16"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.51,395.213)"
      ><stop offset="0" style="stop-color:white;stop-opacity:0.25" /><stop
        offset="0.12"
        style="stop-color:rgb(242,253,255);stop-opacity:0.45"
      /><stop
        offset="0.27"
        style="stop-color:rgb(238,252,255);stop-opacity:0.5"
      /><stop
        offset="0.62"
        style="stop-color:rgb(229,250,255);stop-opacity:0.37"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
    <image
      id="_Image17"
      width="76px"
      height="74px"
      xlink:href="data:image/png;base64,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"
    />
    <linearGradient
      id="_Linear18"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-977.232,-1.19741e-13,1.22399e-16,-1,1070.02,611.332)"
      ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
        offset="0.64"
        style="stop-color:rgb(252,255,255);stop-opacity:0.95"
      /><stop
        offset="0.84"
        style="stop-color:rgb(246,254,255);stop-opacity:0.82"
      /><stop
        offset="1"
        style="stop-color:rgb(238,252,255);stop-opacity:0.66"
      /><stop
        offset="1"
        style="stop-color:rgb(204,246,255);stop-opacity:0"
      /></linearGradient
    >
  </defs>
</svg>

<style>
  .line {
    stroke: white;
    stroke-width: 5;
    fill: none;
    filter: drop-shadow(0 0 12px black);
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
    margin: auto;
  }

  rect {
    stroke-width: 2px;
  }
</style>
