module.exports = class Message {

  constructor(client, message, room) {
    this.client = {
      color: client ? client.color : null,
      id: client ? client.id : null,
      nick: client ? client.nick : null
    };
    this.content = message.content || null;
    this.data = room ? (client ? null : "Client doesn't exist") : "Room doesn't exist";
    this.id = new Date().getTime() + (Math.random() * 1000).toFixed(0);
    this.orderNumber = room ? room.messagesCount : null;
    this.timestamp = new Date();
    this.room = {
      id: room ? room.id : null,
      timestamp: room ? room.timestamp : null
    };
  }

}