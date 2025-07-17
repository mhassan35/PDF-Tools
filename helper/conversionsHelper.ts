import axios from "@/lib/axiosInstance";
import { Conversion, ConversionPayload } from "@/type/type";


export const conversionService = {

  create: async (request: ConversionPayload): Promise<Conversion> => {
    const { input_file, output_format, custom_output_url } = request;

    try {
      const { data } = await axios.post("/conversions", { input_file, output_format });
      return {
        file_url: data.file_url || input_file,
        output_file_url: data.output_file_url || custom_output_url ,
        file_type: input_file.split(".").pop()?.toLowerCase() || "unknown",
        target_type: output_format,
      };
    } catch (error) {
      console.warn("API create conversion failed, returning mock response:", error);

      return {
        file_url: input_file,
        output_file_url: custom_output_url || `https://example.com/converted.${output_format}`,
        file_type: input_file.split(".").pop()?.toLowerCase() || "unknown",
        target_type: output_format,
      };
    }
  },


  getAll: async (): Promise<Conversion[]> => {
    try {
      const { data } = await axios.get("/conversions");
      console.log(data, "conversions api get all data");

      if (Array.isArray(data)) {
        return data.map((item) => ({
          file_url: item.file_url || "",
          output_file_url: item.output_file_url || "",
          file_type: item.file_type || "unknown",
          target_type: item.target_type || "unknown",
        }));
      }
      return [];
    } catch (error) {
      console.warn("API getAll conversions failed, returning empty array:", error);
      return [];
    }
  },
};
