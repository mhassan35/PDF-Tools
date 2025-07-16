'use client';
import { useEffect, useState } from 'react';
import { apiBase } from '@/lib/api';
import { inter, lora } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { FiDownload, FiEye } from 'react-icons/fi';

const MergedFilesPage = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMergedFiles = async () => {
      try {
        const data = await apiBase('/merges');
        setFiles(data);
      } catch (err) {
        alert('Failed to load merged files.');
      } finally {
        setLoading(false);
      }
    };

    fetchMergedFiles();
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className={`${inter.className} text-3xl text-gray-800 font-bold mb-2`}>Merged Files</h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>All your previously merged files are listed below.</p>

      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && (
        <p className="text-gray-500">No merged files found.</p>
      )}

      {!loading && files.length > 0 && (
        <div className="space-y-6">
          {files.map((file, idx) => (
            <div key={idx} className="border border-gray-300 rounded-lg shadow-sm p-5 bg-white space-y-5">
              {/* Source Files Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Source Files</h2>
                <div className="space-y-2">
                  {Array.isArray(file.files) ? (
                    file.files.map((url: string, index: number) => {
                      const fileName = url.split('/').pop();
                      return (
                        <div key={index}
                          className="bg-gray-100 px-4 py-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="text-gray-800">{fileName}</span>
                          <div className="flex gap-2">
                            <Button className={`${inter.className}`} variant="outline" onClick={() => window.open(file.merged_file, '_blank')}>
                             <FiEye className='w-4 h-4'/>View
                            </Button>
                            <Button className={`${inter.className}`} variant="default" onClick={() => window.open(file.merged_file, '_blank')}>
                              <FiDownload className='w-4 h-4'/>
                                Download
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-600">{file.files}</p>
                  )}
                </div>
              </div>

              {/* Merged Result Section */}
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Merged File</h2>
                <div className="bg-gray-100 px-4 py-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-gray-800 break-all">
                    {file.merged_file.split('/').pop()}
                  </span>
                  <div className="flex gap-2">
                    <Button className={`${inter.className}`} variant="outline" onClick={() => window.open(file.merged_file, '_blank')}>
                     <FiEye className='w-4 h-4' />View
                    </Button>
                    <Button className={`${inter.className}`} variant="default" onClick={() => window.open(file.merged_file, '_blank')}>
                      <FiDownload className='w-4 h-4' />
                        Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MergedFilesPage;
