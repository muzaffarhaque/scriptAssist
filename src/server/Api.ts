import axios,{ AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import postAxiosInstance, { preAxiosInstance } from '../server/interseptor';
import { toast } from 'react-toastify';

const commonGetApi = async (url:string) => {
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        return false;
    }
};

export default commonGetApi;


export const loginPostApi = async (url:string,data:any) => {
  try {
      const res = await axios.post(url,data);
      return res;
  } catch (error) {
      return false;
  }
};

export const commonAllApi = async <R = any>(
    url: string = '',
    data: any = '',
    method: Method = 'get',
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<R> | unknown> => {
    try {
      const response = await preAxiosInstance.request<R>({url, method, data, ...config });
      return response;
    } catch (error) {
      return error;
    }
  };

export const commonAllAuthApi = async <T = any>(
    url: string = '',
    data: any = '',
    method: Method = 'get',
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T> | unknown> => {
    try {
      const response = await postAxiosInstance.request<T>({url, method, data, ...config });
      return response;
    } catch (error) {
      return error;
    }
  };


export const commonGetAuthApi = async (url:string) => {
    try {
        const res = await postAxiosInstance?.get(url);
        return res;
    } catch (error) {
        return error;
    }
};
export const commonDeleteAuthApi = async (url:string) => {
    try {
        const res = await postAxiosInstance?.delete(url);
        return res;
    } catch (error) {
        return error;
    }
};
export const commonPutAuthApi = async (url:string,data:any) => {
    try {
        const res = await postAxiosInstance?.put(url,data);
        return res;
    } catch (error) {
        return error;
    }
};
