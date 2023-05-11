<script>
  import { currentDataPoint } from "../Stores/dataPoints.js";
  import { currentEce } from "../Stores/metrics.js";
  import { currentColor } from "../Stores/colors.js";
  import { currentAcc } from "../Stores/acceleration.js";
  import { scaleLinear } from "d3-scale";
  import { isAcc } from "../Stores/dataPoints.js";
  import { line, curveBasis } from "d3-shape";
  import { onMount } from "svelte";

  /**
   * Komponente des TD (ECE)
   */

  /**
   * Datenarray für Verbrauchslinie
   * Speichert alle verbrauchswerte der letzten 30 Sekunden
   */
  let data = [];
  //Bestimm die maximale Länge des data Arrays (30 Sekunden = 300 Einträge)
  const nLenght = 300;
  //Speichert den aktuellen Verbrauchswert
  let currData = {};
  let accels = [{ id: -1 }];
  let currentAccel = { startPos: 3000 };

  /**
   * Skalen bestimmen die Position der Verbrauchswerte/Beschleunigungen
   * auf Zeit (xScale)
   * auf Höhe (yScale)
   */
  const yScale = scaleLinear().domain([0.7, 0.9]).range([610.832, 79.177]);
  const xScale = scaleLinear().domain([nLenght, 0]).range([1069.88, 93.913]);

  let isBeschl = false;
  let toggle = false;
  let ece = 0.7;

  /**
   * Beim Laden der Komponente:
   * Füllt das Array data mit leeren Werten
   */
  onMount(async () => {
    for (let i = 0; i < nLenght; i++) {
      data.push({ ece: 0.7, time: 0 });
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
   * Abonniere den Store "currentECE"
   * Wird aufgerufen wenn sich Wert des Stores ändert.
   * Überprüft Werte des Stores und speichert diese in dem Array data
   * Bei überlauf des Arrays wird das älteset Element gelöscht
   */
  currentEce.subscribe((newValue) => {
    console.log(newValue);
    if (newValue) {
      if (newValue >= 0.7) {
        ece = newValue;
      } else {
        ece = 0.7;
      }
      data.push({
        ece: ece,
        time: currData.time,
      });
      while (nLenght < data.length) {
        data.shift();
        updateBeschPos();
      }
      data = [...data];
    }
  });

  /**
   * Abonniere den Store "currentAcc"
   * Wird aufgerufen wenn sich Wert des Stores ändert.
   * Überprüft werte des Stores und speichert diese in dem Array accels
   *
   */
  currentAcc.subscribe((newValue) => {
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
        currentAccel.averageEce = newValue.averageECE;
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
  Code für Animation: Zeile 357 - 420
-->
<svg
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
  <g id="Trace_ECE">
    <use
      id="Hintergrund"
      xlink:href="#_Image1"
      x="8.611"
      y="8.06"
      width="1217.32px"
      height="691.982px"
      transform="matrix(0.999441,0,0,0.999974,0,0)"
    />
    <path
      id="Hintergrund1"
      serif:id="Hintergrund"
      d="M1188.02,90.426c0,-23.987 -19.474,-43.462 -43.461,-43.462l-1053.58,0c-23.988,0 -43.462,19.475 -43.462,43.462l-0,527.248c-0,23.988 19.474,43.462 43.462,43.462l1053.58,0c23.987,0 43.461,-19.474 43.461,-43.462l0,-527.248Z"
      style="fill:url(#_Linear2);"
    />
    <g>
      <use
        id="Display_Area"
        xlink:href="#_Image3"
        x="75.741"
        y="58.281"
        width="1015.28px"
        height="571.634px"
        transform="matrix(0.99929,0,0,0.99936,0,0)"
      />
      <rect
        id="Display_Area1"
        serif:id="Display_Area"
        x="94.925"
        y="77.482"
        width="976.803"
        height="533.158"
        style="fill:rgb(15,18,21);"
      />
      <g id="Skalierung-und-Achsen" serif:id="Skalierung und Achsen">
        <g id="Skalierung">
          <rect
            x="1059.78"
            y="480.821"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear4);stroke-width:3px;"
          />
          <rect
            x="1059.78"
            y="213.021"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear5);stroke-width:3px;"
          />
          <rect
            x="1059.78"
            y="79.121"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear6);stroke-width:3px;"
          />
          <rect
            x="1059.78"
            y="346.921"
            width="11.802"
            height="1"
            style="fill:none;stroke:url(#_Linear7);stroke-width:3px;"
          />
        </g>
        <g id="Skalierung_Beschriftung">
          <text
            x="1096.29px"
            y="489.217px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.75</text
          >
          <text
            x="1096.29px"
            y="619.117px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.7 ECE</text
          >
          <text
            x="1096.29px"
            y="355.317px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.8</text
          >
          <text
            x="1096.29px"
            y="221.417px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.85</text
          >
          <text
            x="1096.29px"
            y="87.508px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >0.9</text
          >
        </g>
        <text
          x="91.076px"
          y="632.845px"
          style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
          >30</text
        >
        <g>
          <text
            x="409.83px"
            y="632.845px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >20</text
          >
          <path
            d="M421.056,611.745l-0,-10l-1,0l-0,10l1,0Z"
            style="fill:none;stroke:url(#_Linear8);stroke-width:3px;"
          />
          <path
            d="M95.456,611.745l0,-10l-1,0l0,10l1,0Z"
            style="fill:none;stroke:url(#_Linear9);stroke-width:3px;"
          />
        </g>
        <g>
          <text
            x="735.561px"
            y="632.845px"
            style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
            >10</text
          >
          <path
            d="M746.676,611.745l-0,-10l-1,0l-0,10l1,0Z"
            style="fill:none;stroke:url(#_Linear10);stroke-width:3px;"
          />
        </g>
      </g>
      <g id="Graphlines">
        <rect
          id="_30"
          serif:id="30"
          x="94.126"
          y="346.926"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear11);stroke-width:1px;"
        />
        <rect
          id="_301"
          serif:id="30"
          x="94.126"
          y="79.071"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear12);stroke-width:1px;"
        />
        <rect
          id="_302"
          serif:id="30"
          x="94.126"
          y="213.026"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear13);stroke-width:1px;"
        />
        <rect
          id="_303"
          serif:id="30"
          x="94.126"
          y="79.126"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear14);stroke-width:1px;"
        />
        <rect
          id="_60"
          serif:id="60"
          x="94.126"
          y="480.826"
          width="976.6"
          height="1"
          style="fill:none;stroke:url(#_Linear15);stroke-width:1px;"
        />
      </g>
      <g>
        <g>
          {#if currentAccel.over == false && isBeschl == true}
            <rect
              id="curr"
              stroke="rgb({currentAccel.r},{currentAccel.g},{currentAccel.b})"
              y={yScale(currentAccel.averageEce)}
              x={xScale(currentAccel.startPos)}
              width={xScale(currentAccel.pos) - xScale(currentAccel.startPos)}
              height={610.832 - yScale(currentAccel.averageEce)}
              style=" stroke=rgb({currentAccel.r},{currentAccel.g},{currentAccel.b}); fill:rgb({currentAccel.r},{currentAccel.g},{currentAccel.b});fill-opacity:0.48;"
            />
          {/if}

          {#each accels as accel}
            <rect
              y={yScale(accel.averageEce)}
              x={xScale(accel.startPos)}
              width={xScale(accel.pos) - xScale(accel.startPos)}
              height={610.832 - yScale(accel.averageEce)}
              style="stroke=rgb({accel.r},{accel.g},{accel.b}); fill:rgb({accel.r},{accel.g},{accel.b});fill-opacity:0.48;"
            />
          {/each}
          <path
            class="line"
            d={line()
              .x((d, j) => xScale(j))
              .y((d) => yScale(d.ece))
              .curve(curveBasis)(data)}
          />

          <line
            x1="1069.88"
            x2="1069.88"
            y1="610.832"
            y2={yScale(ece)}
            stroke-width="4"
            stroke="#0171FE"
          />
          <circle
            id="dot"
            cx="1069.88"
            cy={yScale(ece)}
            r="6"
            stroke="#0171FE"
            fill="#0171FE"
            style="stroke-width:3px;"
          />
        </g>
        <circle
          id="ball"
          cx="1069.91"
          cy={yScale(ece)}
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
        x="93.006"
        y="610.726"
        width="977.232"
        height="1"
        style="fill:none;stroke:url(#_Linear17);stroke-width:3px;stroke-linecap:square;"
      />
    </g>
    <text
      x="1039.4px"
      y="632.072px"
      style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
      >sek</text
    >
  </g>
  <defs>
    <image
      id="_Image1"
      width="1218px"
      height="692px"
      xlink:href="data:image/png;base64,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AACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUtYUNVMAAB0VSURBVBDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEIAwAAACAFIQwAAACAFIQwAAAAAFIQwgAAAABIQQgDAAAAIAUhDAAAAIAUhDAAAAAAUhDCAAAAAEhBCAMAAAAgBSEMAAAAgBSEMAAAAABSEMIAAAAASEEI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"
    />
    <linearGradient
      id="_Linear2"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(1140.5,0,0,614.172,47.5146,354.05)"
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
      gradientTransform="matrix(11.8017,0,0,1,1059.78,481.321)"
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
      gradientTransform="matrix(11.8017,0,0,1,1059.78,213.521)"
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
      gradientTransform="matrix(11.8017,0,0,1,1059.78,79.6215)"
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
      gradientTransform="matrix(11.8017,0,0,1,1059.78,347.421)"
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
      gradientTransform="matrix(6.12323e-16,10,-1,6.12323e-17,420.556,601.745)"
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
      gradientTransform="matrix(6.12323e-16,10,-1,6.12323e-17,94.9562,601.745)"
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
      gradientTransform="matrix(6.12323e-16,10,-1,6.12323e-17,746.176,601.745)"
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
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.73,347.426)"
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
      id="_Linear12"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.73,79.5709)"
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
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.73,213.526)"
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
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.73,79.6261)"
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
      gradientTransform="matrix(-976.6,-1.19599e-13,1.22465e-16,-1,1070.73,481.326)"
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
      id="_Image16"
      width="76px"
      height="74px"
      xlink:href="data:image/png;base64,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"
    />
    <linearGradient
      id="_Linear17"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-977.232,-1.19741e-13,1.22399e-16,-1,1070.24,611.226)"
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

<filter id="glow">
  <feDropShadow
    dx="0"
    dy="0"
    stdDeviation="2.5"
    flood-color="rgb({$currentColor.r}, {$currentColor.g}, {$currentColor.b}"
  />
</filter>

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
