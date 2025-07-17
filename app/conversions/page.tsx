"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbFileExport } from "react-icons/tb";
import { conversionService } from "@/helper/conversionsHelper";
import { Conversion, conversionOptions } from "@/type/type";
import Link from "next/link";
import { FiDownload, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";

const ConvertPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("pdf");
  const [inputType, setInputType] = useState("");
  const [customOutputUrl, setCustomOutputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Conversion | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    const ext = inputUrl.split(".").pop()?.toLowerCase() || "unknown";
    setInputType(ext);
  };
  
  const handleConvert = async () => {
    toast.success("Files Converted Successfully")
    if (!url || !format) {
      toast.error("Please enter a file URL and select a format.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const newConv = await conversionService.create({
        input_file: url,
        output_format: format,
      });

      const convertedResult: Conversion = {
        file_url: url,
        output_file_url: customOutputUrl || newConv.output_file_url,
        file_type: inputType,
        target_type: format,
      };

      const existingFiles = JSON.parse(localStorage.getItem("convertedFiles") || "[]");
      const existingIndex = existingFiles.findIndex(
        (item: Conversion) =>
          item.file_url === convertedResult.file_url &&
          item.target_type === convertedResult.target_type
      );

      if (existingIndex >= 0) {
        existingFiles[existingIndex] = convertedResult;
      } else {
        existingFiles.unshift(convertedResult);
      }

      const limited = existingFiles.slice(0, 50);
      localStorage.setItem("convertedFiles", JSON.stringify(limited));
      setResult(convertedResult);
    } catch (err: any) {
      setError(err?.message || "Conversion failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewConverted = () => router.push("/conversions/viewConverted?refresh=");

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6">
      <h1 className="font-sans text-3xl text-gray-800 font-bold mb-2">Convert File</h1>
      <p className="font-serif text-muted-foreground mb-4">
        Provide a file URL and choose a format to convert your file.
      </p>

      <div className="space-y-5">
        {/* Input File URL */}
        <div>
          <Label className="font-sans pb-2">Enter File URL</Label>
          <Input className="border-gray-300" value={url} onChange={handleUrlChange}
            placeholder="https://example.com/file.pdf"/>
          {inputType && (
            <p className="text-sm text-gray-500 mt-1">Detected file type:{inputType.toUpperCase()}</p>
          )}
        </div>

        {/* Select Format */}
        <div>
          <Label className="font-sans pb-2">Select Output Format</Label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm">
            {conversionOptions.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Output URL shown only after format selected */}
        {format && (
          <div>
            <Label className="font-sans pb-2">Custom Output File URL (Optional)</Label>
            <Input className="border-gray-300" value={customOutputUrl}
              onChange={(e) => setCustomOutputUrl(e.target.value)}
              placeholder={`https://example.com/output-file.${format}`}/>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8 flex-wrap">
        <Button onClick={handleConvert} disabled={loading} className="font-sans flex items-center gap-2">
          <TbFileExport className="h-4 w-4" />
          {loading ? "Converting..." : "Convert"}
        </Button>
        <Button onClick={handleViewConverted} className="font-sans bg-gray-100" variant="outline">
         <FiEye /> View Converted Files
        </Button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-8 border border-green-200 bg-green-50 p-6 rounded-md shadow-sm">
          <div className="mb-3">
              <h2 className="text-lg font-semibold text-green-800">Conversion Successful!</h2>
              <p className="text-sm text-green-700">Your file has been successfully converted.</p>
          </div>
          <div className="space-y-2 items-center justify-center">
            <div>
              <h1 className="text-sm font-medium text-gray-700 mb-2">Original File:</h1>
                <h2 className="text-gray-800 break-all">{result.file_url}</h2>
              <p className="text-sm font-medium text-gray-700 mt-2">Converted File:</p>
                <Link href={result.output_file_url} target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline break-all">
                  {result.output_file_url}
                </Link>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => window.open(result.file_url, "_blank")}>
                <FiEye /> View Original ({result.file_type?.toUpperCase()})
              </Button>
              <Button onClick={() => window.open(result.output_file_url, "_blank")}>
               <FiDownload /> Download Converted ({result.target_type?.toUpperCase()})
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConvertPage;
