import proxyRequest from './proxyRequest.js';

import * as telegraf from '../helpers/telegraf.js';
import * as proxyRoutes from '../routers/proxy.js';

import * as gachaSimulatorRest from '../managers/gachaSimulatorRest.js';

export async function paymentsCatcher(ctx, next) {
  const {
    isPaymentAction,
    preCheckoutQuery,
  } = telegraf.getCtxData(ctx);

  if (isPaymentAction) {
    if (preCheckoutQuery.invoice_payload.includes('sid')) {
      await proxyRequest(proxyRoutes.usersProceedPayments)(ctx);
      await ctx.answerPreCheckoutQuery(true);
    } else if (preCheckoutQuery.invoice_payload.includes('tprm')) {
      await proxyRequest(proxyRoutes.usersProceedPaymentsPremium)(ctx);
      await ctx.answerPreCheckoutQuery(true);
    }
  }

  await next();
}

export async function successfulPaymentCatcher(ctx, next) {
  const successfulPayment = ctx?.update?.message?.successful_payment;
  if (successfulPayment) {
    await gachaSimulatorRest.createSuccessfulPayment(successfulPayment);
  }
  await next();
}
