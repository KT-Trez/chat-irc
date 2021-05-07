module.exports = class Message {

  static queue = [];

  static executeQueue(queueRoom) {
    let data = queueRoom.messages[0];

    if (data) {
      data.room.messagesCount++;
      data.room.resList.forEach(res => res.send(data.message));
      data.room.resList = [];

      queueRoom.messages.splice(queueRoom.messages.indexOf(data), 1);
      Message.executeQueue(queueRoom);
    } else
      Message.queue.splice(Message.queue.indexOf(queueRoom, 1));
  }

  constructor(client, message, room) {
    this.client = {
      color: client.color,
      id: client.id,
      nick: client.nick
    };
    this.content = message.content || null;
    this.data = message.data;
    this.id = new Date().getTime() + (Math.random() * 1000).toFixed(0);
    this.orderNumber = room.messagesCount;
    this.room = {
      id: room.id,
      timestamp: room.timestamp
    };
    this.timestamp = new Date();
    this.type = message.type;
  }

  emojify() {
    const emojiList = [{
      string: ':)',
      emoji: '🙂'
    }, {
      string: ':(',
      emoji: '🙁'
    }, {
      string: ':p',
      emoji: '😋'
    }, {
      string: ':|',
      emoji: '😐'
    }, {
      string: '0(',
      emoji: '😭'
    }, {
      string: '<3',
      emoji: '❤️'
    }];
    emojiList.forEach(emoji => this.content = this.content.replace(emoji.string, emoji.emoji));
    return this;
  }

  send(room) {
    let queueRoom = Message.queue.find(queueRoom => queueRoom.id == room.id);

    if (!queueRoom) {
      queueRoom = {
        id: room.id,
        messages: []
      };

      Message.queue.push(queueRoom);
    };

    queueRoom.messages.push({
      message: this,
      room
    });
    Message.executeQueue(queueRoom);

    return this;
  }

}