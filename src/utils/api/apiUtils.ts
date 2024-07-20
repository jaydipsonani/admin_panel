interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

const baseUrlStaging = "https://stagingapi.waosim.com/api";
const baseUrlCloud = "https://phpstack-1223521-4570264.cloudwaysapps.com/api";
const baseUrlLocal = "http://192.168.29.73:8090/api";

function getBaseUrlFromHost() {
  const host = window.location.host;

  if (host.includes("staging")) {
    return baseUrlStaging;
  } else if (host.includes("vercel")) {
    return baseUrlCloud;
  } else if (host.includes("local")) {
    return baseUrlStaging;
  } else {
    return baseUrlCloud;
  }
}
