import { Markup } from 'telegraf';

import { getChatId } from './telegraf.js';
import delay from './delayHelper.js';

export function makeMarkupTelegrafButtons(mediaMarkupButtons) {
  if (!mediaMarkupButtons?.length) {
    return [];
  }
  return Markup.inlineKeyboard(
    mediaMarkupButtons.map((button) => Markup.button.callback(button.message, button.data)),
  )
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
  }, { ...makeMarkupTelegrafButtons(media?.mediaMarkupButtons) });
}

export function messageWithCaption({
  ctx,
  media,
  messageTemplate,
}) {
  return ctx.telegram.sendPhoto(getChatId(ctx), media.media, {
    caption: messageTemplate,
    parse_mode: 'HTML',
  }, { ...makeMarkupTelegrafButtons(media?.mediaMarkupButtons) });
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
    { ...makeMarkupTelegrafButtons(media?.mediaMarkupButtons) },
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
