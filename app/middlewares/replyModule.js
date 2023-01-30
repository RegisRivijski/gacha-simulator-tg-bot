import replyByTemplate from '../helpers/replyTemplatesHelper.js';

export default async function replyModule(ctx, next) {
  replyByTemplate({
    ctx,
    ...ctx.state.data,
  })
    .catch((e) => {
      console.error('[ERROR] middlewares/replyModule.js:', e.message);
    });

  await next();
}
