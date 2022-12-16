import { Markup } from 'telegraf';

import { getChatId } from './telegraf.js';
import delay from './delayHelper.js';

export function makeMarkupTelegrafButtons(mediaMarkupButtons) {
  if (!mediaMarkupButtons?.length) {
    return [];
  }
  return Markup.inlineKeyboard(
    mediaMarkupButtons.map(({ message, data }) => Markup.button.callback(message, data)),
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

export function replyGifBeforeMessage({
  ctx,
  messageTemplate,
  media,
  gifBeforeMessage,
}) {
  return ctx.replyWithAnimation(gifBeforeMessage.media, {
    caption: 'test',
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

export function messageAfterSticker({
  ctx,
  messageTemplate,
  media,
}) {
  return ctx.replyWithSticker(media.media)
    .then(() => ctx.reply(messageTemplate, {
      parse_mode: 'HTML',
    }));
}
