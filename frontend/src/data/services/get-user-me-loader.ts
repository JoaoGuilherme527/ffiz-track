import { getApiURL } from "@/src/lib/utils";
import { getAuthToken } from "./get-token";

const baseUrl = getApiURL();

export async function getUserMeLoader() {
  const url = `${baseUrl}/profile`;

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) return { ok: false, data: null, error: data.error };

    return { ok: true, data, error: null };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null, error };
  }
}
