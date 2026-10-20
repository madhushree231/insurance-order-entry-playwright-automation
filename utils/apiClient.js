/**
 * Small HTTP helper. The Order Entry app has no /api routes (checked with
 * php artisan route:list), so these calls go to its normal web routes using
 * Playwright's request context. Laravel needs a CSRF token on every POST.
 */
function tokenFrom(html) {
  const meta = html.match(/name="csrf-token" content="([^"]+)"/);
  if (meta) return meta[1];
  const input = html.match(/name="_token" value="([^"]+)"/);
  return input ? input[1] : null;
}

async function getToken(request, path) {
  const res = await request.get(`${process.env.BASE_URL}${path}`);
  return tokenFrom(await res.text());
}

async function loginRequest(request, email, password) {
  const token = await getToken(request, '/login');
  return request.post(`${process.env.BASE_URL}/login`, {
    form: { _token: token, email, password },
    maxRedirects: 0,
  });
}

module.exports = { tokenFrom, getToken, loginRequest };
