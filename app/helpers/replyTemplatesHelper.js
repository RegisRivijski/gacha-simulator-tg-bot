import errorHandler from './errorHandler.js';
import templates from './templates.js';

export default function replyByTemplate({
  ctx,
  messageTemplate,
  media,
  gifBeforeMessage,
}) {
  for (const { condition, template, makeBreak } of templates) {
    const sendTemplate = condition({
      ctx,
      messageTemplate,
      media,
      gifBeforeMessage,
    });
    if (sendTemplate) {
      template({
        ctx,
        messageTemplate,
        media,
        gifBeforeMessage,
      })
        .catch(errorHandler);
      if (makeBreak) {
        break;
      }
    }
  }
}
