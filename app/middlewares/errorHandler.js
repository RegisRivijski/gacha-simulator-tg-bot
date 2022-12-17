import errorHandlerHelper from '../helpers/errorHandler.js';

export default async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    errorHandlerHelper(e);
  }
}
