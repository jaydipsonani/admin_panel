import { getCookie } from "@/utils/useHooks/useCookies";
import { restBaseUrl, restBcHeaders } from "..";

export async function handleOnSingUp({ body }: { body: any }) {
  const url = `${restBaseUrl}/authentication/register`;

  const response = await fetch(url, {
    headers: restBcHeaders,
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

export async function handleOnOtpVerify({ body }: { body: any }) {
  const url = `${restBaseUrl}/authentication/verifyEmailMobile`;

  const response = await fetch(url, {
    headers: restBcHeaders,
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

export async function handleOnSingIn({ body }: { body: any }) {
  const url = `${restBaseUrl}/authentication/login`;

  const response = await fetch(url, {
    headers: restBcHeaders,
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

export async function handleOnForgotPassword({ body }: { body: any }) {
  const url = `${restBaseUrl}/authentication/forgotPassword`;

  const response = await fetch(url, {
    headers: restBcHeaders,
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

export async function handleOnResetPassword({ body }: { body: any }) {
  const url = `${restBaseUrl}/authentication/resetPassword`;

  const response = await fetch(url, {
    headers: restBcHeaders,
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

export async function handleOnResendOtp({ body }: { body: any }) {
  const url = `${restBaseUrl}/authentication/resendOTP`;

  const response = await fetch(url, {
    headers: restBcHeaders,
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

export async function getReferralBalance() {
  const url = `${restBaseUrl}/user/referral-balance-get`;
  const token = await getCookie("waotoken");

  const response = await fetch(url, {
    headers: {
      ...restBcHeaders,
      Authorization: `Bearer ${token}`, // Include token here
    },
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

export async function getESimList() {
  const url = `${restBaseUrl}/user/esim-list`;
  const token = await getCookie("waotoken");
  const response = await fetch(url, {
    headers: {
      ...restBcHeaders,
      Authorization: `Bearer ${token}`, // Include token here
    },
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
