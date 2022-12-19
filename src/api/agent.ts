import axios, { AxiosResponse } from 'axios';
import { PresalePostData, PresalePreviewsStaticData, PresaleStaticData } from './presales/types';

axios.defaults.baseURL = '/api';

axios.interceptors.response.use(async (response) => {
  return response;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: any) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: any) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Presales = {
  getDetailsData: (address: string) => requests.get<PresaleStaticData>(`/presale/${address}`),
  getPreviewsData: (addresses: string[]) =>
    requests.post<PresalePreviewsStaticData>('/presale/previews', { addresses }),
  create: (data: PresalePostData) => requests.post<PresaleStaticData>('/presale', data),
  update: (data: PresalePostData) =>
    requests.put<PresaleStaticData>(`/presale/${data.address}`, data),
  delete: (address: string) => requests.delete<PresaleStaticData>(`/presale/${address}`),
};

const agent = {
  Presales,
};

export default agent;
