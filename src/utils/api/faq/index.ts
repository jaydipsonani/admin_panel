import { getCookie } from "@/utils/useHooks/useCookies";
import { restBaseUrl, restBcHeaders } from "..";

export async function fetchFaqData() {
  const url = `${restBaseUrl}/home/get-faqs?status=1`;
  const token = await getCookie("waotoken");

  const response = await fetch(url, {
    headers: {
      ...restBcHeaders,
      Authorization: `Bearer ${token}`, // Include token here
    },
    method: "GET",
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

export async function handleOnWhishList({ body }: { body: any }) {
  const url = `${restBaseUrl}/user/wishlist-add-remove`;
  const token = await getCookie("waotoken");

  const response = await fetch(url, {
    headers: {
      ...restBcHeaders,
      Authorization: `Bearer ${token}`, // Include token here
    },
    method: "POST",
    body: JSON.stringify(body),
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
