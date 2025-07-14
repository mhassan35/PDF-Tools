'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiPlus, FiEye } from 'react-icons/fi';
import { IoCutOutline } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa";

import { inter, lora, roboto } from '@/lib/fonts';

const SplitPage = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [parts, setParts] = useState([
    { from: '', to: '', url: '' },
    { from: '', to: '', url: '' }
  ]);
  const [result, setResult] = useState<typeof parts | null>(null);
  const updatePart = (i: number, key: 'from' | 'to' | 'url', value: string) => {
    setParts(prev =>
      prev.map((part, idx) => (idx === i ? { ...part, [key]: value } : part))
    );
  };

  const addPart = () => setParts([...parts, { from: '', to: '', url: '' }]);
  const deletePart = (i: number) => setParts(parts.filter((_, idx) => idx !== i));
  const handleSplit = () => {
    if (fileUrl && parts.every(p => p.from && p.to && p.url)) {
      setResult(parts);
    }
  };

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6">
      <div className='space-y-2'>
        <h1 className={`${inter.className} text-3xl font-bold mb-2`}>
          Split File
        </h1>
        <p className={`${lora.className} text-muted-foreground mb-4`}>
          Split a file into parts based on page ranges
        </p>
        <Label className={`${inter.className} pb-2`}>
          Original File URL
        </Label>
        <Input placeholder="https://example.com/file.pdf" value={fileUrl} onChange={e => setFileUrl(e.target.value)}/>
        <h1 className={`${inter.className} pb-1 font-bold`}>
          Page Ranges:
        </h1>
        <p className={`${lora.className} pb-6 `}>
          Define the page ranges for each output file
        </p>
        </div>
      {/* Parts */}
      <div className="space-y-8 pt-2">

        {parts.map((part, i) => (
          <div key={i} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex gap-2 flex-1">
                <div className="flex-1">
                  <Label className={`${inter.className} pb-2`} >From Page</Label>
                  <Input type="number" value={part.from}
                  onChange={e => updatePart(i, 'from', e.target.value)} placeholder="e.g. 1" />
                </div>
                <div className="flex items-center px-2 mt-6">to</div>
                <div className="flex-1">
                  <Label className={`${inter.className} pb-2`} >To Page</Label>
                  <Input type="number" value={part.to} onChange={e => updatePart(i, 'to', e.target.value)}
                  placeholder="e.g. 5"/>
                </div>
              </div>
              {i > 1 && (
                <Button variant="destructive" size="icon" onClick={() => deletePart(i)}>
                  <FaRegTrashAlt className="w-6 h-6" />
                </Button>
              )}
            </div>

            <div>
              <Label className={`${inter.className} pb-2`} >Split File URL</Label>
              <Input value={part.url} onChange={e => updatePart(i, 'url', e.target.value)} 
              placeholder="https://example.com/part.pdf" className="h-10 text-base"/>
            </div>
          </div>
        ))}
        <Button className={`${inter.className}flex bg-gray-100 items-center gap-2`} onClick={addPart} variant="ghost">
          <FiPlus className="h-4 w-4" />
          Add another part
        </Button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-10 flex-wrap">
        <Button className={`${inter.className}`} onClick={handleSplit}>
          <IoCutOutline className="mr-2 h-4 w-4" />
          Split File
        </Button>
          <Button className={`${inter.className}`} variant="outline" 
            onClick={() => alert(JSON.stringify(result, null, 2))}>
            <FiEye className="h-4 w-4" />
            View Split Files
          </Button>

      </div>
    </section>
  );
};

export default SplitPage;
