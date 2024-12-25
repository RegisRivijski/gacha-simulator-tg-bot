import agenda from '../modules/agenda.js';

import config from '../../config/index.js';

export default async function initCronQueue({
  bot,
  crons,
}) {
  for await (const { name, schedule, process } of crons) {
    const nameWithLang = `${name}-${config.languages.defaultLangCode}`;
    const processWithBot = process(bot);

    agenda.define(nameWithLang, processWithBot);
    await agenda.every(schedule, nameWithLang);
  }
}
