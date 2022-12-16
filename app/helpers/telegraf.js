import _ from 'lodash';

export function getChatId(ctx) {
  const context = !ctx.update.callback_query
    ? ctx.update.message
    : ctx.update.callback_query;
  return _.result(context, 'from.id');
}

export function getDataByChatId(axiosRequest) {
  return async (ctx, next) => {
    ctx.state.data = await axiosRequest(getChatId(ctx))
      .then(({ data }) => data);
    await next();
  };
}

export function getDataByChatIdAndPage(axiosRequest) {
  return async (ctx, next) => {
    ctx.state.data = await axiosRequest(getChatId(ctx));
    await next();
  };
}
