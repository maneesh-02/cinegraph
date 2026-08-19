const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


export async function apiGet(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch (err) {
    throw new Error("Could not reach the CineGraph API. Is the backend running?");
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new Error(message);
  }

  const body = await response.json();
  return body.data;
}
