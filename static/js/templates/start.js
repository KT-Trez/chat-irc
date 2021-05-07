"use strict";
console.log('Loaded template: start.js');
import Client from '../classes/Client.js'
import Command from '../classes/Commands.js'
import Listener from '../classes/Listener.js'
import Message from '../classes/Message.js'

import client from '../templates/client.js'
import message from '../templates/message.js'

const template = { // eskportowany szablon startowy
  data: {
    async joinRoom() {
      let nickInput = document.getElementById('js-nick-container__nick__inputs--nick');

      if (!nickInput.value)
        return this.lightInput(nickInput);
      else {
        await Client.init(nickInput.value);
        this.startAll();
        await client.data.loadAll(await Client.getAll());
      };
    },
    lightInput(input) {
      input.classList.add('js-require');
      setTimeout(() => input.classList.remove('js-require'), 1000);
    },
    sendMessage() {
      let messageInput = document.getElementById('js-root__chat__input__message');

      if (messageInput.value.startsWith('/')) {
        let command = messageInput.value.split(' ');
        let args = command.slice(1);
        let commandName = command[0].slice(1);

        if (Command.commandList.includes(commandName)) {
          new Command()[commandName](false, args);
          messageInput.value = '';
        } else
          message.mount('info', {
            color: 'red',
            content: 'Nie ma takiej komendy'
          });
      } else if (messageInput.value) {
        new Message(messageInput.value).send()
        messageInput.value = '';
      } else
        this.lightInput(messageInput)
    },
    startAll() {
      Array.from(document.querySelectorAll('[disabled]')).forEach(element => element.removeAttribute('disabled'));

      document.getElementById('js-root__controls__room__id--display-id').innerText = 'general';
      document.getElementById('js-root__controls__nick').classList.remove('js-hide');
      document.getElementById('js-root__controls__nick--nick').innerText = sessionStorage.getItem('client_nick');
      document.getElementById('js-root__chat__messages').innerText = '';

      document.getElementById('js-root__chat__input__button--send')
        .addEventListener('click', () => this.sendMessage());
      document.getElementById('js-root__chat__input__message')
        .addEventListener('keydown', (event) => event.key.toLowerCase() == 'enter' ? this.sendMessage() : null);

      Command.mapCommands();
      Listener.listenClients();
      Listener.listenMessage();
    }
  },
  async action() { // uruchomiony szablon
    document.getElementById('js-nick-container__nick__inputs--join')
      .addEventListener('click', () => this.data.joinRoom());
  },
  mount() { // montowanie i uruchamianie szablonu
    document.getElementById('js-root__chat__messages').innerHTML = this.template;
    this.action();
  },
  template: // szablon startowy
    `
    <div class="nick-container">
      <div class="nick-container__nick">
        <p class="nick-container__nick__description">Wprowadź nick</p>
        <div class="nick-container__nick__inputs">
          <input id="js-nick-container__nick__inputs--nick" placeholder="Nick np. Jan Kowalski" type="text">
          <button id="js-nick-container__nick__inputs--join">Dołącz</button>
        </div>
      </div>
    </div>
    `
}

export default template;