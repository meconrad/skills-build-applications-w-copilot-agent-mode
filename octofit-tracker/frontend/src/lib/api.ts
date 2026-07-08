const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const port = 8000;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev/api`
  : `http://localhost:${port}/api`;

export function apiEndpoint(path: string) {
  return `${apiBaseUrl}/${path}`;
}

export async function fetchJson<T>(path: string) {
  const response = await fetch(apiEndpoint(path));
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export const apiHelpText = `Define VITE_CODESPACE_NAME in .env.local for Codespaces support. Without it, the app falls back to localhost:${port}.`;
