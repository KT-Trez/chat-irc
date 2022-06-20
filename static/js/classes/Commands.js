"use strict";

import Message from '../classes/Message.js';


console.log('Loaded: Commands.js');

export default class Commands {
    static commandList = [];

    static mapCommands() {
        let methods = Object.getOwnPropertyNames(Commands.prototype);
        methods.forEach(method => Commands.commandList.push(method));

        Commands.commandList.splice(Commands.commandList.indexOf('constructor'), 1);
        console.log(Commands.commandList);
    }

    clear(help) {
        if (help)
            return 'Czyści historię czatu.';

        document.getElementsByClassName('simplebar-content')[0].innerHTML = '';
    }

    async color(help, args) {
        if (help)
            return 'Zmienia kolor użytkownika (format koloru: aliceblue, black itp.).';

        let color = args[0];

        let option = new Option().style;
        option.color = color;
        if (option.color !== color)
            return Message.render({
                client: 'Info',
                color: 'red',
                content: 'Niepoprawny kolor',
                timestamp: new Date()
            });

        sessionStorage.setItem('client_color', color);
    }

    async help(help) {
        if (help)
            return 'Wyświetla wiadomość pomocy.';

        let helpMessage = '\n';

        for (let i = 0; i < Commands.commandList.length; i++) {
            helpMessage += '\n' + Commands.commandList[i] + '\n';
            helpMessage += '\n   ' + await new Commands()[Commands.commandList[i]](true) + '\n';
        }

        Message.render({
            client: 'Info',
            color: 'red',
            content: helpMessage,
            timestamp: new Date()
        });
    }
}