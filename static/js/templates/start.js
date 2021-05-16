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
        client.mount();
      };
    },
    leaveRoom() {
      document.getElementById('js-root__chat__input__button--emoji').setAttribute('disabled', true);
      document.getElementById('js-root__chat__input__message').disabled = true;
      document.getElementById('js-root__controls__buttons__button--leave').disabled = true;
      document.getElementById('js-root__chat__input__button--send').setAttribute('disabled', true);

      document.getElementById('js-root__info').innerText = 'Opuszczono kanał';
      document.getElementById('js-root__controls__room__id--display-id').innerText = '- - -';
      document.getElementById('root__controls__clients').innerHTML = '';
      document.getElementById('js-root__chat__messages').innerText = '';
      document.getElementById('js-root__chat__messages').innerText = '';

      document.getElementById('js-root__controls__buttons__button--leave').onclick = null;

      document.getElementById('js-root__chat__input__button--send').onclick = null;
      document.getElementById('js-root__chat__input__message').onclick = null;

      sessionStorage.removeItem('client_room');
      sessionStorage.removeItem('last_message');

      Listener.data.eventSource.close();
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
          message.action('info', {
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

      document.getElementById('js-root__controls__buttons__button--leave').onclick = () => this.leaveRoom();

      let emojiBarVisable = false;
      document.getElementById('js-root__chat__input__button--emoji').onclick = () => {
        if (!emojiBarVisable) {
          document.getElementById('js-emoji-bar').classList.remove('js-hide');
          emojiBarVisable = true;
        } else {
          document.getElementById('js-emoji-bar').classList.add('js-hide');
          emojiBarVisable = false;
        };
      };
      Array.from(document.getElementById('js-emoji-bar').children).forEach(emoji => emoji.onclick = () => document.getElementById('js-root__chat__input__message').value += emoji.dataset.emoji);

      document.getElementById('js-root__chat__input__button--send').onclick = () => this.sendMessage();
      document.getElementById('js-root__chat__input__message').onkeydown = (event) => event.key.toLowerCase() == 'enter' ? this.sendMessage() : null;

      Command.mapCommands();
      Listener.listenClients();
      Listener.listenMessage();
    }
  },
  async action() { // powtarzalne wywoływanie szablonu
    // TODO: Uruchamianie po zmianie pokoju
  },
  mount() { // jednorazowe wywoływanie szablonu
    document.getElementById('js-root__chat__messages').innerHTML = this.template;
    this.action();
    document.getElementById('js-nick-container__nick__inputs--join')
      .addEventListener('click', () => this.data.joinRoom());
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