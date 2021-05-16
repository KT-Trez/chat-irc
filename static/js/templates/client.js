"use strict";
console.log('Loaded template: client.js');
import Client from '../classes/Client.js'

import Utils from '../components/utils.js'

const template = { // eskportowany szablon klienta
  data: {
    status: {
      interval: null,
      timeout: null
    },
    async loadAll(clientList) {
      clientList.forEach(client => {
        let clientDOM = template.template
          .replace('{{clientId}}', client.id)
          .replace('{{clientStatus}}', 'js-' + client.status)
          .replace('{{clientNick}}', client.nick);

        let clientField = document.getElementById('root__controls__clients');
        if (client.id != sessionStorage.getItem('client_id')) clientField.innerHTML += clientDOM;
      });
      this.sortClients();
    },
    async reconnect() {
      console.log(`${Utils.fullTime(new Date())} [WORKING] Attempting to reconnect.`);

      let reqData = {
        room: sessionStorage.getItem('client_room'),
        token: sessionStorage.getItem('client_token')
      };

      let res = await fetch('/listen/reconnect', {
        body: JSON.stringify(reqData),
        method: 'post'
      });

      if (res.ok)
        console.log(`${Utils.fullTime(new Date())} [SUCCESS] Reconnected.`);
      else {
        console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to reconnect as '${nick}'.`);
        document.getElementById('js-root__info').innerText = 'Utracono połączenie z serwerem';
      };
    },
    setAFK() {
      if (sessionStorage.getItem('client_status') != 'afk') {
        sessionStorage.setItem('client_status', 'afk');
        Client.setStatus('afk');
        document.getElementById('js-root__controls__nick--status').classList.add('js-afk');
      };
    },
    setOnline() {
      if (sessionStorage.getItem('client_status') != 'online') {
        clearTimeout(this.status.timeout);
        this.status.timeout = null;

        sessionStorage.setItem('client_status', 'online');
        Client.setStatus('online');
        document.getElementById('js-root__controls__nick--status').classList.remove('js-afk');
      };
    },
    sortClients() {
      let clientField = document.getElementById('root__controls__clients');
      let clientFieldChildren = clientField.children;
      let clientFieldChildrenArray = [].slice.call(clientFieldChildren).sort((a, b) => {
        return a.children[1].innerText > b.children[1].innerText ? 1 : -1;
      });
      clientFieldChildrenArray.forEach(client => clientField.appendChild(client));
    }
  },
  action(type, context) { // powtarzalne wywoływanie szablonu
    console.log(type, context);
    switch (type) {
      case 'disconnected':
        if (context.id == sessionStorage.getItem('client_id'))
          this.data.reconnect();
        break;
      case 'joined':
        let clientJoined = this.template
          .replace('{{clientId}}', context.id)
          .replace('{{clientStatus}}', 'js-' + context.status)
          .replace('{{clientNick}}', context.nick);

        let clientField = document.getElementById('root__controls__clients');
        clientField.innerHTML += clientJoined;
        this.data.sortClients();
        break;
      case 'left':
        let clientLeft = document.querySelector(`[dataset-client-id="${context.id}"]`);
        if (clientLeft) clientLeft.remove();
        break;
      case 'status':
        let clientStatus = document.querySelector(`[dataset-client-id="${context.id}"]`);
        if (clientStatus) {
          clientStatus.children[0].classList.remove('js-online', 'js-afk', 'js-dnd')
          clientStatus.children[0].classList.add('js-' + context.status);
        };
        break;
    };
  },
  mount() { // jednorazowe wywoływanie szablonu
    this.data.status.interval = setInterval(() => {
      if (!document.hasFocus() && !this.data.status.timeout)
        this.data.status.timeout = setTimeout(() => this.data.setAFK(), 300000);
      else if (document.hasFocus()) {
        this.data.setOnline();
      };
    }, 5000);
  },
  template: // szablon klienta
    `
    <div class="client" dataset-client-id="{{clientId}}">
      <div class="client__status {{clientStatus}}"></div>
      <span class="client__nick">{{clientNick}}</span>
    </div>
    `
}

export default template;