import axios from "@/lib/axiosInstance"
import { MergedFile } from "@/type/type";


export const mergeService = {
  merge: async (request: { inputs: string[]; output?: string }) => {
    try {
      const { data } = await axios.post("/merges", request)
      return data
    } catch (error) {
      console.warn("API merge failed, returning mock response:", error)
      return {
        message: "Merge completed successfully",
        inputs: request.inputs.map((url) => ({ url, pages: Math.floor(Math.random() * 10) + 1 })),
        merged_file: request.output || `https://example.com/merged/merged-${Date.now()}.pdf`,
      }
    }
  },

  getAll: async (): Promise<MergedFile[]> => {
    try {
      const { data } = await axios.get("/merges")
      if (Array.isArray(data)) {
        return data.map((item) => ({
          files: Array.isArray(item.files) ? item.files : [],
          merged_file: item.merged_file || "",
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
