"use strict";
console.log('Loaded: Commands.js');
import Utils from '../components/utils.js'

import message from '../templates/message.js'

export default class Commands {

  static commandList = [];

  static mapCommands() {
    let methods = Object.getOwnPropertyNames(Commands.prototype);
    methods.forEach(method => Commands.commandList.push(method));

    Commands.commandList.splice(Commands.commandList.indexOf('constructor'), 1);
  }

  clear(help) {
    if (help)
      return 'Czyści historię czatu';

    document.getElementById('js-root__chat__messages').innerHTML = '';
  }

  async color(help, args) {
    if (help)
      return 'Zmienia kolor użytkownika. (nazwa koloru wg. HTML5)';

    let color = args[0];

    let option = new Option().style;
    option.color = color;
    if (option.color != color)
      return message.action('info', {
        color: 'red',
        content: 'Niepoprawny kolor'
      });

    console.log(`${Utils.fullTime(new Date())} [WORKING] Changing client color.`);

    let reqData = {
      color: color,
      room: sessionStorage.getItem('client_room'),
      token: sessionStorage.getItem('client_token'),
    };

    let res = await fetch('/chat/color', {
      body: JSON.stringify(reqData),
      method: 'post',
    });

    if (res.ok) {
      console.log(`${Utils.fullTime(new Date())} [SUCCESS] Changed client color.`);
      message.action('info', {
        color: '#43b582',
        content: 'Zmieniono kolor'
      });
    } else {
      console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to change client color.`);
      document.getElementById('js-root__info').innerText = 'Niepowodzenie zmiany koloru';
    };
  }

  async help(help) {
    if (help)
      return 'Wyświetla wiadomość pomocy';

    let helpMessage = '<br>';

    for (var i = 0; i < Commands.commandList.length; i++) {
      helpMessage += '<b>' + Commands.commandList[i] + '</b>';
      helpMessage += '<br><i>' + await new Commands()[Commands.commandList[i]](true) + '</i><br>'
    };

    message.action('info', {
      color: null,
      content: helpMessage
    });
  }

}