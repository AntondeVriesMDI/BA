<script>
  import { isAcc } from "../Stores/dataPoints.js";
  import { currentAcc } from "../Stores/acceleration";
  import { scaleLinear } from "d3-scale";

  /**
   * Komponente des ACI-Displays (ECE)
   */

  /**
   * Skala besimmt die Position Balken im Display.
   * domain: Werteintervall
   * range: y-Werte des Displays
   */
  const yScale = scaleLinear().domain([0.7, 0.9]).range([614.456, 82.776]);

  //Array enthält 4 Beschleunigungen als Objekte
  let accels = [
    { averageECE: 0 },
    { averageECE: 0 },
    { averageECE: 0 },
    { averageECE: 0 },
  ];

  let toggle = false;
  //Aktuelle Beschleunigung
  let currentAccel = {};
  let isBeschl;

  /**
   * Abonniert den Store "isAcc". Wird aufgerufen wenn sich Wert des Stores ändert.
   * Weise dann den aktuellen Wert der Variable "isBeschl" zu.
   */
  isAcc.subscribe((newValue) => {
    isBeschl = newValue;
  });

  /**
   * Abonniert den Store "currentBeschleunigung". Wird aufgerufen wenn sich Wert des Stores ändert.
   * Fügt die jüngste Beschleunigung zum Array "Accels" hinzu und löscht die älteste Beschleunigung aus dem Array.
   * Dabei werden nur Beschleunigungen hinzugefügt die länger als 1 Sekunde dauern.
   */
  currentAcc.subscribe((newValue) => {
    if (
      isBeschl == false &&
      newValue.over == true &&
      newValue.duration > 1 &&
      toggle == false
    ) {
      accels[3] = accels[2];
      accels[2] = accels[1];
      accels[1] = accels[0];
      if (newValue.averageECE == undefined) {
        accels[0] = 0;
      } else {
        accels[0] = newValue;
      }
      toggle = true;
    } else if (isBeschl == true && newValue.over == false) {
      currentAccel = newValue;
      toggle = false;
    }
  });
</script>

<!--
  ---DISPLAY---
  Code für Animation: Zeile 124-138
-->
<svg
  width="100%"
  height="100%"
  viewBox="0 0 704 709"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xml:space="preserve"
  xmlns:serif="http://www.serif.com/"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
