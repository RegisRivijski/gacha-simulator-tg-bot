import {
  MEDIA_TYPE_PHOTO,
  MEDIA_TYPE_STICKER,
} from '../constants/index.js';

import { isAction } from '../helpers/telegraf.js';
import * as templates from '../helpers/replyTemplates.js';

export const repliesArray = [
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
      media,
    }) => isAction(ctx) && media?.invoice,
    template: templates.replyWithInvoice,
    makeBreak: true,
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
    condition: ({
      media,
      messageTemplate,
      messageAfterMedia,
    }) => !messageAfterMedia && messageTemplate && media?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
    template: templates.sendPhotoWithCaption,
    makeBreak: true,
  },
  {
    condition: ({ media, messageTemplate }) => messageTemplate && media?.media && media?.mediaType === MEDIA_TYPE_STICKER,
    template: templates.messageAfterSticker,
    makeBreak: true,
  },
  {
    condition: ({
      media,
      messageAfterMedia,
    }) => messageAfterMedia && media?.media && media?.mediaType === MEDIA_TYPE_PHOTO,
    template: templates.sendPhotoWithoutCaption,
    makeBreak: false,
  },
  {
    condition: ({ messageTemplate }) => Boolean(messageTemplate),
    template: templates.message,
    makeBreak: true,
  },
];

export default function replyByTemplate(templateParams) {
  const promises = [];
  for (const { condition, template, makeBreak } of repliesArray) {
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
