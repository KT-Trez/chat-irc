"use strict";
console.log('Loaded: utils.js');

export default class Utils { // klasa pomocnicza

  static fullTime(time) { // funckja zwracająca czas w pełnym formacie
    function oneToDwoDigit(number) {
      if (number.toString().length == 1)
        return '0' + number;
      else
        return number.toString();
    };
    return oneToDwoDigit(time.getHours()) + ':' + oneToDwoDigit(time.getMinutes()) + ':' + oneToDwoDigit(time.getSeconds());
  }


  static getRandomInt(min, max) { // funckja zwracająca liczbę z przedziału <min, max>
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static timeShort(time) { // funckja zwracająca czas w formacie hh:ss
    function oneToDwoDigit(number) {
      if (number.toString().length == 1)
        return '0' + number;
      else
        return number.toString();
    };
    return oneToDwoDigit(time.getHours()) + ':' + oneToDwoDigit(time.getMinutes());
  }

}