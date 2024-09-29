import axios, { AxiosResponse, isAxiosError } from 'axios';

import { useState } from 'react';

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  async function request<B>(method: string, body: B) {
    try {
      setLoading(true);
      let response: AxiosResponse | null = null;
      if (method == 'post') {
        if (body) {
          response = await axios.post<T>(url, body);
        }
        if (response) {
          setData(response?.data);
          
        }
      }
      if (method == 'put') {
        if (body) {
          response = await axios.put<T>(url, body);
        }
        if (response) {
          setData(response?.data);
          
        }
      }
      if (method == 'delete') {
        if (body) {
          response = await axios.delete<T>(url, {
            data: body,
            headers: { Authorization: '***' },
          });
        }
        if (response) {
          setData(response?.data);
          
        }
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const errMsg = err.response?.data?.err as string;
        console.log('fetch err');
      }
    } finally {
      setLoading(false);
    }
  }
  return { data, isLoading, request };
}