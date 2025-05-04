import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

const TOKEN_KEY = 'token_script';
const BASE_URL = 'https://api.spacexdata.com';
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// POST Axios Instance
const postAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

postAxiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

postAxiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

export default postAxiosInstance;

// PRE Axios Instance
export const preAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

preAxiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

preAxiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);
