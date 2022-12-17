import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import * as telegrafReplyHelper from '../helpers/telegrafReplyHelper.js';
import errorHandler from '../helpers/errorHandler.js';

export default async function replyModule(ctx, next) {
  const {
    messageTemplate,
    media,
    gifBeforeMessage,
  } = ctx.state.data;

  switch (true) {
    case Boolean(gifBeforeMessage?.media && media?.mediaType === MEDIA_TYPE_PHOTO):
      telegrafReplyHelper.replyGifBeforeMessage({
        ctx,
        messageTemplate,
        media,
        gifBeforeMessage,
      })
        .catch(errorHandler);
      break;
    case Boolean(media?.mediaType === MEDIA_TYPE_STICKER):
      telegrafReplyHelper.messageAfterSticker({
        ctx,
        messageTemplate,
        media,
      })
        .catch(errorHandler);
      break;
    case Boolean(messageTemplate):
      ctx.reply(messageTemplate, {
        parse_mode: 'HTML',
      }, telegrafReplyHelper.makeMarkupTelegrafButtons(media?.mediaMarkupButtons))
        .catch(errorHandler);
      break;
    default:
      ctx.replyWithChatAction('typing')
        .catch(errorHandler);
  }

  await next();
}
