module.exports = class Client {
  static list = [];

  static join(client, room) {
    room.clients.push({
      client: client,
      res: null
    });
  }

  static stripSensitiveInfo(client) {
    return {
      color: client.color,
      nick: client.nick,
      id: client.id,
      room: {
        id: client.room.id,
        timestamp: client.room.timestamp
      },
      status: client.status,
      token: client.token
    };
  }

  constructor(client, room) {
    this.color = null;
    this.nick = client.nick;
    this.id = new Date().getTime() + (Math.random() * 1000).toFixed(0);
    this.room = {
      id: room.id,
      timestamp: room.timestamp
    };
    this.status = 'online';
    this.token = new Date().getTime() + (Math.random() * 1000).toFixed(0);

    if (room) Client.join(this, room);
  }

  join(room) {
    room.clients.push({
      client: this,
      res: null
    });
  }

}