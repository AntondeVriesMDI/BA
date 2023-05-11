import { derived } from "svelte/store";
import { scaleLinear } from "d3-scale";
import { currentDataPoint, getPercDist } from "../Stores/dataPoints.js";
import { currentEce } from "../Stores/metrics.js";

/**
 * Berechnet die Farbbewwertung der Displays
 */

//Farben des Gradienten in RGB
const COLORS = [
  { name: "green", percent: 0, r: 46, g: 229, b: 0 },
  { name: "yellow", percent: 50, r: 255, g: 246, b: 82 },
  { name: "red", percent: 110, r: 255, g: 82, b: 82 },
];

/**
 * Akutelle Farbe (Fabrbewertungen der Displays)
 */
export const currentColor = derived(
  [currentDataPoint, currentEce],
  ([$currentDataPoint, $currentEce]) => {
    return getColor(100 - getPercDist(0.7, 0.88, $currentEce));
  }
);

/**
 * Ermittelt aktuelle Farbbewertungen
 * @param {} percDist prozentuale Distanz zwischen aktueller ECE und höchstmöglicher ECE
 * @returns Farbe in RGB
 */
export const getColor = function (percDist) {
  let domainstart = COLORS[0];
  let domainend = COLORS[1];

  if (percDist > 50) {
    domainstart = COLORS[1];
    domainend = COLORS[2];
  }
  const rScale = scaleLinear()
    .domain([domainstart.percent, domainend.percent])
    .range([domainstart.r, domainend.r]);
  const gScale = scaleLinear()
    .domain([domainstart.percent, domainend.percent])
    .range([domainstart.g, domainend.g]);
  const bScale = scaleLinear()
    .domain([domainstart.percent, domainend.percent])
    .range([domainstart.b, domainend.b]);

  return {
    r: rScale(percDist),
    g: gScale(percDist),
    b: bScale(percDist),
  };
};
