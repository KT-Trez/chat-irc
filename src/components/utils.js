module.exports = class Utils { // klasa pomocnicza
    static fullTime(time) { // funkcja zwracająca czas w pełnym formacie
        function oneToDwoDigit(number) {
            if (number.toString().length === 1)
                return '0' + number;
            else
                return number.toString();
        }

        return oneToDwoDigit(time.getHours()) + ':' + oneToDwoDigit(time.getMinutes()) + ':' + oneToDwoDigit(time.getSeconds());
    }

    static fullTimeAndDate(time) { // funkcja zwracająca czas i datę w pełnym formacie
        function oneToDwoDigit(number) {
            if (number.toString().length === 1)
                return '0' + number;
            else
                return number.toString();
        }

        return oneToDwoDigit(time.getHours()) + ':' + oneToDwoDigit(time.getMinutes()) + ':' + oneToDwoDigit(time.getSeconds()) + ' ' + oneToDwoDigit(time.getDate()) + '.' + oneToDwoDigit(time.getMonth()) + '.' + time.getFullYear();
    }

    static getRandomInt(min, max) { // funkcja zwracająca liczbę z przedziału <min, max>
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static logLevelBg(level) { // funkcja wspomagająca logowanie informacji
        switch (level) {
            case 0: // [INFO]
                return '\u001b[36m';
            case 1: // [WORKING]
                return '\u001b[33m';
            case 2: // [SUCCESS]
                return '\u001b[32m';
            case 3: // [WARNING]
                return '\u001b[35m';
            case 4: // [ERROR]
                return '\u001b[31m';
            case 'end': // end of log
                return '\u001b[0m';
            default:
                return null;
        }
    }

    static isJSONValid(string, optional) {
        try {
            JSON.parse(string);
        } catch (error) {
            console.log(this.logLevelBg(3) + `${this.fullTimeAndDate(new Date())} [WARNING] Invalid JSON body (${optional}).` + this.logLevelBg('end'));
            return false;
        }
        return true;
    }
};