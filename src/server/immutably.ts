import crypto from "crypto";
import OAuth from "oauth-1.0a";
import { ofetch } from "ofetch";

function hash_function_sha1(baseString: string, key: string) {
  return crypto.createHmac("sha1", key).update(baseString).digest("base64");
}

const options = {
  baseUrl: process.env.CONSUMER_APP_URL,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
};

const oauth = new OAuth({
  consumer: {
    key: String(options.consumerKey),
    secret: String(options.consumerSecret),
  },
  signature_method: "HMAC-SHA1",
  hash_function: hash_function_sha1,
});

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const method = getMethod(event).toString();
  const requestData = {
    data,
    method,
    url: `${options.baseUrl}${event.node.req.url}`,
    includeBodyHash: true,
  };
  const headers = {
    Accept: 'application/json',
    'content-type': 'application/vnd.io.cxl.credentials.username-password+json',
    'X-CXL-Application': String(options.consumerKey),
    ...oauth.toHeader(oauth.authorize(requestData))
  }
  try {
    const tokens = await $fetch(requestData.url, {
      baseURL: options.baseUrl,
      body: JSON.stringify(data),
      headers,
      method: "POST",
    })
    return { accessToken: tokens['access-token'] };
  } catch (e) {
    let message = 'Something went wrong';
    if (e.response?.status === 401) {
      message = 'Please try again'
    }
    throw createError({
      message,
      stack: undefined,
      statusCode: 401,
    });
  }
});
