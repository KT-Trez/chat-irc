"use strict";
console.log('Loaded: Message.js');
import Utils from '../components/utils.js'

export default class Message {

  constructor(content) {
    this.content = content;
    this.data = null;
    this.room = sessionStorage.getItem('client_room');
    this.token = sessionStorage.getItem('client_token');
    this.type = 'message';
  }

  async send() {
    console.log(`${Utils.fullTime(new Date())} [WORKING] Sending message.`);

    let reqData = {
      content: this.content,
      data: this.data,
      room: this.room,
      token: this.token,
      type: this.type
    };

    let res = await fetch('/chat/message', {
      body: JSON.stringify(reqData),
      method: 'post'
    });

    if (res.ok)
      console.log(`${Utils.fullTime(new Date())} [SUCCESS] Message sent.`);
    else {
      console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to send message.`);
      document.getElementById('js-root__info').innerText = 'Niepowodzenie przy wysyłaniu wiadomości';
    };
  }

}