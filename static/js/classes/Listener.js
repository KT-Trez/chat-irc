"use strict";

import Utils from '../components/utils.js';
import Message from '../classes/Message.js';


console.log('Loaded: Listener.js');

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
                console.log(`${Utils.fullTime(new Date())} [SUCCESS] Message received.`);

                let resData = await res.json();
                Message.render(resData);
            }
        } catch (err) {
            if (err.name !== 'AbortError')
                console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to receive a message.`);
            console.log(err);
        }
    }
}