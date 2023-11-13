import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
// import { useMutation, useQuery, useQueryClient } from 'react-query';

const apiUrl = import.meta.env.VITE_API_URL;
const isTest = import.meta.env.VITE_IS_TEST;

// if meta.env.VITE_IS_TEST === true → baseUrl is 'api/...'
// if production → baseUrl is meta.env.VITE_API_URL
export const customFetch = axios.create({
  baseURL: isTest ? 'api' : apiUrl,
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
    onSuccess: (response) => {
      toast.success('Form posted !');

      // in development, log received data
      isTest &&
        console.log(
          'data received by server',
          JSON.parse(response.request.requestBody)
        );
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { postForm, isLoading, data, isError, isSuccess };
};
