import { getCookie } from "@/utils/useHooks/useCookies";
import { restBaseUrl, restBcHeaders } from "..";

export async function handleOnApplyCoupon({ body }: { body: any }) {
  const url = `${restBaseUrl}/payment/apply-coupon`;
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

export async function handleOnApplyPaymentIntent({ body }: { body: any }) {
  const url = `${restBaseUrl}/payment/payment-intent`;
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

export async function handleOnVerifyPurchase({ body }: { body: any }) {
  const url = `${restBaseUrl}/payment/verify-purchase`;
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
    return { isError: true, responseNew: response };
  }

  return {
    isError: false,
    responseNew: res,
  };
}
