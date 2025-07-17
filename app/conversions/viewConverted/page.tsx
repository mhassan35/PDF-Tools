"use client"
import { useEffect, useState } from "react"
import { FiDownload, FiEye, FiArrowLeft } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { conversionService } from "@/helper/conversionsHelper"

import { useRouter, useSearchParams } from "next/navigation" 
import { roboto } from "@/lib/fonts"
import { Conversion } from "@/type/type"

const ConvertedFilesPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams() 
  const refresh = searchParams.get("refresh")
  const [files, setFiles] = useState<Conversion[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchConvertedFiles = async () => {
    setLoading(true);
    try {
      const localFiles: Conversion[] = JSON.parse(localStorage.getItem("convertedFiles") || "[]");
      const apiFiles = await conversionService.getAll().catch((err) => {
        console.warn("API fetch failed. Falling back to localStorage:", err);
        return [];
      });
      const mergedFiles = mergeConvertedFiles(localFiles, apiFiles);
      setFiles(mergedFiles);
    } catch (error) {
      console.error("Failed to load converted files:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchConvertedFiles();
}, [refresh]);

// Merges API and local converted files, avoiding duplicates.
const mergeConvertedFiles = (local: Conversion[], remote: Conversion[]): Conversion[] => {
  const isDuplicate = (a: Conversion, b: Conversion) =>
    a.file_url === b.file_url && a.target_type === b.target_type;
  const uniqueRemote = remote.filter(
    (remoteFile) =>
      remoteFile.file_url &&
      remoteFile.output_file_url &&
      !local.some((localFile) => isDuplicate(localFile, remoteFile))
  );
  return [...local, ...uniqueRemote];
};
const goBackToConvert = () => router.push("/conversions");

  return (
    <section className="max-w-4xl mx-auto p-6">
      <div className="justify-center text-center items-center gap-4 mb-6">
          <h1 className="font-sans text-3xl text-gray-800 font-bold mb-1">Converted Files</h1>
          <p className="font-serif text-muted-foreground">All your previously converted files are listed below.</p>
      </div>
      {loading && (
          <p className="ml-3 text-gray-600">Loading converted files...</p>
      )}
      {/* Show if data is not found */}
      {!loading && files.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No converted files found</h3>
            <p className="text-gray-500 mb-4">
              You haven't converted any files yet. Start by converting your first file.
            </p>
            <Button onClick={goBackToConvert}>Convert Your First File</Button>
        </div>
      )}
    {/* Conversion Details and loading*/}
      {!loading && files.length > 0 && (
        <div className="space-y-6">
          {files.map((file) => (
            <div key={file.file_url} 
              className="border text-gray-800 border-gray-300 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow"> 
              <div className="mb-5 text-gray-800">
                  <p className="font-medium">Conversion: ({file.file_type.toUpperCase()}) → ({file.target_type.toUpperCase()})</p>
                <p className="pb-1 font-medium">Original File: ({file.file_type.toUpperCase()})</p>
                <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1>{file.file_url?.split("/").pop()}</h1>

              {/* Download and view buttons for Original files */}
                  <div className="flex gap-2">
                    <Button className={`${roboto.className}`} variant="outline" 
                      onClick={() => window.open(String(file.file_url), "_blank")}>
                      <FiEye className="w-4 h-4" />
                      View Original
                    </Button>
                    <Button className={`${roboto.className}`} variant="default" 
                      onClick={() => window.open(String(file.file_url), "_blank")}>
                      <FiDownload className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              {/* Converted File */}
              <div className="border-t pt-2 border-gray-200">
                <h1 className="text-gray-800 mb-2 font-medium">
                  Converted File: ({file.target_type.toUpperCase()})
                </h1>
                <div className="bg-gray-100 border border-green-200 px-4 py-4 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="flex items-center">
                      {file.output_file_url?.split("/").pop()}
                  </h1>
                  {/* Download and view buttons for converted files */}
                  <div className="flex gap-2">
                    <Button className={`${roboto.className}`} variant="outline" 
                      onClick={() => window.open(String(file.output_file_url), "_blank")}>
                      <FiEye className="w-4 h-4" />View Converted
                    </Button>
                    <Button className={`${roboto.className}`} variant="default"
                      onClick={() => window.open(String(file.output_file_url), "_blank")}>
                      <FiDownload className="w-4 h-4"/>Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ConvertedFilesPage
