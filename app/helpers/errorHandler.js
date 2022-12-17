export default function errorHandler(e) {
  console.error('[ERROR] =========================== BEGIN ===========================');
  console.error('Message:', e.message);
  console.error('Code:', e.code);
  console.error('Stack:', e.stack);
  console.error('Request:', e?.request.method, e?.request.path);
  console.error('Response:', e?.response.status, e?.response.data);
  console.error('[ERROR] ============================ END ============================');
}
