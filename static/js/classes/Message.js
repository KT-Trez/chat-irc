"use strict";

import Utils from '../components/utils.js';


console.log('Loaded: Message.js');

export default class Message {
    static render(data) {
        let messageBox = $('<pre>')
            .addClass('message');

        $('<span>')
            .addClass('message__timestamp')
            .text(Utils.timeShort(new Date(data.timestamp)))
            .appendTo(messageBox);

        $('<span>')
            .addClass('message__author')
            .css('color', data.color ? data.color : null)
            .text(data.client)
            .appendTo(messageBox);

        $('<span>')
            .addClass('message__content')
            .text(data.content)
            .emoticonize()
            .appendTo(messageBox);

        $('.simplebar-content').prepend(messageBox);
    }

    constructor(content) {
        this.client = sessionStorage.getItem('client_nick');
        this.color = sessionStorage.getItem('client_color');
        this.content = content;
        this.timestamp = new Date();
    }

    async send() {
        console.log(`${Utils.fullTime(new Date())} [WORKING] Sending message.`);

        let res = await fetch('/postMessage', {
            body: JSON.stringify(this),
            method: 'post'
        });

        if (res.ok)
            console.log(`${Utils.fullTime(new Date())} [SUCCESS] Message sent.`);
        else
            console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to send message.`);
    }
}