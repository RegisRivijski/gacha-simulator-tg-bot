import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import * as telegrafReplyHelper from './telegrafReplyHelper.js';
import errorHandler from './errorHandler.js';

export default function replyModule({
  ctx,
  messageTemplate,
  media,
  gifBeforeMessage,
}) {
  if (gifBeforeMessage?.media && media?.mediaType === MEDIA_TYPE_PHOTO) {
    telegrafReplyHelper.replyGifBeforeMessage({
      ctx,
      messageTemplate,
      media,
      gifBeforeMessage,
    })
      .catch(errorHandler);
  } else if (media?.mediaType === MEDIA_TYPE_PHOTO) {
    telegrafReplyHelper.messageWithCaption({
      ctx,
      messageTemplate,
      media,
    })
      .catch(errorHandler);
  } else if (media?.mediaType === MEDIA_TYPE_STICKER) {
    telegrafReplyHelper.messageAfterSticker({
      ctx,
      messageTemplate,
      media,
    })
      .catch(errorHandler);
  } else if (messageTemplate) {
    telegrafReplyHelper.message({
      ctx,
      messageTemplate,
      media,
    })
      .catch(errorHandler);
  } else {
    ctx.replyWithChatAction('typing')
      .catch(errorHandler);
  }
}
