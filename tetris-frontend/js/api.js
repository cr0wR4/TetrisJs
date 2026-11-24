// Com o frontend publicado em outro domínio, defina a URL da API aqui.
export const API_BASE = window.TETRIS_API_BASE || '/api';
export async function currentUser() {
  const response = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error('Falha ao consultar sessão');
  return response.json();
}
// Em produção, operações POST com cookie devem enviar o token CSRF
// emitido pelo backend Spring Security.
export async function submitScore(score, csrfToken) {
  const response = await fetch(`${API_BASE}/scores`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
    body: JSON.stringify({ points: score })
  });
  if (!response.ok) throw new Error('Não foi possível registrar pontuação');
  return response.json();
}
