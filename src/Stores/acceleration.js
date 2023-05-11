import { writable } from 'svelte/store';
import { derived } from 'svelte/store';
import { currentDataPoint, isAcc, getPercDist } from '../Stores/dataPoints.js';
import { currentEce, currentConsumption } from '../Stores/metrics.js';
import {getColor} from "../Stores/colors.js"

/**
 * Enthält den Store currentAcc
 */

let firstdata = true; 
let currentAccel = {};
let id = 0;
/**
 * Aktuelles Beschleunigungsobjekt
 * enthält: 
 * Start und Endzeitpunkt der Beschleunigung
 * Durchschnittlicher Verbrauch
 * Durchschnittliche ECE
 * Durchschnittlicher Thrrottle
 * ID der Beschleunigung
 * Dauer 
 * Fabberwertung (RGB)
 */
 export const currentAcc = derived([currentDataPoint, isAcc, currentConsumption, currentEce], ([$currentDataPoint, $isAcc, $currentConsumption, $currentEce]) =>{
    if($isAcc && $currentDataPoint){
        if(firstdata){
          createNew($currentDataPoint, $currentConsumption, $currentEce);
          firstdata = false;
        }else{
          updateAcc($currentDataPoint, $currentConsumption, $currentEce);
        }
    }else{
      currentAccel.over = true;
      firstdata = true;
    }
    return currentAccel;
  });

  /**
 * Erzeugt ein neues Beschleunigungsobjekt
 * @param {} dataPoint aktueller Datenpunkt
 * @param {*} con aktueller Verbrauch
 * @param {*} ece aktuelle ECE
 */
const createNew = function(dataPoint,con,ece){
    currentAccel = new Object();
    currentAccel.datacounter = 0;
    currentAccel.sumcon = 0
    currentAccel.average = 0
    currentAccel.sumECE = 0
    currentAccel.averageECE = 0
    currentAccel.sumThrottle = 0;
    currentAccel.averageThrottle = 0;
    currentAccel.id = id;
    id++
    currentAccel.start = dataPoint.time;
    currentAccel.end = dataPoint.time;
    currentAccel.duration = 0;
    currentAccel.over = false;
    currentAccel.r = 0;
    currentAccel.g = 0;
    currentAccel.b = 0;
    updateAcc(dataPoint,con,ece);
  };

  /**
   * Aktualisiert das Beschleunigungsobjekt
   * @param {*} dataPoint - aktuellerDatenPunkt
   * @param {*} con - aktueller Verbrauch
   * @param {*} ece - aktuelle ECE
   */
const updateAcc = function(dataPoint, con, ece){
    currentAccel.datacounter++
    currentAccel.sumcon = currentAccel.sumcon + con
    currentAccel.average = currentAccel.sumcon / currentAccel.datacounter
    currentAccel.sumECE = currentAccel.sumECE + ece
    currentAccel.averageECE = currentAccel.sumECE / currentAccel.datacounter
    currentAccel.sumThrottle = currentAccel.sumThrottle + dataPoint.throttle
    currentAccel.averageThrottle = currentAccel.sumThrottle / currentAccel.datacounter
    currentAccel.end = dataPoint.time;
    currentAccel.duration = currentAccel.end - currentAccel.start
    averageColor(currentAccel.averageECE);
  };

/**
* Ermittelt die durchschnittliche Farbbewertung für das Beschleunigungsobjekt
* @param {} averageECE - Durchschnittliche ECE
*/
const averageColor = function(averageECE){
    let color = getColor(100 - getPercDist(0.7, 0.88, averageECE));

    currentAccel.r = color.r;
    currentAccel.g = color.g;
    currentAccel.b = color.b;
  };