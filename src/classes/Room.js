const Database = require('../components/db_operation');

module.exports = class Room {
  static list = [];

  static getGeneral() {
    let generalIfExists = Room.list.find(room => room.id == 'general');

    if (generalIfExists)
      return generalIfExists;
    else {
      let general = new Room('general');
      Room.list.push(general);
      return general;
    };
  }

  constructor(id) {
    this.clients = [];
    this.expireTimeout = setTimeout(() => Room.list.splice(Room.list.indexOf(this), 1), 3600000);
    this.id = id || new Date().getTime() + (Math.random() * 1000).toFixed(0);
    this.messagesCount = Database.countMessages(this);
    this.resList = [];
    this.timestamp = new Date();
  }

}