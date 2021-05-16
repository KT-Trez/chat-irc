"use strict";
console.log('Loaded: Listener.js');
import Utils from '../components/utils.js'

import client from '../templates/client.js'
import message from '../templates/message.js'

export default class Listener {
  static data = {
    eventSource: null
  };

  static listenClients() {
    Listener.data.eventSource = new EventSource('/listen/listenClients?' + `room=${sessionStorage.getItem('client_room')}&token=${sessionStorage.getItem('client_token')}`);

    Listener.data.eventSource.onerror = (error) => console.log(error);

    Listener.data.eventSource.onmessage = (event) => {
      let resData = JSON.parse(event.data);
      client.action(resData.type, resData.client);
    };
  }

  static async listenMessage() {
    if (!sessionStorage.getItem('client_room')) return;
    console.log(`${Utils.fullTime(new Date())} [WORKING] Listening for messages.`);

    const controller = new AbortController();
    const signal = controller.signal;
    let abort = setTimeout(() => {
      controller.abort();
      this.listenMessage();
    }, 20000);

    try {
      let reqData = {
        room: sessionStorage.getItem('client_room'),
        token: sessionStorage.getItem('client_token')
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

        message.action(resData.type, resData);
      };
    } catch (err) {
      if (err.name != 'AbortError') {
        console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to recive message.`);
        document.getElementById('js-root__info').innerText = 'Brak połączenia';
      };
    };
  }

  static async recoverMessages(lastRecivedMessageNumber, newRecivedMessageNumber) {
    console.log('Starting recovery of a message.');
    console.log(`Recovery: from ${lastRecivedMessageNumber} to ${newRecivedMessageNumber}`);
  }

}