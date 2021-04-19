"use strict";

class Message {

  constructor(type, content) {
    this.type = type;
    this.user = {
      color: sessionStorage.getItem('user_color'),
      id: sessionStorage.getItem('user_id'),
      nick: sessionStorage.getItem('user_nick')
    };
    this.content = content;
  }

  static async clientJoin() {
    console.log('[INFO] Creating join info.');
    let joinNotification = await new Message('join', null).send();

    if (joinNotification) {
      console.log('[SUCCESS] Join info sent.');
      return true;
    } else {
      console.log('[ERROR] Error while sending join info.');
      return false;
    }
  }

  async send() {
    console.log('[INFO] Sending message.');

    let res = await fetch('/chat/connection', {
      method: 'post',
      body: JSON.stringify(this)
    })

    if (res.ok) {
      console.log('[SUCCESS] Message sent.');
      return true;
    } else {
      console.log('[ERROR] Error while sending message.');
      return false;
    }
  }

}


window.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded: app.js');
});