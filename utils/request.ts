import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '@/config';

// import { SITE_NAMES_MAPS_SITE_IDS } from 'appconstants';
// import { getSession } from './cognito';

const codeMessage: { [key: string]: string } = {
  200: 'The request has succeeded',
  201: 'New resource has been created ',
  202: 'The request has been received',
  204: 'No Content',
  400: 'The server could not understand the request due to invalid syntax.',
  401: 'Unauthorized Operation',
  403: 'You do not have access rights to the content',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'The request content is not longer available',
  422: 'The request was well-formed but was unable to be followed due to semantic errors.',
  500: "The server has encountered a situation it doesn't know how to handle",
  502: 'Bad Gateway',
  503: 'The server is not ready to handle the request',
  504: 'Timeout',
};

export const API_POOL = {
  'public-1': BASE_URL,
} as const;

const baseURL = API_POOL['public-1'];

const TOKEN_PAYLOAD_KEY = 'authorization';
const CancelToken = axios.CancelToken;
const pendingRequests = new Map();
export interface IAxiosRequest extends Partial<AxiosRequestConfig> {
  public?: boolean;
  handleError?: boolean;
  attachToken?: boolean;
  attachAccountId?: boolean;
  requestId?: string;
}

const axiosRequest = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});
axiosRequest.interceptors.request.use(function (config) {
  const { attachToken = true, public: publicApi = false } = config as AxiosRequestConfig<any> & {
    attachToken?: boolean;
    public?: boolean;
  };
  return new Promise((resolve, reject) => {
    // if (attachToken) {
    //   getSession() //This will automatically check if the token is expire get new otherwise get old
    //     .then(async (session) => {
    //       config.headers[TOKEN_PAYLOAD_KEY] = 'Bearer ' + session.getAccessToken().getJwtToken();
    //       resolve(config);
    //     })
    //     .catch((error) => {
    //       // No logged-in user: don't set auth header
    //       if (publicApi) {
    //         resolve(config);
    //       } else {
    //         reject(error);
    //       }
    //     });
    // } else {
    // }
    resolve(config);
  });
});

type CustomResponse = {
  success?: boolean;
  errorHandled?: boolean;
  reason?: string;
  cancelled?: boolean;
} & Partial<AxiosResponse>;

type RequestError = { response: CustomResponse };

const errorHandler = (error: RequestError): CustomResponse => {
  if (error instanceof axios.Cancel) {
    return {
      success: false,
      errorHandled: true,
      cancelled: true,
      reason: 'cancelled',
      ...error,
    };
  }

  const { response } = error;

  if (response && response.status && codeMessage[response.status]) {
    // if (response.status === 400) {
    //   notification.error({
    //     message: response.data?.message || codeMessage[response.status],
    //   });
    // }
    response.success = false;
    response.errorHandled = true;
    const errorText = codeMessage[response.status];
    return {
      ...response,
      success: false,
      errorHandled: true,
      reason: errorText,
    };
  } else if (!response) {
    return { success: false, errorHandled: true };
  }

  return { ...response, success: false, errorHandled: true, reason: 'network' };
};

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 *
 * Note Don't add anymore params if needed add a object type called 'extra' or something
 * can tell me what's the need for includeAuthHead?
 */
const request = async (
  url: string,
  options: IAxiosRequest = {
    handleError: true,
  },
) => {
  const { requestId, ...rest } = options;
  const handleError = options.handleError ?? true;
  const reqId = requestId;
  if (reqId && pendingRequests.has(reqId)) {
    pendingRequests.get(reqId).cancel('Request cancelled');
    pendingRequests.delete(reqId);
  }

  const cancelToken = new CancelToken((cancel) => {
    pendingRequests.set(reqId, { url, cancel });
  });
  try {
    const res = await axiosRequest(url, { ...rest, cancelToken });

    pendingRequests.delete(reqId);

    return { success: true, ...(res || {}) };
  } catch (e) {
    pendingRequests.delete(reqId);
    if (handleError) {
      throw errorHandler(e as RequestError);
    } else {
      throw e;
    }
  }
};

export default request;
