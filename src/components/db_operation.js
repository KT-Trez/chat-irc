const Datastore = require('nedb');

const Utils = require('./utils');

module.exports = class Database {

  static write(message) {
    let db = new Datastore({
      autoload: true,
      filename: './src/data/' + message.room.id + '.db'
    });

    db.insert(message, (err, newDoc) => {
      if (err) console.error(Utils.logLevelBg(4) + `${Utils.fullTimeAndDate(new Date())} [ERROR] Failed to save message in database.` + Utils.logLevelBg('end'));
    });
  }

}