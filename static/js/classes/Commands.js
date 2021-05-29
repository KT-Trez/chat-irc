"use strict";
console.log('Loaded: Commands.js');
import Message from '../classes/Message.js';

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

    document.getElementById('js-chat').innerHTML = '';
  }

  async color(help, args) {
    if (help)
      return 'Zmienia kolor użytkownika. (nazwa koloru wg. HTML5)';

    let color = args[0];

    let option = new Option().style;
    option.color = color;
    if (option.color != color)
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
      return 'Wyświetla wiadomość pomocy';

    let helpMessage = '<br>';

    for (var i = 0; i < Commands.commandList.length; i++) {
      helpMessage += '<b>' + Commands.commandList[i] + '</b>';
      helpMessage += '<br><i>' + await new Commands()[Commands.commandList[i]](true) + '</i><br>'
    };

    Message.render({
      client: 'Info',
      color: 'red',
      content: helpMessage,
      timestamp: new Date()
    });
  }

}