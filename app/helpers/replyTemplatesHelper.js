import templates from '../routers/replySwitcher.js';

export default function replyByTemplate({
  ctx,
  messageTemplate,
  media,
  gifBeforeMessage,
}) {
  const promises = [];
  for (const { condition, template, makeBreak } of templates) {
    const sendTemplate = condition({
      ctx,
      messageTemplate,
      media,
      gifBeforeMessage,
    });
    if (sendTemplate) {
      promises.push(
        template({
          ctx,
          messageTemplate,
          media,
          gifBeforeMessage,
        }),
      );

      if (makeBreak) {
        break;
      }
    }
  }
  return Promise.all(promises);
}
