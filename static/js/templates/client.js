"use strict";
console.log('Loaded template: client.js');

const template = { // eskportowany szablon klienta
  data: {
    async loadAll(clientList) {
      clientList.forEach(client => {
        let clientDOM = template.template
          .replace('{{clientId}}', client.id)
          .replace('{{clientStatus}}', 'js-' + client.status)
          .replace('{{clientNick}}', client.nick);

        let clientField = document.getElementById('root__controls__clients');
        clientField.innerHTML += clientDOM;
      });
      this.sortClients();
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
  mount(type, context) { // montowanie i uruchamianie szablonu
    switch (type) {
      case 'joined':
        let client = this.template
          .replace('{{clientId}}', context.id)
          .replace('{{clientStatus}}', 'js-' + context.status)
          .replace('{{clientNick}}', context.nick);

        let clientField = document.getElementById('root__controls__clients');
        clientField.innerHTML += client;
        this.data.sortClients();
        break;
      case 'left':
        let clientDOM = document.querySelector(`[dataset-client-id="${context.id}"]`);
        if (clientDOM) clientDOM.remove();
        break;
    };
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