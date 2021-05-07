module.exports = class Message {

  static queue = [];

  static executeQueue(roomInQueue) {
    let messageData = roomInQueue.messages[0];

    messageData.room.messagesCount++;
    while (messageData.room.resList.length != 0) {
      messageData.room.resList.forEach(res => res.send(messageData.message));
      messageData.room.resList = [];
      roomInQueue.messages.splice(roomInQueue.messages.indexOf(messageData), 1);
    };

    Message.queue.splice(Message.queue.indexOf(roomInQueue, 1));
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
    let roomInQueue = Message.queue.find(roomInQueue => roomInQueue.id == room.id);

    if (!roomInQueue) {
      let newRoomInQueue = {
        id: room.id,
        messages: []
      };

      newRoomInQueue.messages.push({
        message: this,
        room
      });
      Message.queue.push(newRoomInQueue);

      Message.executeQueue(newRoomInQueue);
      return this;
    } else {
      roomInQueue.messages.push({
        message: this,
        room
      });
      return this;
    };
  }

}