import { restBaseUrl, restBcHeaders } from "..";

export async function fetchBestDealsData() {
  const url = `${restBaseUrl}/home/splash`;

  const response = await fetch(url, {
    headers: restBcHeaders,
    method: "POST",
  });

  const res = await response.json();

  if (response.status == 404) {
    return { isError: true, response: response };
  }

  return {
    isError: false,
    response: res,
  };
}
