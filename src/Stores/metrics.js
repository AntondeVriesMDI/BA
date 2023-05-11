import { writable } from 'svelte/store';
import { derived } from 'svelte/store';
import { scaleLinear } from "d3-scale";
import { currentDataPoint, getValueFromPercentDist, getIndexes, getPercDist, currentSpeed } from "../Stores/dataPoints.js";

/**
 * Berechnet alle Metriken durch Stores (ECE und kWh/km)
 */

//Map der ECE
const efficiencyMapValues = [
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [
      0.7, 0.723418186, 0.758787864, 0.767137591, 0.760788743, 0.752388867,
      0.746292794, 0.740676241, 0.730818134, 0.726345965, 0.715914639,
    ],

    [
      0.7, 0.753610288, 0.805869295, 0.812431638, 0.809574789, 0.807666017,
      0.804359027, 0.800954113, 0.792348594, 0.783343237, 0.769329441,
    ],

    [
      0.7, 0.770920836, 0.823156977, 0.835300484, 0.83394582, 0.83135591,
      0.830175772, 0.825524969, 0.821046359, 0.816525129, 0.80674766,
    ],

    [
      0.7, 0.764503009, 0.831899951, 0.849889592, 0.850326979, 0.849962727,
      0.848989307, 0.846461075, 0.843426802, 0.839272883, 0.808004859,
    ],

    [
      0.7, 0.777613757, 0.848567847, 0.859580638, 0.861693424, 0.862821504,
      0.862885798, 0.861845599, 0.859829962, 0.853571269, 0.808262558,
    ],

    [
      0.7, 0.808042881, 0.850319892, 0.865665409, 0.872209944, 0.873054411,
      0.873250529, 0.86966634, 0.863617869, 0.860025992, 0.832559861,
    ],

    [
      0.7, 0.803812249, 0.852288508, 0.867997957, 0.87897319, 0.879970526, 0.88,
      0.876692437, 0.869807183, 0.86231639, 0.824829062,
    ],
    [
      0.7, 0.794057161, 0.845510236, 0.867811018, 0.876832838, 0.88,
      0.879905765, 0.878130335, 0.868703422, 0.858013941, 0.835850828,
    ],

    [
      0.7, 0.781416499, 0.8358298, 0.865409578, 0.875771178, 0.879614963,
      0.877381142, 0.872126578, 0.864439542, 0.854626639, 0.842079536,
    ],

    [
      0.7, 0.771523275, 0.823222905, 0.856227136, 0.867111807, 0.871813911,
      0.871654624, 0.866370827, 0.858738168, 0.848549315, 0.836527588,
    ],

    [
      0.7, 0.758920457, 0.808213949, 0.844602443, 0.855385968, 0.86, 0.86,
      0.858167374, 0.854393246, 0.84308132, 0.832257636,
    ],

    [
      0.7, 0.745294993, 0.786928395, 0.819136703, 0.838825111, 0.848660086,
      0.852228706, 0.853241832, 0.844230008, 0.834784629, 0.824686136,
    ],

    [
      0.7, 0.732714959, 0.765301131, 0.796673543, 0.824574116, 0.837850287,
      0.846055324, 0.841710006, 0.83589766, 0.827729053, 0.81875825,
    ],

    [
      0.7, 0.701434479, 0.702868957, 0.733620384, 0.767383996, 0.795928514,
      0.823277743, 0.828452945, 0.82502554, 0.818716865, 0.810696405,
    ],
    [
      0.7, 0.7, 0.7, 0.7, 0.7, 0.709997101, 0.738915581, 0.767625779,
      0.78531552, 0.803005262, 0.803109749,
    ],
    [
      0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.702901421, 0.711488641,
      0.720075862,
    ],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
    [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7],
  ];

  //Geschwindigkeiten (y-achse von Map)
  const mapKeys = [
    0, 6.75, 13.5, 20.25, 27, 33.75, 40.5, 47.25, 54, 60.75, 67.5, 74.25, 81,
    87.75, 94.5, 101.25, 108, 114.75, 121.5, 128.25, 135,
  ];

  //Pedal Positionen (x-aachse von Map)
  const pedalValues = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  let toggle = false;
  let workaround = 0.000000000001

/**
 * Momentanverbrauch in kWh/km
 */
 export const currentConsumption = derived( [currentDataPoint, currentSpeed] , ([$currentDataPoint, $currentSpeed]) =>{
    if($currentDataPoint){
      //faktor abhängig von datenfrequenz bei 0.2 = 5,5556e-5, bei 0.01 = 2,77778e-6
      let kWh = ($currentDataPoint.motorPower * 2.7778e-5)/1000;
      let kWhproKm = kWh / ($currentSpeed.m * 0.10 / 1000);
      return kWhproKm;
    } 
    return 0;
  });
  
 
  
  /**
   * Momentane ECE
   * (abgerundete Abgaben um sprünge zu verhindern)
   */
  export const currentEce = derived ( [currentDataPoint, currentSpeed] , ([$currentDataPoint, $currentSpeed]) => {
    if($currentDataPoint !== undefined && currentDataPoint.speed !== null && $currentDataPoint.throttle !== null && $currentSpeed !== undefined){
      if($currentDataPoint.throttle == 0 || $currentSpeed == 0){
        if(toggle == false){
          toggle = true;
          return 0.7
        }else{
          toggle = false
          return 0.700000001
        }
      }
      //Schlüssel indexe der Map 
      let geschwIndex = getIndexes(mapKeys, $currentSpeed.km);
      let throttleIndex = getIndexes(pedalValues, $currentDataPoint.throttle);
    
  
      //Nächsten Geschwindigkeit über und unter der aktuellen Geschw.
      let highGeschwValue = mapKeys[geschwIndex.high];
      let lowGeschwValue = mapKeys[geschwIndex.low];
  
      //Nachsten throotle-Wert ber und unter dem aktuellen Wert
      let highThrottleValue = pedalValues[throttleIndex.high];
      let lowThrottleValue = pedalValues[throttleIndex.low];
  
      /**Prozentuale Abstände zwischen Geschwindigkeitsschlüssel und Geschwindigkeit 
       * + Throttleschlüssel und Throttle
      */
      let geschwPercDist = getPercDist(lowGeschwValue, highGeschwValue, $currentSpeed.km);
      let throttlePercDist = getPercDist(lowThrottleValue, highThrottleValue, $currentDataPoint.throttle);
  
      /**
       * Obere ECE und untere ECE-Schranke berechnen (ECE-Skala)
       */
      let lowLowEce = efficiencyMapValues[geschwIndex.low][ throttleIndex.low];
      let highHighEce = efficiencyMapValues[geschwIndex.high] [ throttleIndex.high];
  
      workaround += 0.00000000000001
     //ECE aus prozentuelem Abstand der Geschw. und Throttle Werte auf ECE-Skala
      return getValueFromPercentDist(lowLowEce,highHighEce, (geschwPercDist + throttlePercDist) /2) + workaround;
      
    }else{
    return 0.7;
    }
  });