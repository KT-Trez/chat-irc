"use strict";
console.log('Loaded: Listener.js');
import Utils from '../components/utils.js'

import Message from '../classes/Message.js'

export default class Listener {

  static async listenMessage() {
    console.log(`${Utils.fullTime(new Date())} [WORKING] Listening for messages.`);

    const controller = new AbortController();
    const signal = controller.signal;
    let abort = setTimeout(() => {
      controller.abort();
      this.listenMessage();
    }, 20000);

    try {
      let res = await fetch('/listen', {
        method: 'get',
        signal
      });

      clearInterval(abort);
      if (res.ok) {
        this.listenMessage();
        console.log(`${Utils.fullTime(new Date())} [SUCCESS] Recived message.`);

        let resData = await res.json();
        Message.render(resData);
      };
    } catch (err) {
      if (err.name != 'AbortError')
        console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to recive message.`);
      console.log(err);
    };
  }

}