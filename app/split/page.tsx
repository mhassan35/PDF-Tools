"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiPlus, FiEye, FiDownload } from "react-icons/fi"
import { IoCutOutline } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { splitService } from "@/helper/splitHelper"
import Link from "next/link"
import { inter, lora, roboto } from "@/lib/fonts"
import { toast } from "react-toastify"

const SplitPage = () => {
  const [fileUrl, setFileUrl] = useState("")
  const [parts, setParts] = useState([{ from: "", to: "", url: "" }])
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updatePart = (index: number, key: keyof typeof parts[0], value: string) => {
    setParts((prev) => prev.map((part, i) => (i === index ? { ...part, [key]: value } : part)))
  }
  const addPart = () => {
    setParts((prev) => [...prev, { from: "", to: "", url: "" }])
    toast.success("Input Added Successfully")
  }
  const deletePart = (index: number) => {setParts((prev) => prev.filter((_, i) => i !== index))
    toast.success("Successfully Deleted Input")
  }

  const handleSplit = async () => {
    
    if (!fileUrl || parts.some((p) => !p.from || !p.to || !p.url)) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const requestBody = {
        input: fileUrl,
        outputs: parts,
      }
      const response = await splitService.split(requestBody)
      const pageRanges = parts.map((part) => [
        Number.parseInt(part.from),
        Number.parseInt(part.to),
      ] as [number, number])

      const splitResult = {
        file_name: fileUrl,
        page_ranges: pageRanges,
        split_files: parts.map((part) => part.url),
        outputs:
          response.outputs ||
          parts.map((part) => ({
            from: Number.parseInt(part.from),
            to: Number.parseInt(part.to),
            url: part.url,
          })),
      }
      const existing = JSON.parse(localStorage.getItem("splitFiles") || "[]")
      const existingIndex = existing.findIndex(
        (item: any) =>
          item.file_name === splitResult.file_name &&
          JSON.stringify(item.page_ranges) === JSON.stringify(splitResult.page_ranges),
      )
      if (existingIndex >= 0) {
        existing[existingIndex] = splitResult
      } else {
        existing.unshift(splitResult)
      }

      localStorage.setItem("splitFiles", JSON.stringify(existing.slice(0, 50)))
      toast.success("Files Split Successfully")
      setResult(splitResult)
    } catch (error) {
      console.error("Split failed:", error)
      alert("Split failed")
    } finally {
      setLoading(false)
    }
  }
  const goToSplitViewPage = () => router.push("/split/viewSplitFiles")

  return (
    <section className="w-full max-w-3xl mx-auto p-6 border border-gray-200 rounded-md">
      <h1 className={`${lora.className} text-3xl font-bold text-gray-800 mb-2`}>Split File</h1>
      <p className={`${inter.className} text-muted-foreground mb-4`}>Split a file into parts based on page ranges</p>

      <Label className={`${inter.className} pb-2`}>Original File URL</Label>
      <Input placeholder="https://example.com/file.pdf" value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)} />

      <p className={`${inter.className} mt-4`}>Define the page ranges for each output file:</p>

      <div className="space-y-8 pt-2">
        {parts.map((part, i) => (
          <div key={i} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <div className="flex gap-2 flex-1">
                <div className="flex-1">
                  <Label className={`${inter.className} pb-2`}>From Page</Label>
                  <Input
                    type="number"
                    value={part.from}
                    onChange={(e) => updatePart(i, "from", e.target.value)}
                    placeholder="e.g. 1"
                  />
                </div>
                <div className="flex items-center px-2 mt-6">to</div>
                <div className="flex-1">
                  <Label className={`${inter.className} pb-2`} >To Page</Label>
                  <Input
                    type="number"
                    value={part.to}
                    onChange={(e) => updatePart(i, "to", e.target.value)}
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              {i > 0 && (
                <Button variant="destructive" size="icon" onClick={() => deletePart(i)}>
                  <FaRegTrashAlt className="w-6 h-6" />
                </Button>
              )}
            </div>

            <div>
              <Label className={`${inter.className} pb-2`} >Split File URL</Label>
              <Input
                value={part.url}
                onChange={(e) => updatePart(i, "url", e.target.value)}
                placeholder="https://example.com/part.pdf"
              />
            </div>
          </div>
        ))}

        <Button onClick={addPart} variant="ghost" className="flex gap-2 bg-gray-100">
          <FiPlus className="w-4 h-4" /> Add another part
        </Button>
      </div>

      <div className="flex gap-4 mt-10 flex-wrap">
        <Button onClick={handleSplit} disabled={loading}>
          <IoCutOutline className="h-4 w-4" />
          {loading ? "Splitting..." : "Split File"}
        </Button>
        <Button variant="outline" onClick={goToSplitViewPage}>
          <FiEye className="h-4 w-4" /> View Split Files
        </Button>
      </div>
      {result?.outputs?.length > 0 && (
        <div className="mt-8 border border-green-200 bg-green-50 p-6 rounded-md shadow-sm">
          <h2 className={`${lora.className} text-lg font-semibold text-green-800 mb-3`}>Split Successful!</h2>
          <div className="space-y-4">
              <p className={`${inter.className} text-sm font-medium`}>Original File:</p>
              <div className="bg-white border border-green-200 p-3 rounded-md break-all">{fileUrl}</div>
            <div>
              <p className="text-sm font-medium">Split Parts:</p>
              <ul className="space-y-2">
                {result.outputs.map((file: any, idx: number) => (
                  <div key={idx} className="bg-white border border-green-200 rounded-md p-3">
                      Pages {file.from} to {file.to}
                      <Link href={file.url} target="_blank"
                        className="flex text-blue-600">
                        {file.url}
                      </Link>
                  </div>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 pt-2">
              <Button className={`${roboto.className}`} variant="outline" 
               onClick={() => window.open(fileUrl, "_blank")}>
                <FiEye className="w-4 h-4" />View Original
              </Button>
              <Button className={`${roboto.className}`} onClick={goToSplitViewPage}>
                <FiDownload className="w-4 h-4" />Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SplitPage
