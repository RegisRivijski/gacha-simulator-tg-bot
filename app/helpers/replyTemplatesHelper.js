import templates from '../routers/replySwitcher.js';

export default function replyByTemplate(templateParams) {
  const promises = [];
  for (const { condition, template, makeBreak } of templates) {
    const sendTemplate = Boolean(condition(templateParams));
    if (sendTemplate) {
      promises.push(
        template(templateParams),
      );

      if (makeBreak) {
        break;
      }
    }
  }
  return Promise.all(promises);
}
