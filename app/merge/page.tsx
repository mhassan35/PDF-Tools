"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiDownload, FiEye, FiPlus } from "react-icons/fi"
import { IoGitMergeOutline } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { mergeService } from "@/helper/mergeHelper"
import Link from "next/link"
import { inter, lora, roboto } from "@/lib/fonts"
import { toast } from "react-toastify"

const MergePage = () => {
  const router = useRouter()
  const [urls, setUrls] = useState(["", ""])
  const [outputUrl, setOutputUrl] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (i: number, val: string) => {
    setUrls((prev) => prev.map((u, idx) => (idx === i ? val : u)))
  }

const addInput = () => {
  setUrls((prev) => [...prev, ""]) 
  toast.success("Input Added Successfully")
}

const deleteInput = (i: number) => {
  setUrls((prev) => prev.filter((_, idx) => idx !== i)) 
  toast.success("Successfully Deleted Input");
}

  const handleMerge = async () => {
    setLoading(true)
    const cleanUrls = urls.filter(Boolean)
    if (cleanUrls.length < 3) {
      toast.error("Please fill the inputs")
      setLoading(false)
      return
    }

    try {
      const res = await mergeService.merge({ inputs: cleanUrls, output: outputUrl })
      const mergedResult = {
        id: res?.id || Date.now(),
        files: cleanUrls,
        merged_file: res.merged_file || outputUrl,
        created_at: new Date().toISOString(),
        status: "completed",
        inputs: res.inputs || cleanUrls.map((url) => ({ url, pages: Math.floor(Math.random() * 10) + 1 })),
      }
      console.log("Merged result:", mergedResult)
      const existingMergedFiles = JSON.parse(localStorage.getItem("mergedFiles") || "[]")
      const existingIndex = existingMergedFiles.findIndex((file: any) => file.merged_file === mergedResult.merged_file)

      if (existingIndex >= 0) {
        existingMergedFiles[existingIndex] = mergedResult
      } else {
        existingMergedFiles.unshift(mergedResult)
      }
      
      const limitedFiles = existingMergedFiles.slice(0, 50)
      localStorage.setItem("mergedFiles", JSON.stringify(limitedFiles))
      toast.success("Files Merged Successfully")

      setResult(mergedResult)
    } catch (err) {
      alert("Merge failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewMergedFiles = () => {
    router.push("/merge/viewMergedFiles")
  }

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6">
      <div>
      <h1 className={`${lora.className} text-3xl text-gray-800 font-bold mb-2`}>Merge Files</h1>
      <p className={`${inter.className} text-muted-foreground mb-4`}>Combine multiple files into a single output.</p>
      </div>
      <div className="space-y-5">
        {urls.map((url, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className={`${inter.className} pb-2`}>File URL {i + 1}</Label>
              <Input className="border-gray-300" value={url}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="https://example.com/file.pdf"/>
            </div>
            {i > 1 && (
              <Button size="icon" variant="destructive" onClick={() => deleteInput(i)}>
                <FaRegTrashAlt className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button className={`${roboto.className} bg-gray-200 flex items-center gap-2`} 
          variant="ghost" onClick={addInput}>
          <FiPlus className="h-4 w-4" />
          Add another URL
        </Button>

        <div>
          <Label className={`${inter.className} pb-2`}>Output URL (optional)</Label>
          <Input className="border-gray-300" value={outputUrl}
            onChange={(e) => setOutputUrl(e.target.value)}
            placeholder="https://example.com/merged/output.pdf" />
        </div>
      </div>
      <div className="flex gap-4 mt-8 flex-wrap">
        <Button className={`${roboto.className}`} onClick={handleMerge} disabled={loading || urls.length < 2}>
          <IoGitMergeOutline className="h-4 w-4" />
          {loading ? "Merging..." : "Merge"}
        </Button>
        <Button className={`${roboto.className}`} variant="outline" onClick={handleViewMergedFiles}>
          <FiEye className="h-4 w-4" />
          View Merged Files
        </Button>
      </div>

      {/* Success Box - Shows after successful merge */}
      {result?.merged_file && (
      <div className="mt-8 border border-green-200 bg-green-50 p-6 rounded-md shadow-sm">
        <header className="items-center ml-3 mb-3">
          <h2 className={`${lora.className} text-lg font-semibold text-green-800`}>Merge Successful!</h2>
          <p className={`${inter.className} text-sm text-green-700`}>Your files have been successfully merged.</p>
        </header>

      <div className="space-y-4">
        <div className="bg-gray-200 p-4 rounded-md" >
          <h3 className={` ${lora.className} text-sm font-medium text-gray-800 mb-2`}>
            Input Files:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {result.inputs?.map((file: any, idx: number) => (
              <li key={idx} className="flex items-center">
                <p className={`${inter.className} break-all`}>{file.url || file}</p>
                {file.pages !== undefined && (
                  <h1 className={`${lora.className}text-gray-400 ml-2`}>({file.pages} pages)</h1>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`${lora.className} text-sm font-medium text-gray-800 mb-2`}>
            Merged File:
          </h3>
          <div className="bg-white border border-green-200 rounded-md p-3">
            <Link href={result.merged_file} target="_blank"
              className="text-blue-600 hover:text-blue-800 underline break-all">
              {result.merged_file}
            </Link>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button className={`${roboto.className}`} 
            onClick={() => window.open(result.inputs?.[0]?.url || result.files?.[0], "_blank")}
             variant="outline">
              <FiEye className="h-4 w-4" />
              View Original
          </Button>
          <Button className={`${roboto.className}`} 
            onClick={() => window.open(result.merged_file, "_blank")}>
              <FiDownload className="h-4 w-4" />
            Download Merged
          </Button>
        </div>
      </div>
    </div>
      )}
  </section>
  )
}

export default MergePage
