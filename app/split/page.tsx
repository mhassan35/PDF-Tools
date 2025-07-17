'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiPlus, FiEye } from 'react-icons/fi';
import { IoCutOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { inter, lora } from '@/lib/fonts';
import { splitService } from '@/helper/splitHelper';

const SplitPage = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [parts, setParts] = useState([{ from: '', to: '', url: '' }]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updatePart = (i: number, key: 'from' | 'to' | 'url', value: string) => {
    setParts(prev =>
      prev.map((part, idx) => (idx === i ? { ...part, [key]: value } : part))
    );
  };

  const addPart = () => setParts([...parts, { from: '', to: '', url: '' }]);
  const deletePart = (i: number) => setParts(parts.filter((_, idx) => idx !== i));

  const handleSplit = async () => {
    if (!fileUrl || !parts.every(p => p.from && p.to && p.url)) return;

    setLoading(true);
    try {
      const body = {
        input: fileUrl,
        outputs: parts,
      };

      const res = await splitService.split(body); 
      console.log("Split Response:", res);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert('Split failed');
    } finally {
      setLoading(false);
    }
  };

  const goToSplitViewPage = () => {
    router.push('/split/viewSplitFiles');
  };

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6">
      <div className='space-y-2'>
        <h1 className={`${inter.className} text-3xl text-gray-800 font-bold mb-2`}>
          Split File
        </h1>
        <p className={`${lora.className} text-muted-foreground mb-4`}>
          Split a file into parts based on page ranges
        </p>
        <Label className={`${inter.className} pb-2`}>Original File URL</Label>
        <Input
          placeholder="https://example.com/file.pdf"
          value={fileUrl}
          onChange={e => setFileUrl(e.target.value)}
        />
        <p className={`${lora.className} pb-2`}>Define the page ranges for each output file:</p>
      </div>

      <div className="space-y-8 pt-2">
        {parts.map((part, i) => (
          <div key={i} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex gap-2 flex-1">
                <div className="flex-1">
                  <Label className={`${inter.className} pb-2`}>From Page</Label>
                  <Input type="number" value={part.from}
                    onChange={e => updatePart(i, 'from', e.target.value)} placeholder="e.g. 1" />
                </div>
                <div className="flex items-center px-2 mt-6">to</div>
                <div className="flex-1">
                  <Label className={`${inter.className} pb-2`}>To Page</Label>
                  <Input type="number" value={part.to}
                    onChange={e => updatePart(i, 'to', e.target.value)} placeholder="e.g. 5" />
                </div>
              </div>
              {i > 0 && (
                <Button variant="destructive" size="icon" onClick={() => deletePart(i)}>
                  <FaRegTrashAlt className="w-6 h-6" />
                </Button>
              )}
            </div>
            <div>
              <Label className={`${inter.className} pb-3`}>Split File URL</Label>
              <Input
                value={part.url}
                onChange={e => updatePart(i, 'url', e.target.value)}
                placeholder="https://example.com/part.pdf"
                className="h-10 text-base"
              />
            </div>
          </div>
        ))}
        <Button className={`${inter.className} flex bg-gray-100 items-center gap-2`} onClick={addPart} variant="ghost">
          <FiPlus className="h-4 w-4" />
          Add another part
        </Button>
      </div>

      <div className="flex gap-4 mt-10 flex-wrap">
        <Button className={`${inter.className}`} onClick={handleSplit} disabled={loading}>
          <IoCutOutline className="mr-2 h-4 w-4" />
          {loading ? 'Splitting...' : 'Split File'}
        </Button>

        <Button className={`${inter.className}`} variant="outline" onClick={goToSplitViewPage}>
          <FiEye className="h-4 w-4" />
          View Split Files
        </Button>
      </div>

      {result?.outputs?.length > 0 && (
        <div className="mt-8 border border-green-200 bg-green-50 p-6 rounded-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Split successful</h2>
          <ul className="list-disc list-inside text-sm mb-4">
            {result.outputs.map((file: any, idx: number) => (
              <li key={idx}>
                Pages {file.from}–{file.to}:&nbsp;
                <a href={file.url} target="_blank" className="text-blue-600 underline">{file.url}</a>
              </li>
            ))}
          </ul>
          <Button onClick={goToSplitViewPage}>Go to Split Files</Button>
        </div>
      )}
    </section>
  );
};

export default SplitPage;