>
  <g id="AECEI">
    <use
      id="Hintergrund"
      xlink:href="#_Image1"
      x="8.586"
      y="8.39"
      width="685.76px"
      height="691.982px"
      transform="matrix(0.99965,0,0,0.999974,0,0)"
    />
    <path
      id="Hintergrund1"
      serif:id="Hintergrund"
      d="M656.435,90.387c-0,-23.783 -19.309,-43.092 -43.092,-43.092l-522.761,-0c-23.783,-0 -43.092,19.309 -43.092,43.092l-0,527.987c-0,23.784 19.309,43.093 43.092,43.093l522.761,-0c23.783,-0 43.092,-19.309 43.092,-43.093l-0,-527.987Z"
      style="fill:url(#_Linear2);"
    />
    <g>
      <use
        id="Display_Area"
        xlink:href="#_Image3"
        x="62.442"
        y="62.317"
        width="421.368px"
        height="571.634px"
        transform="matrix(0.998503,0,0,0.99936,0,0)"
      />
      <rect
        id="Display_Area1"
        serif:id="Display_Area"
        x="80.588"
        y="81.515"
        width="384.889"
        height="533.158"
        style="fill:rgb(15,18,21);"
      />
      <use
        id="Display_Area_ICI"
        xlink:href="#_Image4"
        x="451.794"
        y="62.317"
        width="133.042px"
        height="571.634px"
        transform="matrix(0.992853,0,0,0.99936,0,0)"
      />
      <rect
        id="Display_Area_ICI1"
        serif:id="Display_Area_ICI"
        x="466.81"
        y="81.515"
        width="96.552"
        height="533.158"
        style="fill:rgb(15,18,21);"
      />
      <g id="ACI0">
        <rect
          x="371.262"
          y={yScale(accels[0].averageECE)}
          width="93.23"
          height={614.456 - yScale(accels[0].averageECE)}
          style="fill:rgb({accels[0].r},{accels[0].g},{accels[0]
            .b});fill-opacity:0.48;"
        />
        {#if accels[0] !== undefined && accels[0].averageECE > 0}
          <rect
            x="371.262"
            y={yScale(accels[0].averageECE)}
            width="93.262"
            height="6.94"
            style="fill:rgb({accels[0].r},{accels[0].g},{accels[0].b});"
          />
        {/if}
        <g id="Achsen">
          <path
            d="M466.297,81.403l-0,533.512l0.094,-0l-0,-533.512l-0.094,-0Z"
            style="fill:none;stroke:url(#_Linear6);stroke-width:3px;stroke-linejoin:round;"
          />
        </g>
      </g>
      <g id="ACI1" serif:id="ICI">
        <rect
          x="274.483"
          y={yScale(accels[1].averageECE)}
          width="93.23"
          height={614.456 - yScale(accels[1].averageECE)}
          style="fill:rgb({accels[1].r},{accels[1].g},{accels[1]
            .b});fill-opacity:0.48;"
        />
        {#if accels[1] !== undefined && accels[1].averageECE > 0}
          <rect
            x="274.483"
            y={yScale(accels[1].averageECE)}
            width="93.262"
            height="6.94"
            style="fill:rgb({accels[1].r},{accels[1].g},{accels[1].b});"
          />
        {/if}
      </g>
      <g id="ACI2" serif:id="ICI">
        <rect
          x="177.747"
          y={yScale(accels[2].averageECE)}
          width="93.23"
          height={614.456 - yScale(accels[2].averageECE)}
          style="fill:rgb({accels[2].r},{accels[2].g},{accels[2]
            .b});fill-opacity:0.48;"
        />
        {#if accels[2] !== undefined && accels[2].averageECE > 0}<rect
            x="177.747"
            y={yScale(accels[2].averageECE)}
            width="93.262"
            height="6.94"
            style="fill:rgb({accels[2].r},{accels[2].g},{accels[2].b});"
          />
        {/if}
      </g>
      <g id="ACI3" serif:id="ICI">
        <rect
          x="80.898"
          y={yScale(accels[3].averageECE)}
          width="93.23"
          height={614.456 - yScale(accels[3].averageECE)}
          style="fill:rgb({accels[3].r},{accels[3].g},{accels[3]
            .b});fill-opacity:0.48;"
        />
        {#if accels[3] !== undefined && accels[3].averageECE > 0}
          <rect
            x="80.898"
            y={yScale(accels[3].averageECE)}
            width="93.262"
            height="6.94"
            style="fill:rgb({accels[3].r},{accels[3].g},{accels[3].b});"
          />
        {/if}
      </g>
      <g id="ICI" serif:id="ICI">
        {#if isBeschl == true && currentAccel.averageECE > 0}
          <rect
            x="467.566"
            y={yScale(currentAccel.averageECE)}
            width="93.23"
            height={614.456 - yScale(currentAccel.averageECE)}
            style="fill:rgb({currentAccel.r},{currentAccel.g},{currentAccel.b});fill-opacity:0.48"
          />
          <rect
            x="467.566"
            y={yScale(currentAccel.averageECE)}
            width="93.23"
            height="6.94"
            style="fill:rgb({currentAccel.r},{currentAccel.g},{currentAccel.b});"
          />
        {/if}
        <g id="Skalierung-und-Achsen" serif:id="Skalierung und Achsen">
          <g id="Achsen">
            <path
              d="M464.425,81.549l-0,533.261l1,-0l-0,-533.261l-1,0Z"
              style="fill:none;stroke:url(#_Linear5);stroke-width:3px;"
            />
            <rect
              x="80.556"
              y="614.73"
              width="481.752"
              height="1"
              style="fill:none;stroke:url(#_Linear6);stroke-width:3px;"
            />
          </g>
          <g id="Skalierung">
            <rect
              x="552.886"
              y="481.83"
              width="10"
              height="1"
              style="fill:none;stroke:url(#_Linear7);stroke-width:3px;"
            />
            <rect
              x="552.886"
              y="348.93"
              width="10"
              height="1"
              style="fill:none;stroke:url(#_Linear8);stroke-width:3px;"
            />
            <rect
              x="552.886"
              y="216.03"
              width="10"
              height="1"
              style="fill:none;stroke:url(#_Linear9);stroke-width:3px;"
            />
            <rect
              x="552.874"
              y="83.13"
              width="10"
              height="1"
              style="fill:none;stroke:url(#_Linear10);stroke-width:3px;"
            />
          </g>
          <g id="Skalierung_Beschriftung">
            <text
              x="566.394px"
              y="490.239px"
              style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
              >0.75</text
            >
            <text
              x="566.394px"
              y="357.339px"
              style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
              >0.8</text
            >
            <text
              x="566.394px"
              y="224.439px"
              style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
              >0.85</text
            >
            <text
              x="566.394px"
              y="91.542px"
              style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
              >0.9</text
            >
          </g>
        </g>
        <g id="Graphlines">
          <rect
            id="_30"
            serif:id="30"
            x="80.685"
            y="83.148"
            width="480.918"
            height="1"
            style="fill:none;stroke:url(#_Linear11);stroke-width:1px;"
          />
          <rect
            id="_301"
            serif:id="30"
            x="80.685"
            y="348.948"
            width="480.918"
            height="1"
            style="fill:none;stroke:url(#_Linear12);stroke-width:1px;"
          />
          <rect
            id="_302"
            serif:id="30"
            x="80.685"
            y="481.848"
            width="480.918"
            height="1"
            style="fill:none;stroke:url(#_Linear13);stroke-width:1px;"
          />
          <rect
            id="_303"
            serif:id="30"
            x="80.685"
            y="216.048"
            width="480.918"
            height="1"
            style="fill:none;stroke:url(#_Linear14);stroke-width:1px;"
          />
          <rect
            id="_304"
            serif:id="30"
            x="80.685"
            y="83.155"
            width="480.918"
            height="1"
            style="fill:none;stroke:url(#_Linear15);stroke-width:1px;"
          />
        </g>
      </g>
      <text
        x="572.556px"
        y="616.29px"
        style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
        >0.7 ECE</text
      >
    </g>
    <defs>
      <image
        id="_Image1"
        width="686px"
        height="692px"
        xlink:href="data:image/png;base64,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AEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAApCBcAQBIQbgCAJCCcAUAIAXhCgBACsIVAIAUhCsAACkIVwAAUhCuAACkIFwBAEhBuAIAkIJwBQAgBeEKAEAKwhUAgBSEKwAAKQhXAABSEK4AAKQgXAEASEG4AgCQgnAFACAF4QoAQArCFQCAFIQrAAApCFcAAFIQrgAA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"
      />
      <linearGradient
        id="_Linear2"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(608.945,0,0,614.172,47.4899,354.381)"
        ><stop
          offset="0"
          style="stop-color:rgb(35,41,47);stop-opacity:1"
        /><stop
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
        width="422px"
        height="572px"
        xlink:href="data:image/png;base64,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IIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIgijABEEWYAIgiTABEESYAoggTAFGECYAowgRAFGECIIowARBFmACIIkwARBEmAKIIEwBRhAmAKMIEQBRhAiCKMAEQRZgAiCJMAEQRJgCiCBMAUYQJgCjCBEAUYQIg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"
      />
      <image
        id="_Image4"
        width="134px"
        height="572px"
        xlink:href="data:image/png;base64,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"
      />
      <linearGradient
        id="_Linear5"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(3.26528e-14,-533.26,1,6.12323e-17,464.925,614.81)"
        ><stop offset="0" style="stop-color:white;stop-opacity:1" /><stop
          offset="0.59"
          style="stop-color:rgb(253,255,255);stop-opacity:0.95"
        /><stop
          offset="0.8"
          style="stop-color:rgb(247,254,255);stop-opacity:0.84"
        /><stop
          offset="1"
          style="stop-color:rgb(242,253,255);stop-opacity:0.74"
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
        gradientTransform="matrix(-481.752,-5.89976e-14,1.22465e-16,-1,562.308,615.23)"
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
      <linearGradient
        id="_Linear7"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(10,0,0,1,552.886,482.33)"
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
        gradientTransform="matrix(10,0,0,1,552.886,349.43)"
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
        gradientTransform="matrix(10,0,0,1,552.886,216.53)"
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
        gradientTransform="matrix(10,0,0,1,552.874,83.63)"
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
        gradientTransform="matrix(-480.918,-5.88955e-14,1.22465e-16,-1,561.603,83.6476)"
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
        gradientTransform="matrix(-480.918,-5.88955e-14,1.22465e-16,-1,561.603,349.448)"
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
        gradientTransform="matrix(-480.918,-5.88955e-14,1.22465e-16,-1,561.603,482.348)"
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
        gradientTransform="matrix(-480.918,-5.88955e-14,1.22465e-16,-1,561.603,216.548)"
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
        gradientTransform="matrix(-480.918,-5.88955e-14,1.22465e-16,-1,561.603,83.6552)"
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
    </defs>
  </g></svg
>

<style>
  svg {
    width: 50%;
    height: auto;
    display: block;
    margin: auto;
  }
</style>
