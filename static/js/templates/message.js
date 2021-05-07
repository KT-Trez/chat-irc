"use strict";
console.log('Loaded template: message.js');
import Utils from '../components/utils.js'

const template = { // eskportowany szablon wiadomości czatu
  data: {

  },
  async action() { // uruchomiony szablon

  },
  mount(type, context) { // montowanie i uruchamianie szablonu
    let message = null;
    switch (type) {
      case 'info':
        message = this.template
          .replace('{{messageData}}', context.color ? `style="color: ${context.color};` : '')
          .replace('{{messageId}}', 'systeminfo')
          .replace('{{messageTimestamp}}', Utils.timeShort(new Date()))
          .replace('{{authorData}}', '')
          .replace('{{messageAuthor}}', 'System')
          .replace('{{messageContent}}', context.content);
        break;
      case 'join':
        message = this.template
          .replace('{{messageData}}', '')
          .replace('{{messageId}}', context.id)
          .replace('{{messageTimestamp}}', Utils.timeShort(new Date(context.timestamp)))
          .replace('{{authorData}}', '')
          .replace('{{messageAuthor}}', '')
          .replace('{{messageContent}}', `<span style="color: #43b582;">${context.content}</span>`)
          .replace('{{userNick}}', `<span style="font-family: 'Dosis--bold';">${context.data}</span>`);
        break
      case 'message':
        message = this.template
          .replace('{{messageData}}', '')
          .replace('{{messageId}}', context.id)
          .replace('{{messageTimestamp}}', Utils.timeShort(new Date(context.timestamp)))
          .replace('{{authorData}}', context.client.color ? `style="color: ${context.client.color};"` : '')
          .replace('{{messageAuthor}}', context.client.nick)
          .replace('{{messageContent}}', context.content);
        break;
    };

    let messageField = document.getElementById('js-root__chat__messages');
    messageField.innerHTML += message;
    messageField.scrollTop = messageField.scrollHeight;
  },
  template: // szablon wiadomości czatu
    `
    <div class="message" dataset-id="{{messageId}}" {{messageData}}>
      <span class="message__timestamp">
        {{messageTimestamp}}
      </span>
      <span class="message__author" {{authorData}}>
        {{messageAuthor}}
      </span>
      <span class="message__content">
        {{messageContent}}
      </span>
    </div>
    `
}

export default template;