import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { InterceptorService } from "@shared/services/InterceptorService";

const http = Axios.create();
const interceptorService = new InterceptorService(http);
interceptorService.addRequestInterceptor().addResponseInterceptor();

export const instance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = http({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export default instance;

export interface ErrorType<Error> extends AxiosError<Error> {}
