'use client';

import { useEffect, useState } from 'react';
import { inter, lora } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { FiDownload, FiEye } from 'react-icons/fi';
import { splitService } from '@/helper/splitHelper'; 

interface SplitFile {
  id: number;
  file_name: string | null;
  page_ranges: [number, number][];
  split_files: string[] | null;
}

const SplitFilesPage = () => {
  const [files, setFiles] = useState<SplitFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSplitFiles = async () => {
      try {
        const data = await splitService.getAll();
        console.log('Fetched split files:', data);
        setFiles(data);
      } catch (err) {
        console.error('API Error:', err);
        alert('Failed to load split files.');
      } finally {
        setLoading(false);
      }
    };

    fetchSplitFiles();
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className={`${inter.className} text-3xl text-gray-800 font-bold mb-2`}>
        Split Files
      </h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>
        All your previously split files are listed below.
      </p>

      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && (
        <p className="text-gray-500">No split files found.</p>
      )}

      {!loading && files.length > 0 && (
        <div className="space-y-6">
          {files.map((file, idx) => {
            const originalFileName =
              file.file_name?.split('/').pop() || 'Unknown File';

            return (
              <div  key={idx}
                className="border border-gray-300 rounded-lg shadow-sm p-5 bg-white space-y-5"
              >
                {/* Original File */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Original File
                  </h2>
                  <div className="bg-gray-100 px-4 py-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-gray-800 break-all">
                      {originalFileName}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() =>
                          file.file_name && window.open(file.file_name, '_blank')
                        }
                      >
                        <FiEye className="w-4 h-4" /> View
                      </Button>
                      <Button
                        variant="default"
                        onClick={() =>
                          file.file_name && window.open(file.file_name, '_blank')
                        }
                      >
                        <FiDownload className="w-4 h-4" /> Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Split Files */}
                <div className="border-t pt-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Split Parts
                  </h2>
                  <div className="space-y-2">
                    {file.split_files?.map((url, i) => {
                      const partName = url?.split('/').pop() || `Part ${i + 1}`;
                      const range = file.page_ranges?.[i] || [0, 0];

                      return (
                        <div key={i}
                          className="bg-gray-100 px-4 py-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="text-gray-800">
                            Pages {range[0]} – {range[1]} ({partName})
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline"
                              onClick={() => url && window.open(url, '_blank')}>
                              <FiEye className="w-4 h-4" /> View
                            </Button>
                            <Button variant="default"
                              onClick={() => url && window.open(url, '_blank')}>
                              <FiDownload className="w-4 h-4" />Download
                            </Button>
                          </div>
                        </div>
                      );
                    }) || <p>No split files available.</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SplitFilesPage;
