import Agenda from 'agenda';

import config from '../../config/index.js';

const agenda = new Agenda({
  db: {
    address: config.db.mongodbAgenda.url,
    collection: config.db.mongodbAgenda.options.dbName,
  },
});

export default agenda;
