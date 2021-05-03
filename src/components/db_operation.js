const Datastore = require('nedb');

const Utils = require('./utils');

module.exports = class Database {
  static list = [];

  static loadDB(name) { // zapisuje używaną bazę danych do pamięci
    let db = new Datastore({ // ładuje bazę danych
      autoload: true,
      error: () => console.error(Utils.logLevelBg(4) + `${Utils.fullTimeAndDate(new Date())} [ERROR] Failed to save message in database.` + Utils.logLevelBg('end')),
      filename: './src/data/' + name + '.db'
    });

    this.list.push(db); // wrzuca bazę do danych do listy
    setTimeout(() => this.list.splice(this.list.indexOf(db), 1), 3600000); // usuwa bazę danych z listy po godzinie

    return db; // zwraca bazę danych
  }

  static pickDB(name) { // wybiera bazę danych z listy lub ładuje w przypadku jej braku
    let db = this.list.find(db => db.filename == './src/data/' + name + '.db');
    if (!db) db = this.loadDB(name);
    return db;
  }

  static write(message) { // zapisuje podaną wiadomość do bazy
    let db = this.pickDB(message.room.id);

    db.insert(message, err => {
      if (err) console.error(Utils.logLevelBg(4) + `${Utils.fullTimeAndDate(new Date())} [ERROR] Failed to save message in database.` + Utils.logLevelBg('end'));
    });
  }

}