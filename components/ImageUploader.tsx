import { useState, useRef } from "react";
import { PhotoIcon, CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ImageUploader({ setImage }: any) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };
  const handleDragLeave = () => setIsDragActive(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="mb-8">
      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <PhotoIcon className="w-5 h-5 text-indigo-500" />
        Upload Smear Scan
      </label>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 cursor-pointer flex flex-col items-center justify-center transition-all duration-200 group relative overflow-hidden
            ${isDragActive ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-gray-800"}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
          
          <div className="bg-white dark:bg-gray-900 p-4 rounded-full shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 mb-4 group-hover:scale-110 transition-transform">
            <CloudArrowUpIcon className="w-8 h-8 text-indigo-500" />
          </div>
          
          <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-1">
            Click to upload <span className="font-normal text-gray-500 dark:text-gray-400">or drag and drop</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">SVG, PNG, JPG (max. 10MB)</p>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      ) : (
        <div className="relative group rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm aspect-video bg-gray-900 dark:bg-black flex items-center justify-center isolation-auto">
          <img
            src={preview}
            alt="Scan Preview"
            className="object-contain h-full w-full backdrop-blur-3xl group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors"
              title="Replace Image"
            >
              <CloudArrowUpIcon className="w-6 h-6" />
            </button>
            <button
              onClick={removeImage}
              className="bg-red-500/80 hover:bg-red-500 backdrop-blur-sm p-3 rounded-full transition-colors"
              title="Remove Image"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
      )}
    </div>
  );
}
