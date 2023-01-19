import replyByTemplate from '../helpers/replyTemplatesHelper.js';

export default async function replyModule(ctx, next) {
  const {
    messageTemplate,
    media,
    gifBeforeMessage,
  } = ctx.state.data;

  replyByTemplate({
    ctx,
    messageTemplate,
    media,
    gifBeforeMessage,
  });

  await next();
}
