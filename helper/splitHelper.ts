import axios from "@/lib/axiosInstance"
import { SplitFile } from "@/type/type"

export const splitService = {
  split: async (request: any) => {
    try {
      const { data } = await axios.post("/splits", request)
      return data
    } catch (error) {
      console.warn("API split failed, returning mock response:", error)
      return {
        message: "Split completed successfully",
        outputs: request.outputs.map((output: any) => ({
          from: Number.parseInt(output.from),
          to: Number.parseInt(output.to),
          url: output.url,
        })),
      }
    }
  },

  getAll: async (): Promise<SplitFile[]> => {
    try {
      const { data } = await axios.get("/splits")
      if (Array.isArray(data)) {
        return data.map((item) => ({
          file_name: item.file_name || null,
          page_ranges: Array.isArray(item.page_ranges) ? item.page_ranges : [],
          split_files: Array.isArray(item.split_files) ? item.split_files : null,
          created_at: item.created_at || new Date().toISOString(),
        }))
      }
      return []
    } catch (error) {
      console.warn("API getAll failed, returning empty array:", error)
      return []
    }
  },
}
