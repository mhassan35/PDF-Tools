// import { apiBase } from '../lib/api';

// export interface MergePayload {
//   inputs: string[];
//   output?: string;
// }

// export interface MergeResult {
//   id: number;
//   inputs: { url: string; pages?: number }[];
//   merged_file: string;
//   created_at?: string;
// }

// export const createMerge = async (payload: MergePayload): Promise<MergeResult> => {
//   return await apiBase('/merge', {
//     method: 'POST',
//     body: JSON.stringify(payload),
//   });
// };
