import axios, { AxiosRequestConfig } from "axios";

export const API_POOL = {
  "public-1": process.env.NEXT_RAPIDAPI_URL as string,
} as const;

const baseURL = API_POOL["public-1"];

const TOKEN_PAYLOAD_KEY = "authorization";
const CancelToken = axios.CancelToken;
const pendingRequests = new Map();
export interface IAxiosRequest extends Partial<AxiosRequestConfig> {
  requestId?: string;
}

const axiosRequest = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});
axiosRequest.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    resolve(config);
  });
});

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 *
 * Note Don't add anymore params if needed add a object type called 'extra' or something
 * can tell me what's the need for includeAuthHead?
 */
const ServerRequest = async (url: string, options: IAxiosRequest) => {
  const { requestId, ...rest } = options;
  const reqId = requestId;

  if (reqId && pendingRequests.has(reqId)) {
    pendingRequests.get(reqId).cancel("Request cancelled");
    pendingRequests.delete(reqId);
  }

  const cancelToken = new CancelToken((cancel) => {
    pendingRequests.set(reqId, { url, cancel });
  });
  try {
    const res = await axiosRequest(url, { ...rest, cancelToken });

    pendingRequests.delete(reqId);

    return [res.data, undefined];
  } catch (e) {
    pendingRequests.delete(reqId);
    return [undefined, e];
  }
};

export default ServerRequest;
