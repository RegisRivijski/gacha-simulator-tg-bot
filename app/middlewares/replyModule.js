import replyModuleHelper from '../helpers/replyModuleHelper.js';

export default async function replyModule(ctx, next) {
  const {
    messageTemplate,
    media,
    gifBeforeMessage,
  } = ctx.state.data;

  replyModuleHelper({
    ctx,
    messageTemplate,
    media,
    gifBeforeMessage,
  });

  await next();
}
