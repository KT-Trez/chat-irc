"use strict";
console.log('Loaded: Client.js');
import Utils from '../components/utils.js'

export default class Client {

  static async init(nick) {
    console.log(`${Utils.fullTime(new Date())} [WORKING] Trying to register as '${nick}'.`);

    sessionStorage.clear();
    let reqData = {
      nick
    };

    let res = await fetch('/join/register', {
      body: JSON.stringify(reqData),
      method: 'post'
    });

    if (res.ok) {
      let resData = await res.json();

      sessionStorage.setItem('client_color', resData.color);
      sessionStorage.setItem('client_nick', resData.nick);
      sessionStorage.setItem('client_room', resData.room.id);
      sessionStorage.setItem('client_token', resData.token);

      console.log(`${Utils.fullTime(new Date())} [SUCCESS] Registered as '${nick}'.`);
      document.getElementById('js-root__info').innerHTML = 'Dołączono do kanału <span class="js-channel">general</span>';
    } else {
      console.log(`${Utils.fullTime(new Date())} [ERROR] Failed to register as '${nick}'.`);
      document.getElementById('js-root__info').innerText = 'Niepowodzenie przy próbie połączenia. Spróbuj ponownie później';
    };
  }

}