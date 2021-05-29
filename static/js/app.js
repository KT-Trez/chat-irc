"use strict";
import Message from './classes/Message.js';
import Listener from './classes/Listener.js';

window.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded: app.js');

  // $('#js-chat').tinyscrollbar();
  document.getElementById('js-message-input').onkeydown = (event) => {
    if (event.key.toLowerCase() == 'enter' && event.target.value) {
      Listener.listenMessage();
      sessionStorage.setItem('client_nick', event.target.value);


      event.target.placeholder = 'Napisz wiadomość';
      event.target.value = '';

      event.target.onkeydown = (event) => {
        if (event.key.toLowerCase() == 'enter' && event.target.value) {
          new Message(event.target.value).send();
          event.target.value = '';
        };
      };
    };
  };


});