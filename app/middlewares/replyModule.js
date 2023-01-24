import replyByTemplate from '../helpers/replyTemplatesHelper.js';
import { errorHandler } from './events.js';

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
    .catch(errorHandler);

  await next();
}
