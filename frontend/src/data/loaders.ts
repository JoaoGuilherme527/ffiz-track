/* eslint-disable @typescript-eslint/no-unused-vars */

import { flattenAttributes } from "@/src/lib/utils";
import { getAuthToken } from "./services/get-token";

async function fetchData(url: string) {
  const authToken = await getAuthToken();

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
