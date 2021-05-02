module.exports = class Client {
  static list = [];

  static join(client, room) {
    room.clients.push(client);
  }

  static stripSensitiveInfo(client) {
    return {
      color: client.color,
      nick: client.nick,
      id: client.id,
      lastOnline: client.lastOnline,
      room: {
        id: client.room.id,
        timestamp: client.room.timestamp
      },
      token: client.token
    };
  }

  constructor(client, room) {
    this.color = null;
    this.nick = client.nick;
    this.id = new Date().getTime() + (Math.random() * 1000).toFixed(0);
    this.lastOnline = new Date();
    this.room = {
      id: room.id,
      timestamp: room.timestamp
    };
    this.token = new Date().getTime() + (Math.random() * 1000).toFixed(0);

    if (room) Client.join(this, room);
  }

  join(room) {
    room.clients.push(this);
  }

}