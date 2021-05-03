"use strict";
console.log('Loaded: Listener.js');
import Utils from '../components/utils.js'

import message from '../templates/message.js'

export default class Listener {

  static async listenMessage() {
    console.log(`${Utils.fullTime(new Date())} [WORKING] Listening for messages.`);

    const controller = new AbortController();
    const signal = controller.signal;
    let abort = setTimeout(() => {
      controller.abort();
      this.listenMessage();
    }, 20000);

    let reqData = {
      room: sessionStorage.getItem('client_room'),
      token: sessionStorage.getItem('client_token'),
    };

    let res = await fetch('/listen/listenMessages', {
      body: JSON.stringify(reqData),
      method: 'post',
      signal
    });

    clearInterval(abort);
    if (res.ok) {
      this.listenMessage();
      console.log(`${Utils.fullTime(new Date())} [SUCCESS] Recived message.`);

      let resData = await res.json();
      if (!sessionStorage.getItem('last_message'))
        sessionStorage.setItem('last_message', resData.orderNumber);
      else if (parseInt(sessionStorage.getItem('last_message')) + 1 != resData.orderNumber)
        Listener.recoverMessages(sessionStorage.getItem('last_message'), resData.orderNumber);
      sessionStorage.setItem('last_message', resData.orderNumber);

      message.mount(resData.type, resData);
    } else {
      console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to recive message.`);
      document.getElementById('js-root__info').innerText = 'Brak połączenia';
    };
  }

  static async recoverMessages(lastRecivedMessageNumber, newRecivedMessageNumber) {
    console.log('Starting recovery of a message.');
    console.log(`Recovery: from ${lastRecivedMessageNumber} to ${newRecivedMessageNumber}`);
  }

}