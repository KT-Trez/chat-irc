module.exports = class Room {
  static list = [];

  static getGeneral() {
    let generalIfExists = Room.list.find(room => room.id == 'general');

    if (generalIfExists)
      return generalIfExists;
    else {
      let general = new Room();
      general.id = 'general';
      Room.list.push(general);
      return general;
    };
  }

  constructor() {
    this.clients = [];
    this.expireTimeout = setTimeout(() => Room.list.splice(Room.list.indexOf(this), 1), 3600000);
    this.id = new Date().getTime() + (Math.random() * 1000).toFixed(0);
    this.messagesCount = 0;
    this.resList = [];
    this.resEventsList = [];
    this.timestamp = new Date();
  }

}