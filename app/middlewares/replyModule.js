import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import * as telegrafReplyHelper from '../helpers/telegrafReplyHelper.js';

export default async function replyModule(ctx, next) {
  const {
    messageTemplate,
    media,
    gifBeforeMessage,
  } = ctx.state.data;

  if (gifBeforeMessage?.media && media?.mediaType === MEDIA_TYPE_PHOTO) {
    telegrafReplyHelper.gifBeforeMessage({
      ctx,
      messageTemplate,
      media,
      gifBeforeMessage,
    });
  } else if (media?.mediaType === MEDIA_TYPE_STICKER) {
    telegrafReplyHelper.messageAfterSticker({
      ctx,
      messageTemplate,
      media,
    });
  } else if (messageTemplate) {
    ctx.reply(messageTemplate, {
      parse_mode: 'HTML',
    });
  } else {
    ctx.replyWithChatAction('typing');
  }

  await next();
}
