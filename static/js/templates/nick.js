console.log('Loaded template: nick.js');
import Client from '../classes/Client.js'
import Message from '../classes/Message.js'

const lobby = { // eskportowany pola wprowadź nick
  data: {
    async joinRoom() {
      let nickInput = document.getElementById('js-nick-container__nick__inputs--nick');

      if (!nickInput.value)
        return this.lightInput(nickInput);
      else {
        await Client.init(nickInput.value)
        this.startAll(nickInput.value);
      };
    },
    lightInput(input) {
      input.classList.add('js-require');
      setTimeout(() => input.classList.remove('js-require'), 500);
    },
    sendMessage() {
      let messageInput = document.getElementById('js-root__chat__input__message');
      if (messageInput.value) {
        new Message(messageInput.value).send()
        messageInput.value = '';
      };
    },
    startAll() {
      Array.from(document.querySelectorAll('[disabled]')).forEach(element => element.removeAttribute('disabled'));

      document.getElementById('js-root__controls__room__id--display-id').innerText = 'general';

      document.getElementById('js-root__chat__input__button--send')
        .addEventListener('click', () => this.sendMessage());
      document.getElementById('js-root__chat__input__message')
        .addEventListener('keydown', (event) => event.key.toLowerCase() == 'enter' ? this.sendMessage() : null);

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
  template: // szablon pola wprowadź nick
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

export default lobby;