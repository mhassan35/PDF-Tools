
import axios from '@/lib/axiosInstance';
import { MergedFile } from '@/type/type';

export const mergeService = {
  merge: async (request: { inputs: string[]; output?: string }) => {
    const { data } = await axios.post('/merges', request);
    return data;
  },

  getAll: async (): Promise<MergedFile[]> => {
    const { data } = await axios.get('/merges');
    return data;
  },
};


