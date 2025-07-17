"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FiDownload, FiEye, FiArrowLeft } from "react-icons/fi"
import { mergeService } from "@/helper/mergeHelper"
import { useRouter } from "next/navigation"
import { MergedFile } from "@/type/type"
import { inter, lora, roboto } from "@/lib/fonts"



const MergedFilesPage = () => {
  const router = useRouter()
  const [files, setFiles] = useState<MergedFile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMergedFiles = async () => {
      try {
        const localStorageFiles = JSON.parse(localStorage.getItem("mergedFiles") || "[]")
        let apiFiles: MergedFile[] = []
        try {
          apiFiles = (await mergeService.getAll()) || []
        } catch (error) {
          console.warn("API call failed, using localStorage data:", error)
        }
        const combinedFiles = [...localStorageFiles]
        apiFiles.forEach((apiFile) => {
          const exists = combinedFiles.some(
            (localFile) => localFile.merged_file === apiFile.merged_file,
          )
          if (!exists && apiFile.merged_file) {
            combinedFiles.push(apiFile)
          }
        })
        console.log("Final merged files data:", combinedFiles)
        setFiles(combinedFiles)
      } catch (err) {
        console.error("Failed to load merged files:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMergedFiles()
  }, [])

  const goBackToMerge = () => {
    router.push("/merge")
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
        <div  className="items-center text-center mb-2">
          <h1 className={`${lora.className} text-3xl text-gray-800 font-bold mb-1`}>Merged Files</h1>
          <p className={`${inter.className} text-muted-foreground`}>All your previously merged files are listed below.</p>
        </div>
      {loading && (
          <h1 className={`${lora.className} ml-3 text-gray-600`}>Loading merged files...</h1>
      )}

      {!loading && files.length === 0 && (
        <div>
          <h3 className={`${lora.className} text-lg font-medium text-gray-900 mb-2`}>No merged files found</h3>
            <p className={`${inter.className}text-gray-500 mb-4`}>You haven't merged any files yet. Start by creating your first merge.</p>
            <Button className={`${roboto.className}`} onClick={goBackToMerge}>Create Your First Merge</Button>
        </div>
      )}

      {!loading && files.length > 0 && (
        <div className="space-y-6">
          {files.map((file, idx) => (
            <div key={`${file.merged_file || idx}-${file.merged_file}`}
              className="border border-gray-300 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow"
            >
              {/* Source Files */}
              <div className="mb-5">
                <h2 className={`${lora.className} text-lg font-semibold text-gray-800 mb-3`}>Source Files</h2>
                <div className="space-y-2">
                  {(file.files || []).map((url, i) => {
                    const fileName = url.split("/").pop() || `File ${i + 1}`
                    return (
                      <div key={i}
                        className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          
                        <h1 className={`${lora.className} text-gray-800 break-all font-medium`}>{fileName}</h1>
                        <div className="flex gap-2">
                          <Button className={`${roboto.className}`} variant="outline" onClick={() => window.open(url, "_blank")}>
                            <FiEye className="w-4 h-4" />View
                          </Button>
                          <Button variant="default" className={`${roboto.className}`} onClick={() => window.open(url, "_blank")}>
                            <FiDownload className="w-4 h-4" />Download
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Merged File */}
              <div className="border-t border-gray-200 pt-5">
                <h2 className={`${lora.className} text-lg font-semibold text-gray-800 mb-3`}>Merged File</h2>
                <div className="bg-green-50 border border-green-200 px-4 py-4 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h1 className={`${lora.className} text-gray-800 break-all font-medium`}>
                      {file.merged_file?.split("/").pop() || "merged-file.pdf"}
                    </h1>
                  <div className="flex gap-2">
                    <Button className={`${roboto.className}`} variant="outline" onClick={() => window.open(file.merged_file, "_blank")}>
                      <FiEye className="w-4 h-4" />View
                    </Button>
                    <Button className={`${roboto.className}`} variant="default" onClick={() => window.open(file.merged_file, "_blank")}>
                      <FiDownload className="w-4 h-4" />Download
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

export default MergedFilesPage
