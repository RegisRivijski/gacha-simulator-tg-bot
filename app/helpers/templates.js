import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import { isAction } from './telegraf.js';
import * as telegrafReplyHelper from './telegrafReplyHelper.js';

export default [
  {
    condition: () => true,
    template: telegrafReplyHelper.replyWithChatActionTyping,
    makeBreak: false,
  },
  {
    condition: ({ ctx, media }) => isAction(ctx) && media?.mediaMarkupButtonsRemoveAfterClick,
    template: telegrafReplyHelper.editMessageReplyMarkup,
    makeBreak: false,
  },
  {
    condition: ({
      gifBeforeMessage,
      media,
      messageTemplate,
    }) => messageTemplate && gifBeforeMessage?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
    template: telegrafReplyHelper.replyGifBeforeMessage,
    makeBreak: true,
  },
  {
    condition: ({ media, messageTemplate }) => messageTemplate && media?.mediaType === MEDIA_TYPE_PHOTO,
    template: telegrafReplyHelper.messageWithCaption,
    makeBreak: true,
  },
  {
    condition: ({ media, messageTemplate }) => messageTemplate && media?.mediaType === MEDIA_TYPE_STICKER,
    template: telegrafReplyHelper.messageAfterSticker,
    makeBreak: true,
  },
  {
    condition: ({ messageTemplate }) => Boolean(messageTemplate),
    template: telegrafReplyHelper.message,
    makeBreak: true,
  },
];