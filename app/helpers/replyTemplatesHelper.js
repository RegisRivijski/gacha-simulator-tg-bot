import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import errorHandler from './errorHandler.js';
import * as telegrafReplyHelper from './telegrafReplyHelper.js';

import { isAction } from './telegraf.js';

export default function replyByTemplate({
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
      makeBreak: false,
    },
    {
      condition: gifBeforeMessage?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
      template: telegrafReplyHelper.replyGifBeforeMessage,
      makeBreak: true,
    },
    {
      condition: media?.mediaType === MEDIA_TYPE_PHOTO,
      template: telegrafReplyHelper.messageWithCaption,
      makeBreak: true,
    },
    {
      condition: media?.mediaType === MEDIA_TYPE_STICKER,
      template: telegrafReplyHelper.messageAfterSticker,
      makeBreak: true,
    },
    {
      condition: messageTemplate,
      template: telegrafReplyHelper.message,
      makeBreak: true,
    },
  ];

  for (const { condition, template, makeBreak } of templates) {
    if (condition) {
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
