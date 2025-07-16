'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiEye, FiPlus } from 'react-icons/fi';
import { IoGitMergeOutline } from 'react-icons/io5';
import { FaRegTrashAlt } from 'react-icons/fa';
import { inter, lora } from '@/lib/fonts';
import { apiBase } from '@/lib/api';

const MergePage = () => {
  const router = useRouter();
  const [urls, setUrls] = useState(['', '']);
  const [outputUrl, setOutputUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (i: number, val: string) => { console.log(val)
    setUrls(prev => prev.map((u, idx) => (idx === i ? val : u)));}

  const addInput = () =>  setUrls(prev => [...prev, '']);
  const deleteInput = (i: number) => setUrls(prev => prev.filter((_, idx) => idx !== i));

  const handleMerge = async () => {
    console.log("data is mereaged");
    setLoading(true);
    try {
      const body = {
        inputs: urls.filter(Boolean),
        output: outputUrl,
        
      };

      const res = await apiBase('/marges', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      setResult(res);
      console.log(res);
      
    } catch (err) {
      alert('Merge failed');
    } finally {
      setLoading(false);
    }
  };

  const goToMergedFilesPage = () => {
    router.push('/merge/viewMergedFiles');
  };

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6">
      <h1 className={`${inter.className} text-3xl text-gray-800 font-bold mb-2`}>Merge Files</h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>
        Combine multiple files into a single output.
      </p>

      <div className="space-y-5">
        {urls.map((url, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className='pb-2'>File URL {i + 1}</Label>
              <Input
                className="border-gray-300"
                value={url}
                onChange={e => handleChange(i, e.target.value)}
                placeholder="https://example.com/file.pdf"
              />
            </div>
            {i > 1 && (
              <Button size="icon" variant="destructive" onClick={() => deleteInput(i)}>
                <FaRegTrashAlt className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button className={`${inter.className} bg-gray-200 flex items-center gap-2`} variant="ghost" onClick={addInput}>
          <FiPlus className="h-4 w-4" />
          Add another URL
        </Button>

        <div>
          <Label className='pb-2'>Output URL (optional)</Label>
          <Input
            className="border-gray-300"
            value={outputUrl}
            onChange={e => setOutputUrl(e.target.value)}
            placeholder="https://example.com/merged/output.pdf"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8 flex-wrap">
        <Button className={`${inter.className}`} onClick={handleMerge} disabled={loading || urls.length < 2}>
          <IoGitMergeOutline className="h-4 w-4" />
          {loading ? 'Merging...' : 'Merge'}
        </Button>
        <Button className={`${inter.className}`} variant="outline" onClick={goToMergedFilesPage}>
          <FiEye className="h-4 w-4" />
          View Merged Files
        </Button>
      </div>

      {/* ✅ Success box (shown after merge) */}
      {result?.inputs?.length > 0 && (
        <div className="mt-8 border border-green-200 bg-green-50 p-6 rounded-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Conversion Successful</h2>
          <p className="text-sm text-gray-700 mb-4">
            Your file has been successfully merged.
          </p>

          <div className="mb-3">
            <p className="text-sm font-medium">Input Files:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {result.inputs.map((file: any, idx: number) => (
                <li key={idx}>
                  {file.url}{' '}
                  {file.pages !== undefined && (
                    <span className="text-gray-400">({file.pages} pages)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium">Converted File:</p>
            <p className="text-sm text-gray-700">{result.merged_file}</p>
          </div>

          <div className="flex gap-2 mt-3">
            <Button variant="secondary" onClick={() => window.open(result.inputs[0].url, '_blank')}>
              Download Original
            </Button>
            <Button onClick={() => window.open(result.merged_file, '_blank')}>
              Download Converted
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MergePage;
