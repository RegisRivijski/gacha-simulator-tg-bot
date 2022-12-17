export default function errorHandler(e) {
  console.error('[ERROR] =========================== BEGIN ===========================');
  console.error('Message:', e.message);
  console.error('Code:', e.code);
  console.error('Stack:', e.stack);
  console.error('[ERROR] ============================ END ============================');
}
