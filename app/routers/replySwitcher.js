import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import { isAction } from '../helpers/telegraf.js';
import * as templates from '../helpers/replyTemplates.js';

export default [
  {
    condition: () => true,
    template: templates.replyWithChatActionTyping,
    makeBreak: false,
  },
  {
    condition: ({ ctx, media }) => isAction(ctx) && media?.mediaMarkupButtonsRemoveAfterClick,
    template: templates.editMessageReplyMarkup,
    makeBreak: false,
  },
  {
    condition: ({
      ctx,
      messageTemplate,
      media,
      updateMessage,
    }) => isAction(ctx) && updateMessage && messageTemplate && media?.mediaMarkupButtons,
    template: templates.editMessageTextByAction,
    makeBreak: true,
  },
  {
    condition: ({
      gifBeforeMessage,
      media,
      messageTemplate,
    }) => messageTemplate && gifBeforeMessage?.media && media?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
    template: templates.replyGifBeforeMessage,
    makeBreak: true,
  },
  {
    condition: ({ media, messageTemplate }) => messageTemplate && media?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
    template: templates.messageWithCaption,
    makeBreak: true,
  },
  {
    condition: ({ media, messageTemplate }) => messageTemplate && media?.media && media?.mediaType === MEDIA_TYPE_STICKER,
    template: templates.messageAfterSticker,
    makeBreak: true,
  },
  {
    condition: ({ messageTemplate }) => Boolean(messageTemplate),
    template: templates.message,
    makeBreak: true,
  },
];
