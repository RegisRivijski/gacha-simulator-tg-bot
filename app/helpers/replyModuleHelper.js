import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import errorHandler from './errorHandler.js';
import * as telegrafReplyHelper from './telegrafReplyHelper.js';

import { isAction } from './telegraf.js';

export default function replyModule({
  ctx,
  messageTemplate,
  media,
  gifBeforeMessage,
}) {
  ctx.replyWithChatAction('typing')
    .catch(errorHandler);

  const templates = [
    {
      condition: isAction(ctx) && media?.mediaMarkupButtonsRemoveAfterClick,
      template: ctx.editMessageReplyMarkup,
    },
    {
      condition: gifBeforeMessage?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
      template: telegrafReplyHelper.replyGifBeforeMessage,
    },
    {
      condition: media?.mediaType === MEDIA_TYPE_PHOTO,
      template: telegrafReplyHelper.messageWithCaption,
    },
    {
      condition: media?.mediaType === MEDIA_TYPE_STICKER,
      template: telegrafReplyHelper.messageAfterSticker,
    },
    {
      condition: messageTemplate,
      template: telegrafReplyHelper.message,
    },
  ];

  for (const { condition, template } of templates) {
    if (condition) {
      template({
        ctx,
        messageTemplate,
        media,
        gifBeforeMessage,
      })
        .catch(errorHandler);
      break;
    }
  }
}
