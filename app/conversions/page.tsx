'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { inter, lora } from '@/lib/fonts';
import { TbFileExport } from 'react-icons/tb';
import { Conversion, option } from '@/type/type';
import { conversionService } from '@/helper/conversionsHelper';


const ConvertPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Conversion | null>(null);

  const handleConvert = async () => {
    if (!url || !format) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const newConv = await conversionService.create({
        input_file: url,
        output_format: format,
      });
      setResult(newConv);
    } catch (err: any) {
      setError(err?.message || 'Conversion failed.');
    } finally {
      setLoading(false);
    }
  };
  const handleViewConverted = () => {
    router.push('/conversions/viewConverrted')
  }

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6">
      <h1 className={`${inter.className} text-3xl text-gray-800 font-bold mb-2`}>Convert File</h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>
        Provide a file URL to convert it into a different format.
      </p>

      <div className="space-y-5">
        <div>
          <Label className={`${inter.className} pb-2`}>Enter File URL</Label>
          <Input className="border-gray-300" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/file.pdf"/>
        </div>
        <div>
          <Label className={`${inter.className} pb-2`}>Select file type</Label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm">
            {option.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 mt-8 flex-wrap">
        <Button onClick={handleConvert} disabled={loading}
        className={`${inter.className} flex items-center gap-2`}>
          <TbFileExport className="h-4 w-4" />
          {loading ? 'Converting...' : 'Convert'}
        </Button>

        <Button onClick={handleViewConverted}
          className={`${inter.className} bg-gray-100`} variant="outline">
          View Converted Files
        </Button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-8 border border-green-200 bg-green-50 p-6 rounded-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Conversion Successful</h2>
          <p className="text-sm text-gray-700 mb-4">
            Your file has been successfully converted.
          </p>
          <div className="mb-3">
            <p className="text-sm font-medium">Original File:</p>
            <p className="text-sm text-gray-600">{result.file_url}</p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-medium">Converted File:</p>
            <p className="text-sm text-gray-700">{result.output_file_url}</p>
          </div>
          <div className="flex gap-2 mt-3">
            <Button variant="secondary" >
              Download Original
            </Button>
            <Button >
              Download Converted
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConvertPage;
