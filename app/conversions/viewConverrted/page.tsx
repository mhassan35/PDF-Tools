'use client';
import { useEffect, useState } from 'react';
import { apiBase } from '@/lib/api';
import { inter, lora } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { FiDownload, FiEye } from 'react-icons/fi';

const ConvertedFilesPage = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConvertedFiles = async () => {
      try {
        const data = await apiBase('/conversions');
        setFiles(data);
      } catch (err) {
        alert('Failed to load converted files.');
      } finally {
        setLoading(false);
      }
    };

    fetchConvertedFiles();
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className={`${inter.className} text-3xl text-gray-800 font-bold mb-2`}>Converted Files</h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>
        All your previously converted files are listed below.
      </p>

      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && (
        <p className="text-gray-500">No converted files found.</p>
      )}

      {!loading && files.length > 0 && (
        <div className="space-y-6">
          {files.map((file, idx) => (
            <div key={idx} className="border text-gray-800 border-gray-300 rounded-lg shadow-sm p-5 bg-white space-y-5">
              {/* Original File */}
              <div>
                <p className="text-xl font-semibold flex text-gray-800 mb-2">Conversions {file.id}:
                      <h1 className='uppercase pl-1'>
                        ({file.file_type}) to ({file.target_type})
                    </h1>
                </p>
                <p className='pb-1 flex'>
                    Original File: 
                    <h1 className='uppercase pl-1' >
                        ({file.file_type})
                    </h1>
                </p>
                <div className="bg-gray-100 px-4 py-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-gray-800 break-all">{file.file_url}</span>
                  <div className='flex gap-2' >
                    <Button className={`${inter.className}`} variant="outline">
                      <FiEye className="w-4 h-4" />View Original
                    </Button>
                <Button className={`${inter.className}`} variant="default"
                    onClick={() => window.open(file.output_file_url, '_blank')}>
                      <FiDownload className="w-4 h-4" />
                        Download
                    </Button>
                  </div>
                </div>
              </div>
              {/* Converted File */}
              <div className="border-t pt-4">
                <p className="flex text-gray-800 mb-1">
                    Converted:
                    <h1 className='uppercase pl-1'>
                        ({file.target_type})
                    </h1>
                </p>
                <div className="bg-gray-100 px-4 py-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-gray-800 break-all">{file.output_file_url}</span>
                  <div className="flex gap-2">
                    <Button className={`${inter.className}`} variant="outline" onClick={() => window.open(file.output_file_url, '_blank')}>
                      <FiEye className="w-4 h-4" />
                      View Converted
                    </Button>
                    <Button className={`${inter.className}`} variant="default"
                    onClick={() => window.open(file.output_file_url, '_blank')}>
                      <FiDownload className="w-4 h-4" />
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

export default ConvertedFilesPage;
