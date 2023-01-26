export default async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    console.error(e.message);
  }
}
