<script>
  import { currentEce } from "../Stores/metrics.js";
  import { currentColor } from "../Stores/colors.js";
  import { scaleLinear } from "d3-scale";

  /**
   * Skala besimmt die Position der Icei Anzeige im Display.
   * domain: Werteintervall
   * range: y-Werte des Displays
   */
  const yScale = scaleLinear().domain([0.7, 0.9]).range([619.4, 87.72]);
  let smoothEce = 0;

  /**
   * Abonniert den Store "smoothCurrentEce". Wird aufgerufen wenn sich Wert des Stores ändert.
   * Weise dann den aktuellen "Energy-Conversion-Efficiency" der Variable "smoothEce" zu
   */
  currentEce.subscribe((newValue) => {
    if (newValue >= 0.7) {
      smoothEce = newValue;
    } else {
      smoothEce = 0.7;
    }
  });
</script>

<!--
  ---DISPLAY---
  Code für Animation: Zeile 143 - 179
-->
<svg
  width="100%"
  height="100%"
  viewBox="0 0 336 698"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xml:space="preserve"
  xmlns:serif="http://www.serif.com/"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
>
  <g id="ICEI_rot">
    <use
      id="Rahmenunten"
      xlink:href="#_Image1"
      x="10.983"
      y="10.794"
      width="315.155px"
      height="677.424px"
      transform="matrix(0.997326,0,0,0.99915,0,0)"
    />
    <path
      id="Rahmenunten1"
      serif:id="Rahmenunten"
      d="M251.976,48.001c-0.582,-0.073 -1.166,-0.128 -1.751,-0.165l-1.333,-0.083c-0.583,-0.037 -1.167,-0.055 -1.752,-0.055l-158.216,-0c-20.89,-0 -41.042,18.267 -41.042,44.172c0,-0 0,514.255 0,514.255c0,25.905 20.152,44.173 41.042,44.173l158.216,-0c20.891,-0 41.042,-18.268 41.042,-44.173l0,-514.255c0,-23.92 -17.417,-41.5 -36.206,-43.869Zm-3.503,27.78l-1.333,-0.083l-158.216,-0c-7.198,-0 -13.042,7.246 -13.042,16.172l0,514.255c0,8.926 5.844,16.173 13.042,16.173l158.216,-0c7.198,-0 13.042,-7.247 13.042,-16.173l0,-514.255c0,-8.368 -5.136,-15.26 -11.709,-16.089Z"
      style="fill:url(#_Linear2);"
    />
    <use
      id="Display_Area"
      xlink:href="#_Image3"
      x="47.134"
      y="52.699"
      width="241.298px"
      height="599.783px"
      transform="matrix(0.997097,0,0,0.999638,0,0)"
    />
    <rect
      id="Display_Area1"
      serif:id="Display_Area"
      x="65.238"
      y="71.918"
      width="204.816"
      height="561.307"
      style="fill:rgb(15,18,21);"
    />
    <g id="Skalierung-und-Achsen" serif:id="Skalierung und Achsen">
      <g id="Achsen">
        <rect
          x="75.605"
          y="619.572"
          width="182.811"
          height="1"
          style="fill:none;stroke:url(#_Linear4);stroke-width:3px;"
        />
      </g>
      <g id="Skalierung">
        <rect
          x="153.086"
          y="486.672"
          width="28.847"
          height="1"
          style="fill:none;stroke:url(#_Linear5);stroke-width:3px;"
        />
        <rect
          x="153.115"
          y="353.772"
          width="28.8"
          height="1"
          style="fill:none;stroke:url(#_Linear6);stroke-width:3px;"
        />
        <rect
          x="153.115"
          y="220.872"
          width="28.8"
          height="1"
          style="fill:none;stroke:url(#_Linear7);stroke-width:3px;"
        />
        <rect
          x="153.103"
          y="87.972"
          width="28.8"
          height="1"
          style="fill:none;stroke:url(#_Linear8);stroke-width:3px;"
        />
      </g>
      <g id="Skalierung_Beschriftung">
        <text
          x="192.91px"
          y="495.091px"
          style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
          >0.75</text
        >
        <text
          x="192.91px"
          y="362.191px"
          style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
          >0.8</text
        >
        <text
          x="192.91px"
          y="229.291px"
          style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
          >0.85</text
        >
        <text
          x="192.91px"
          y="96.343px"
          style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
          >0.9</text
        >
      </g>
    </g>
    <g id="gruppe">
      <g>
        <line
          x1="166.953"
          x2="166.953"
          y1="619.4"
          y2={yScale(smoothEce)}
          stroke-width="4"
          stroke="#0171FE"
        />
      </g>
      <circle
        id="dot"
        cx="166.953"
        cy={yScale(smoothEce)}
        r="6"
        stroke="#0171FE"
        fill="#0171FE"
        style="stroke-width:3px;"
      />
      <circle
        id="ball"
        cx="166.953"
        cy={yScale(smoothEce)}
        r="20"
        style="fill:none;stroke:rgb({$currentColor.r}, {$currentColor.g}, {$currentColor.b};stroke-width:3px;"
        filter="url(#glow)"
      />
      <filter id="glow">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="2.5"
          flood-color="rgb({$currentColor.r}, {$currentColor.g}, {$currentColor.b}"
        />
      </filter>
    </g>
    <g id="Graphlines" />
    <g />
    <text
      x="181.952px"
      y="615.725px"
      style="font-family:'Roboto-Medium', 'Roboto';font-weight:500;font-size:20px;fill:white;"
      >0.7 ECE</text
    >
    <path
      id="Rahmenoben"
      d="M251.976,48.001c-0.582,-0.073 -1.166,-0.128 -1.751,-0.165l-1.333,-0.083c-0.583,-0.037 -1.167,-0.055 -1.752,-0.055l-158.216,-0c-20.89,-0 -41.042,18.267 -41.042,44.172c0,-0 0,514.255 0,514.255c0,25.905 20.152,44.173 41.042,44.173l158.216,-0c20.891,-0 41.042,-18.268 41.042,-44.173l0,-514.255c0,-23.92 -17.417,-41.5 -36.206,-43.869Zm-3.503,27.78l-1.333,-0.083l-158.216,-0c-7.198,-0 -13.042,7.246 -13.042,16.172l0,514.255c0,8.926 5.844,16.173 13.042,16.173l158.216,-0c7.198,-0 13.042,-7.247 13.042,-16.173l0,-514.255c0,-8.368 -5.136,-15.26 -11.709,-16.089Z"
      style="fill:url(#_Linear10);"
    />
  </g>
  <defs>
    <image
      id="_Image1"
      width="316px"
      height="678px"
      xlink:href="data:image/png;base64,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Nd18bg3CA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2IDwAaAPCA4A2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"
    />
    <linearGradient
      id="_Linear2"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(184.3,0,0,546.6,75.8821,348.998)"
      ><stop offset="0" style="stop-color:rgb(35,41,47);stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(42,51,58);stop-opacity:1"
      /><stop
        offset="1"
        style="stop-color:rgb(68,85,95);stop-opacity:1"
      /></linearGradient
    >
    <image
      id="_Image3"
      width="242px"
      height="600px"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAAJYCAYAAABYcLsFAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAPDklEQVR4nO3c23LbOBqF0d+HpHve/2VnktieixgxDAMQZcXd1s5aVSwdLInqiy8AQapv6vO5+be/ABzw9G9/gd6l0XxUdGLmM/uoiN/9uZcEc+S9u9eIlUS7GI+E+q6Yj8a0et34/NHXnbt/uAarCI8+f+77f7lkVL0Z7s9edzN57Tn7hmszi+7pxN+eJq898rm/3J/4UrsRdxXyked3+4BrdCrAo8GuPvNm955zjmF3gd5Mnpu9bvd5cK12gc5CHp8b/3bk815Zjciz6GYht+221nHPHs/2JWau0ZFp8yzc/vFjvQ14to+qxch85Nh1N/reLu7vttl+xMw1mkU83j+1PS7u70bpcT8nV537+G6H++3xeH8XeP+ZptakWMXbP54F29+O96t7XHUi5n5qfSTiPs5T2xj5kVEartWRkXeMtW2tg8fh86p+9tNe0z9f1U2zd8fIY8RjnP1297z1j1dhHw1Z4HxGu+PY1bR5DPdhuP9Qb5vo37uLuarmIZ86Ju5Dvdts4+tWU28LYFyLowtb49S5hdvftq011Qfd9PG20Xca8333otFqOj0Gez+5va951Lvp9up7wGe1Oo3UT6Nn8f543tr9voeHxT5uu8/u3VTV032tTyv1j2cR3y+2L8Pj2Qi9mmZXiZnrsIu43Y4R/+i27/US8Y9az07HBa+b4W9VVTe7K7tWC1t9xF8m2yzmMejxuLnfH1yLfiV5djw8C7hFfP98+71enxEaP7v//Ok55Kr9qnV7bjYi9xF/7W6/1jrs9r7ZMXNNbuEzm12lNU6n2/S5jb4t3BbxeGq2/+xxW/V5aNV6HJHH0fhrt/01PB6j7kfm8Th5tn/4rHaLXf1o3I/Abfv2vPWHmeN0eXWBSHvtyVXrMeBTx8ct5r8mWx/zbPGrTakhyTitbkG3iPvBbAx4PE01XkTSFrzerFzvQh5jnkXch/x3t/Uxty/uIhD+BH0z9/Uy1f5Rrwe1PuRVxP3WR7wNebV6PbvwYzYa/11V/6mXkNtofFfC5c8yDlarhd6q+ZT84fn1/Xnmx8nnbo+Rd0HPFrrGEfk/9TISz1bj4E9zU2+vo6iaBzxeLDKbxb45Tj6y2DUeJ6+m1v10+ks5BoZeH3PV/hTVfb2cY15db/HKeGXXqYtBdivX/TGxiGGuHTt/rZdTVOOpqfECqtUvCNsx89N7RuTVqGwkhmNu62crj/US8HiKdhbxckTuoxtrHy+jPBVzvzoNrLVp9tjPLuLZ8fKv1sbRczXFPnWZpojhPGPMswumxhXu5W8SZtPg1ar17iovEcP5+phnEa+m1G9a2x3Pjh+yGpnbJmQ4Twt5dp75nP8Jx6tfHs1u2/3ZJZvjaraQ4Tz99RmziGfXYk9bnS12jTtaXbLZj8hWquF9xo5O/V6/t1zs6v84W8Vu75mNzEZkOM+qo/E3+rsZc1WtR9LxhauLRE7O3YGt2RrUcnV68riqji12zXYoYPi9TvV1aLHr0p0C73dxT0dCFi38887q7lTI25Uy4EOc3d3vmFoDl/vwqfVsh8DHObsxF3JAACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDACFDgPeE/PTbvwXQO7ux947IT90GXO6ipk6FPPtQ8cLHOru7IyPyUxmB4Z92Vne/Y2otbrjMxT3tQh4/dNyZiOH3OdXXtrdVyOMbnrrbp6p6fN4EDZfpGxq7qlq3+Mos5PEDxljbjh6HTcxwnlVHj93fZ1G/aa0PebVSNv6L0e/84Xl7nLwXOG3sqG/s1GHsr+duhydmxa8i7mM2IsP5Wk99xKuY+/e8uT2y2DWbw48j8kMJGc71VK8bmsV8aHF5d4zc7q9CfqiqH8+bkOF8LeS+o13I/fteGUMeF7ja/dlI3Hb+vcQM5+ojbg3NYu4PW5er2bPFrtni1myBqw9ZzHDcGPEY8rjwNVv8qu627jc7mk2pVxF/q6ov9fMfhpuqurv8vxViPdZLN9/qeMzL4+QW8lP9DHCsfYx4Nq3+9vw59/Uz5Baz3zrDW4/1s51vVfW/eh3zOL2exVyT++8akfuI75+/xN3z1kJun92ihj9d66iPuG2rUfnwiHxXL6HddPfHkfV2eO5m+PvN8P5m9Tz8Sdox8ff6Ge5/h60PejU6j8fL/We/CrnqdXjjtgp3FuruBHbbD6QaZ7JtBruLuB+Zx2Pl2Wmp6m7fjMjV3e9H513g/ft2F4+MV3+JmURjvG0aPQY8G4l3U+x2Rmh2tdebY+Tx3PFNd/tQL9PrH/V6ql3D+/ql9S/PW1sQu6u30/SRyPnMdr9LWK0n9Wd4+u3oSLw6BVVVxxa7Wsgt5t1IPIv4/vn2rl4WwNpMoP+HYDYzgM9qds1zC60F2KJskX6vedTfa39sfPInw33I7RTU+GX7mPuQV68bV7X7kbgfjcfTVBbFuDZ9WLMfFY3XXYxXQ45h9xdWrU49jfuvqvWI3H/JtkLWj8rj6/qR+Mvz7SzgdrtaNKsSM9dhdiVkPyqP116MQX+vt4GfukxzedXkfb0eicfFqP5fm1lgqyu/+oD7iPvTWSLm2u1iHqfZ/XFvH+x4uzo+nu3r1/cYr+zqtXhvu8fjf8T4xe+6L9WPwOMx8e7cc5Ww+ZymP1jonpuNymPMY9SzeHfXWk+/02xq3V48u2RzPBE9OyboA54dD586B92ImM9oNb0dR+Ux6LGTcRa7Ol07jsDTKfZu1brq5fTTbb2M0LMv/NS97rZeFsVW0+gjIcM1WXUxm27Pot1F/Djs443dqvUs5v758cu314wj73i+eBawmLlmqyb6x7Np8hh2f7/qdMS/Hh+5GGMV4S7YI6Pv7L6guSazY+ZV1LuRenb/1HT61eOjx6ezCFdBj3+fPZ7tS8Rco6MLYLvHu184nYy4ah/PLOb+/mqUrsnfjnweXKvViNw/HgPun9uNvicjrjod0NH4VsEeOUcsYhLsVrPb7SzQXbiHIq46FtGRAN8zbRYwiZbnejd/28V76vmqOh7TOcfSl7wfrtm5ER4dcbcRV10W0iWj+aX7hs9qF93JIA++5o1LY/qoGEXOZ/au2D7ycz9jMJ/xO8Hoo2J+l/8DtGO1XiZpMKwAAAAASUVORK5CYII="
    />
    <linearGradient
      id="_Linear4"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(-182.811,-2.52148e-13,-1.41953e-15,-1,258.416,620.072)"
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
      id="_Linear5"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(28.8467,0,0,1,153.086,487.172)"
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
      gradientTransform="matrix(28.8,0,0,1,153.115,354.272)"
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
      gradientTransform="matrix(28.8,0,0,1,153.115,221.372)"
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
      gradientTransform="matrix(28.8,0,0,1,153.103,88.4715)"
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
    <image
      id="_Image9"
      width="76px"
      height="74px"
      xlink:href="data:image/png;base64,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"
    />
    <linearGradient
      id="_Linear10"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(184.3,0,0,546.6,75.8821,348.998)"
      ><stop offset="0" style="stop-color:rgb(35,41,47);stop-opacity:1" /><stop
        offset="0.53"
        style="stop-color:rgb(42,51,58);stop-opacity:1"
      /><stop
        offset="1"
        style="stop-color:rgb(68,85,95);stop-opacity:1"
      /></linearGradient
    >
  </defs>
</svg>

<style>
  svg {
    width: 30%;
    height: auto;
    display: block;
    margin: auto;
  }
</style>
