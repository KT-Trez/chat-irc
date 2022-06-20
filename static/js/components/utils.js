"use strict";
console.log('Loaded: utils.js');

export default class Utils { // klasa pomocnicza
    static fullTime(time) { // funkcja zwracająca czas w pełnym formacie
        function oneToDwoDigit(number) {
            if (number.toString().length === 1)
                return '0' + number;
            else
                return number.toString();
        }

        return oneToDwoDigit(time.getHours()) + ':' + oneToDwoDigit(time.getMinutes()) + ':' + oneToDwoDigit(time.getSeconds());
    }

    static timeShort(time) { // funkcja zwracająca czas w formacie hh:ss
        function oneToDwoDigit(number) {
            if (number.toString().length === 1)
                return '0' + number;
            else
                return number.toString();
        }

        return oneToDwoDigit(time.getHours()) + ':' + oneToDwoDigit(time.getMinutes());
    }
}