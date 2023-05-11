
import { writable } from 'svelte/store';
import { derived } from 'svelte/store';

/**
 * Enthält die Stores:
 *  CurrentDataPoint und futureDataPoint
 *  Sowie einige helper-functions
 */

let oldSpeed = 0;
export let data;
/**
 * aktueller Datenpunkt aus data.json (AUS WEBAPP DER EDA-STUDIE ÜBERNOMMEN)
 */
export const currentDataPoint = writable();

/**
 * zukünftigerDatenpunkt aus data.json
 */
export const futureDataPoint = writable();

/**
 * Aktuelle Geschwindigkeit 
 * in ms un km/h
 */
export const currentSpeed = derived(currentDataPoint, ($currentDataPoint) =>{
  if($currentDataPoint && $currentDataPoint.speed > 0){
   return { km: $currentDataPoint.speed * 3.6,
            m: $currentDataPoint.speed,
          }
  }
  return { km: 0, m: 0}
});

/**
 * Überprüft ob eine Beschleunigung vorliegt oder nicht
 */
export const isAcc = derived([currentSpeed, currentDataPoint, futureDataPoint], ([$currentSpeed, $currentDataPoint, $futureDataPoint]) => {
  if((oldSpeed !== undefined && oldSpeed !== null && $currentDataPoint !== undefined && $currentDataPoint.speed !==null && $futureDataPoint !== undefined)){
    if ((oldSpeed < $currentSpeed.km|| oldSpeed < $futureDataPoint.speed * 3.6) && $currentDataPoint.throttle > 0.1 && $currentDataPoint.brake == 0) {
      oldSpeed = $currentSpeed.km 
      return true;
    }else{ 
      oldSpeed = $currentSpeed.km 
      return false;
    }
  }else{
    oldSpeed = 0;
    return false;
  }
  });


/**
 * Berechnet einen Wert auf einer Skala (obere + unter SChranke) anhand eines prozentualen Wertes
 * @param {*} low: untere Schranke
 * @param {*} high: obere Schranke
 * @param {*} percDist: prozentualeDistanz/Positionierung
 */
export const getValueFromPercentDist = function(low, high, percDist){
  let dist = Math.abs(high - low);
  let value = (dist * percDist) / 100;

  if(low < high){
    return value + low;
  }else if(low > high){
    return value + high;
  }else{
    return high;
  }
}

/**
 * Ermittelt für einen Wert, die zwei Arrayindexe die an ihm nächsten dran sind
 * @param {*} array: das Array
 * @param {*} value: der Wert
 * @returns {low: lower index, high: higher index}
 */
export const getIndexes = function(array, value){
  for(let i = 0; i<array.length - 1; i++){
    if(array[i] < value && array[i+1] > value){
      return {low: i, high: i+1}
    }else if(array[i] == value){
      return{low:i, high:i}
    }else if(array[i+1] == value){
      return{low:i+1 , high:i+1}
    }
  }
}
/**
 * gets the percentual Distance of a Value in a Value range
 * Ermittelt die prozentuele Positionierung eines Wertes auf einer Skala
 * @param {*} low: untere Schranke
 * @param {*} high: obere Schranke
 * @param {*} v: Wert
 * @returns  prozentuale Distanz zur oberen SChranke
 */
export const getPercDist = function(low, high , v){
  if(low < high){
    let dist = Math.abs(high - low);
    let valuedistlow = Math.abs(v - low);
    if (dist > 0){
      return (valuedistlow/dist) * 100
    }
  }else if( high < low){
    let dist = Math.abs(low - high);
    let valuedistlow = Math.abs(v - high);
    if (dist > 0){
      return (valuedistlow/dist) * 100
    }
  }
 
  return 0;
};
  
  


