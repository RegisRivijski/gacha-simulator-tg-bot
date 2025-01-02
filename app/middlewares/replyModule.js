import replySwitcher from '../routers/replySwitcher.js';

export default async function replyModule(ctx, next) {
  replySwitcher({
    ctx,
    ...ctx.state.data,
  })
    .catch((e) => {
      console.error('[ERROR] middlewares/replyModule.js:', e.message);
    });

  await next();
}
