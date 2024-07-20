import logger from "@/utils/logger";
import { getCookie } from "../useHooks/useCookies";

// export const restBaseUrl = `${NEXT_PUBLIC_API_BASEURL}/api`;
export const restBaseUrl = `https://stagingapi.waosim.com/api`;
// export const restBaseUrl = `https://phpstack-1223521-4570264.cloudwaysapps.com/api`;
// export const restBaseUrl = `http://192.168.29.73:8090/api`;

export const restBcHeaders = {
  "content-type": "application/json",
  Accept: "application/json",
  language: "en",
  //   "X-Auth-Token": `${BIGCOMMERCE_ACCESS_TOKEN!}`,
  //   "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${getCookie("waotoken")}`, // Include token here
};
export async function signupNewUser({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "authentication",
      action: "signupNewUser",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await authApi(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function emailOtpVerify({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "authentication",
      action: "emailOtpVerify",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await authApi(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function signIn({ method, body }: { method: string; body?: any }) {
  try {
    const json = {
      api: "authentication",
      action: "signin",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await authApiSingIn(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function forgotPassword({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "authentication",
      action: "forgotPassword",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await authApiPassChange(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function resetPassword({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "authentication",
      action: "resetPassword",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await authApiresetPassword(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function resendOtp({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "authentication",
      action: "resendOtp",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await authApiResendOtp(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function applyCoupon({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "couponCode",
      action: "applyCoupon",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await orderApi(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

export async function paymentIntent({
  method,
  body,
}: {
  method: string;
  body?: any;
}) {
  try {
    const json = {
      api: "order",
      action: "paymentIntent",
    };

    const config = {
      method: method,
      body: JSON.stringify(body),
    };

    const queryString = new URLSearchParams(json).toString();
    const res = await orderApi(queryString, config);
    return res.response;
  } catch (err) {
    logger.error("API threw Error", err);
    throw err;
  }
}

// This called to send request `api/bigcommerce/api` inside next setup.

const authApi = async (query: string, config: any) =>
  await (await fetch(`/api/auth/signup?${query}`, config)).json();

const authApiSingIn = async (query: string, config: any) =>
  await (await fetch(`/api/auth/signin?${query}`, config)).json();

const authApiPassChange = async (query: string, config: any) =>
  await (await fetch(`/api/auth/forgot-password?${query}`, config)).json();

const authApiresetPassword = async (query: string, config: any) =>
  await (await fetch(`/api/auth/resetpassword?${query}`, config)).json();

const authApiResendOtp = async (query: string, config: any) =>
  await (await fetch(`/api/auth/resendotp?${query}`, config)).json();

const orderApi = async (query: string, config: any) =>
  await (await fetch(`/api/order/order?${query}`, config)).json();
