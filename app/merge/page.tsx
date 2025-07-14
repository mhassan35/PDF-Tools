'use client';

import React, { useState } from 'react';
// import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiPlus } from 'react-icons/fi';
import { IoGitMergeOutline } from 'react-icons/io5';
import { inter, lora } from '@/lib/fonts';
import { FaRegTrashAlt } from 'react-icons/fa';

const MergePage = () => {
  const [urls, setUrls] = useState(['', '']); 
  const [outputUrl, setOutputUrl] = useState('');
  const handleChange = (i: number, val: string) =>
    setUrls(urls.map((u, idx) => (i === idx ? val : u)));

  // for adding and delete inputs
  const addInput = () => setUrls([...urls, '']);
  const deleteInput = (i: number) => setUrls(urls.filter((_, idx) => idx !== i));


// const getUsers = async () => {
//   const res = await fetch('https://api.convertkr.com');
//   const data = await res.json();
//   return data;
// };

// const getPosts = async () => {
//   const posts = await apiFetch('/posts');
//   return posts;
// };

// const createPost = async (data: any) => {
//   const post = await apiFetch('/posts', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
//   return post;
// };

  return (
    <section className="w-full border border-gray-200 rounded-md max-w-3xl mx-auto p-6 ">
      {/* Header */}
      <h1 className={`${inter.className} text-3xl font-bold mb-2`}>Merge Files</h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>Combine multiple files into a single output.</p>

      {/* Url inputs */}
      <div className="space-y-5">
        {urls.map((url, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <Label className={`${inter.className} pb-2`}>File URL {i + 1}</Label>
              <Input className='border-gray-300' value={url} onChange={e => handleChange(i, e.target.value)} 
                placeholder="https://example.com/file.pdf"/>
            </div>
            {i > 1 && (
              <Button size="icon" variant="destructive" onClick={() => deleteInput(i)}>
                <FaRegTrashAlt className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {/* Button for adding another */}
        <Button className={`${inter.className} flex bg-gray-100 items-center gap-2`}
          onClick={addInput} variant="ghost">
          <FiPlus className="h-4 w-4" />
          Add another URL
        </Button>
        {/* Output Url */}
        <div>
          <Label className={`${inter.className} pb-2`} >Output URL</Label>
          <Input className='border-gray-300' value={outputUrl} onChange={e => setOutputUrl(e.target.value)}
            placeholder="https://example.com/merged/output.pdf" />
        </div>
      </div>
     {/* Merge and view mergeed Buttons  */}
      <div className="flex gap-4 mt-8 flex-wrap">
        <Button className={`${inter.className}`}>
          <IoGitMergeOutline className=" h-4 w-4" />
          Merge
        </Button>
          <Button className={`${inter.className} bg-gray-100`} variant="outline">
            View Merged Files
          </Button>
      </div>
    </section>
  );
};

export default MergePage;
