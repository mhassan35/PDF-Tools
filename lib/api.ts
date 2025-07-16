export const apiBase = async (
  path: string,
  options: RequestInit = {}
): Promise<any> => {
  const res = await fetch(`${"https://api.convertkr.com"}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return await res.json();
};
