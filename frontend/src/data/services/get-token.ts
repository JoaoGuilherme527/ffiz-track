import { cookies } from "next/headers";

export async function getAuthToken() {
  const authCookies = await cookies();
  const authToken = authCookies.get("jwt")?.value;
  return authToken;
}