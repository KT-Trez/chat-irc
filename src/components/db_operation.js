const Datastore = require('nedb');

const Utils = require('./utils');

module.exports = class Database {

  static write(message) {
    let db = new Datastore({
      autoload: true,
      error: () => console.error(Utils.logLevelBg(4) + `${Utils.fullTimeAndDate(new Date())} [ERROR] Failed to save message in database.` + Utils.logLevelBg('end')),
      filename: './src/data/' + message.room.id + '.db'
    });

    db.insert(message, err => {
      if (err) console.error(Utils.logLevelBg(4) + `${Utils.fullTimeAndDate(new Date())} [ERROR] Failed to save message in database.` + Utils.logLevelBg('end'));
    });
  }

}