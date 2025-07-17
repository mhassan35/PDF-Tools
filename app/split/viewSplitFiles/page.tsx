"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FiDownload, FiEye, FiArrowLeft } from "react-icons/fi"
import { splitService } from "@/helper/splitHelper"
import { useRouter } from "next/navigation"
import { SplitFile } from "@/type/type"
import { inter, lora, roboto } from "@/lib/fonts"


const SplitFilesPage = () => {
  const router = useRouter()
  const [files, setFiles] = useState<SplitFile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSplitFiles = async () => {
      try {
        const localStorageFiles = JSON.parse(localStorage.getItem("splitFiles") || "[]")
        let apiFiles: SplitFile[] = []
        try {
          apiFiles = (await splitService.getAll()) || []
        } catch (error) {
          console.warn("API call failed, using localStorage data:", error)
        }
        const combinedFiles = [...localStorageFiles]

        apiFiles.forEach((apiFile) => {
          const exists = combinedFiles.some(
            (localFile) => localFile.file_name === apiFile.file_name ,
          )
          if (!exists && apiFile.file_name) {
            combinedFiles.push(apiFile)
          }
        })

        console.log("Final split files data:", combinedFiles)
        setFiles(combinedFiles)
      } catch (err) {
        console.error("Failed to load split files:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSplitFiles()
  }, [])
  const goBackToSplit = () => {
    router.push("/split")
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* Header with back button */}
      <div className="text-center justify-center items-center gap-4 mb-6">
          <h1 className={`${lora.className} text-3xl text-gray-800 font-bold mb-1`}>Split Files</h1>
          <p className={`${inter.className} text-muted-foreground`}>All your previously split files are listed below.</p>
      </div>
      {loading && (
          <p className={`${inter.className} ml-3 text-gray-600`}>Loading split files...</p>
      )}
      {!loading && files.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiEye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className={`${lora.className} text-lg font-medium text-gray-900 mb-2`}>No split files found</h3>
            <p className={`${inter.className} text-gray-800 mb-2`}>You haven't split any files yet. Start by creating your first split.</p>
            <Button className={`${roboto.className}`} onClick={goBackToSplit}>Create Your First Split</Button>
          </div>
        </div>
      )}

      {!loading && files.length > 0 && (
        <div className="space-y-6">
          {files.map((file, idx) => {
            const originalFileName = file.file_name?.split("/").pop() || "Unknown File"
            return (
              <div key={`${file.file_name}`} className="border border-gray-300 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow">
                {/* Original File */}
                <div className="mb-5">
                  <h2 className={`${lora.className} text-lg font-semibold text-gray-800 mb-3`}>Original File</h2>
                  <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h1 className="text-gray-800 break-all font-medium">{originalFileName}</h1>
                    <div className="flex gap-2">
                      <Button variant="outline" className={`${roboto.className}`}
                        onClick={() => file.file_name && window.open(file.file_name, "_blank")} >
                        <FiEye className="w-4 h-4" />View
                      </Button>

                      <Button variant="default" className={`${roboto.className}`}
                        onClick={() => file.file_name && window.open(file.file_name, "_blank")}>
                        <FiDownload className="w-4 h-4" />
                         Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Split Files */}
                <div className="border-t border-gray-200 pt-5">
                  <h2 className={`${lora.className} text-lg font-semibold text-gray-800 mb-3`}>
                    Split Parts
                  </h2>
                  <div className="space-y-2">
                    {file.split_files?.map((url, i) => {
                      const partName = url?.split("/").pop() || `Part ${i + 1}`
                      const range = file.page_ranges?.[i] || [0, 0]
                      return (
                        <div key={i}
                          className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="gap-4">
                            <h1 className={`${lora.className} text-gray-800 font-medium`} >
                              Pages {range[0]} to {range[1]}
                            </h1>
                            <p>({partName})</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className={`${roboto.className}`} onClick={() => url && window.open(url, "_blank")}>
                              <FiEye className="w-4 h-4" />View
                            </Button>
                            <Button variant="default" size="sm" onClick={() => url && window.open(url, "_blank")}>
                              <FiDownload className="w-4 h-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )
                    }) || <p className="text-gray-500 italic">No split files available.</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default SplitFilesPage
