import { apiBase } from '../lib/api';

export interface ConversionPayload {
  fileUrl: string;
  outputFormat: string;
}

export interface Conversion {
  id: number;
  file_type: string;
  target_type: string;
  file_url: string;
  output_file_url: string;
  created_at: string; 
}

export const createConversion = async (
  data: ConversionPayload,
): Promise<Conversion> => {
  return apiBase('/conversions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
