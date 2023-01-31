import { Markup } from 'telegraf';

import { getChatId } from './telegraf.js';
import delay from './delayHelper.js';

export function makeMarkupTelegrafButtons(mediaMarkupButtons) {
  return mediaMarkupButtons.map((item) => {
    if (Array.isArray(item)) {
      return item.map((btn) => Markup.button.callback(btn.message, btn.data));
    }
    return Markup.button.callback(item.message, item.data);
  });
}

export function makeMarkupInlineKeyboard(mediaMarkupButtons) {
  if (!mediaMarkupButtons?.length) {
    return [];
  }
  return Markup.inlineKeyboard(makeMarkupTelegrafButtons(mediaMarkupButtons))
    .resize();
}

export function editMediaWithCaption({
  ctx,
  sentMessage,
  media,
  messageTemplate,
}) {
  return ctx.telegram.editMessageMedia(getChatId(ctx), sentMessage.message_id, null, {
    type: media.mediaType,
    media: media.media,
    caption: messageTemplate,
    parse_mode: 'HTML',
  }, { ...makeMarkupInlineKeyboard(media?.mediaMarkupButtons) });
}

export function editMessageTextByAction({
  ctx,
  media,
  messageTemplate,
}) {
  return ctx.editMessageText(messageTemplate, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    ...makeMarkupInlineKeyboard(media?.mediaMarkupButtons),
  });
}

export function sendPhotoWithCaption({
  ctx,
  media,
  messageTemplate,
}) {
  return ctx.telegram.sendPhoto(getChatId(ctx), media.media, {
    caption: messageTemplate,
    parse_mode: 'HTML',
  }, { ...makeMarkupInlineKeyboard(media?.mediaMarkupButtons) });
}

export function sendPhotoWithoutCaption({
  ctx,
  media,
}) {
  return ctx.telegram.sendPhoto(getChatId(ctx), media.media, {
    parse_mode: 'HTML',
  }, { ...makeMarkupInlineKeyboard(media?.mediaMarkupButtons) });
}

export function replyGifBeforeMessage({
  ctx,
  messageTemplate,
  media,
  gifBeforeMessage,
}) {
  return ctx.telegram.sendAnimation(getChatId(ctx), gifBeforeMessage.media, {
    caption: gifBeforeMessage.mediaGifMessage,
    parse_mode: 'HTML',
  })
    .then((sentMessage) => delay(gifBeforeMessage.ttl)
      .then(() => editMediaWithCaption({
        ctx,
        sentMessage,
        media,
        messageTemplate,
      })));
}

export function message({
  ctx,
  messageTemplate,
  media,
}) {
  return ctx.telegram.sendMessage(
    getChatId(ctx),
    {
      text: messageTemplate,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    },
    { ...makeMarkupInlineKeyboard(media?.mediaMarkupButtons) },
  );
}

export function messageAfterSticker({
  ctx,
  messageTemplate,
  media,
}) {
  return ctx.telegram.sendSticker(getChatId(ctx), media.media)
    .then(() => message({
      ctx,
      messageTemplate,
      media,
    }));
}

export function editMessageReplyMarkup({ ctx }) {
  return ctx.editMessageReplyMarkup();
}

export function replyWithChatActionTyping({ ctx }) {
  return ctx.telegram.sendChatAction(getChatId(ctx), 'typing');
}
