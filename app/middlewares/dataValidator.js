import { isAction, getCtxData } from '../helpers/telegraf.js';
import { validateAndUpdateUserData } from '../helpers/dataValidator.js';

export default async function dataValidator(ctx, next) {
  const ctxData = getCtxData(ctx);
  const userData = ctx.state?.data?.userData;
  if (!isAction(ctx) && userData) {
    validateAndUpdateUserData(ctxData, userData);
  }
  await next();
}
