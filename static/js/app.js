"use strict";
import Commands from './classes/Commands.js';
import Message from './classes/Message.js';
import Listener from './classes/Listener.js';

window.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded: app.js');

  // $('#js-chat').tinyscrollbar();
  document.getElementById('js-message-input').onkeydown = (event) => {
    if (event.key.toLowerCase() == 'enter' && event.target.value) {
      Listener.listenMessage();
      sessionStorage.setItem('client_nick', event.target.value);
      sessionStorage.setItem('client_color', '#' + Math.floor(Math.random() * 16777215).toString(16));
      Commands.mapCommands();

      event.target.placeholder = 'Napisz wiadomość';
      event.target.value = '';

      event.target.onkeydown = (event) => {
        if (event.key.toLowerCase() == 'enter' && event.target.value) {
          if (event.target.value.startsWith('/')) {
            let command = event.target.value.split(' ');
            let args = command.slice(1);
            let commandName = command[0].slice(1);

            if (Commands.commandList.includes(commandName))
              new Commands()[commandName](false, args);
            else
              Message.render({
                client: 'Info',
                color: 'red',
                content: 'Niepoprawna komenda',
                timestamp: new Date()
              });
          } else
            new Message(event.target.value).send();
          event.target.value = '';
        };
      };
    };
  };
});