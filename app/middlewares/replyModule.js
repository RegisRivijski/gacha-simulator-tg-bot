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
  })
    .catch((e) => {
      console.error('[ERROR] middlewares/replyModule.js:', e.message);
    });

  await next();
}
