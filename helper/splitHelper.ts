import axios from '@/lib/axiosInstance';
import { SplitFile } from '@/type/type';


export const splitService = {
  split: async (request: any) => {
    const { data } = await axios.post('/splits', request);
    return data;
  },

  getAll: async (): Promise<SplitFile[]> => {
    const { data } = await axios.get('/splits');
    return data;
  },
};
