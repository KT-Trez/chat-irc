"use strict";
console.log('Loaded template: message.js');
import Utils from '../components/utils.js'

const template = { // eskportowany szablon wiadomości czatu
  data: {

  },
  async action() { // uruchomiony szablon

  },
  mount(type, context) { // montowanie i uruchamianie szablonu
    if (type == 'message') {
      let message = this.template
        .replace('{{messageId}}', context.id)
        .replace('{{messageTimestamp}}', Utils.timeShort(new Date(context.timestamp)))
        .replace('{{messageAuthor}}', context.client.nick)
        .replace('{{messageContent}}', context.content);

      let messageField = document.getElementById('js-root__chat__messages');
      messageField.innerHTML += message;
      messageField.scrollTop = messageField.scrollHeight;
    } else if (type == 'join') {
      let message = this.template
        .replace('{{messageId}}', context.id)
        .replace('{{messageTimestamp}}', Utils.timeShort(new Date(context.timestamp)))
        .replace('{{messageAuthor}}', '')
        .replace('{{messageContent}}', `<span style="color: #43b582;">${context.content}</span>`)
        .replace('{{userNick}}', `<span style="font-family: 'Dosis--bold';">${context.data}</span>`);

      let messageField = document.getElementById('js-root__chat__messages');
      messageField.innerHTML += message;
      messageField.scrollTop = messageField.scrollHeight;
    };
  },
  template: // szablon wiadomości czatu
    `
    <div class="message" dataset-id="{{messageId}}">
      <span class="message__timestamp">
        {{messageTimestamp}}
      </span>
      <span class="message__author">
        {{messageAuthor}}
      </span>
      <span class="message__content">
        {{messageContent}}
      </span>
    </div>
    `
}

export default template;