module.exports = class Message {

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

}