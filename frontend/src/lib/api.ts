export interface ApiAnswer {
  explanation: string;
  sources?: string[];
}

const base = import.meta.env.VITE_API_URL;

export function isApiConfigured(): boolean {
  return Boolean(base);
}

export async function askBackend(payload: { question: string; language: string; grade: string; subject: string }): Promise<ApiAnswer> {
  if (!base) throw new Error('API non configurée');
  const res = await fetch(`${base}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Erreur API ${res.status}`);
  return (await res.json()) as ApiAnswer;
}
