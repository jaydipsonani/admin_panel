import { Cookies } from "react-cookie-consent";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

// Get item from cookies
export const getCookie = (key: string) => {
  if (isBrowser()) {
    return Cookies.get(key);    
  }
};

// Set item from cookies
export const setCookie = (key: string, value: any, options: object) => {
    Cookies.set(key, value, options)
};

// Remove item from  cookies
export const removeCookie = (key: string) => {
    Cookies.remove(key);
};

// Get item from cookies serverside

export const getCookieFromRequest = async (req: any, cookieName: any) => {
  const cookie = await req.headers.cookie?.split(";").find((cookie: any) => cookie.trim().startsWith(`${cookieName}=`));

  if (!cookie) return null;

  return cookie.split("=")[1];
};
