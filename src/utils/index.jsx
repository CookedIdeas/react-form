import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
// import { useMutation, useQuery, useQueryClient } from 'react-query';

const apiUrl = import.meta.env.VITE_API_UTL;

export const customFetch = axios.create({
  baseURL: apiUrl,
});

export const usePostForm = () => {
  const {
    mutate: postForm,
    isLoading,
    data,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (mailBody) => customFetch.post('/form-submission', mailBody),
    onSuccess: () => {
      toast.success('Form posted !');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { postForm, isLoading, data, isError, isSuccess };
};
