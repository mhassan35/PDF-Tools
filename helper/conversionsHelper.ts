import axios from '@/lib/axiosInstance';
import { Conversion, ConversionPayload } from '@/type/type';

export const conversionService = {
  create: async (request: ConversionPayload): Promise<Conversion> => {
    const { data } = await axios.post('/conversions', request);
    return data;
  },
  getAll: async (): Promise<Conversion[]> => {
    const { data } = await axios.get('/conversions');
    console.log(data, "conversioans api get all data");
    
    return data;
  },
};
