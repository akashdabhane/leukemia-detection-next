"use client";

import { useState } from "react";
import ModelSelector from "@/components/ModelSelector";
import ImageUploader from "@/components/ImageUploader";
import ResultCard from "@/components/ResultCard";
import { ArrowPathIcon, ShieldCheckIcon, CpuChipIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [model, setModel] = useState("EfficientNetB0");
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handlePredict = async () => {
    if (!image) return;

    setIsSynthesizing(true);
    setResult(null);

    // Simulated network delay for the UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("model", model);

      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      setResult(data.result);
    } catch (e: any) {
      console.error(e);
      setResult("Diagnostic Unavailable. Retry Request.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* Left panel - Intro */}
      <div className="lg:col-span-5 flex flex-col justify-start pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-sm border border-indigo-100/50 dark:border-indigo-800/50 w-max">
          <CpuChipIcon className="w-4 h-4" />
          Neural Engine Active
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl mb-6 leading-tight">
          Microscopic <br className="hidden lg:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Cell Analysis
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Upload blood smear imagery for rapid hematological screening. Powered by deep convolutional neural networks and upcoming Gemini multimodal reasoning.
        </p>

        <div className="border border-indigo-100/50 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl p-6 hidden lg:block backdrop-blur-sm shadow-inner shadow-white/50 dark:shadow-none">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg text-indigo-700 dark:text-indigo-400">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">Secure Protocol</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            All visual samples are processed ephemerally. Images are instantly purged post-analysis to prioritize PHI security and clinical compliance.
          </p>
        </div>
      </div>

      {/* Right panel - Core App */}
      <div className="lg:col-span-7">
        <div className="bg-white/80 dark:bg-gray-900/80 p-8 shadow-2xl shadow-indigo-100/40 dark:shadow-none rounded-[2.5rem] border border-gray-100/80 dark:border-gray-800 backdrop-blur-xl relative z-10">
          
          <ModelSelector model={model} setModel={setModel} />
          <ImageUploader setImage={setImage} />

          <button
            onClick={handlePredict}
            disabled={!image || isSynthesizing}
            className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform shadow-md shadow-indigo-200/50 dark:shadow-none
              ${(!image || isSynthesizing) 
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border outline-none" 
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] text-white hover:shadow-lg hover:shadow-indigo-300 dark:hover:shadow-none cursor-pointer"
              }
            `}
          >
            {isSynthesizing ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin text-indigo-400 dark:text-indigo-500" />
                <span className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">Synthesizing Data...</span>
              </>
            ) : (
              <>
                <CpuChipIcon className="w-6 h-6" />
                <span className="tracking-wide">Initiate Diagnostics</span>
              </>
            )}
          </button>

          {/* Gemini Experimental Placeholder */}
          {result && model === "Gemini" && (
            <div className="mt-6 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 animate-pulse">
               <div className="h-4 bg-purple-200 dark:bg-purple-800/50 rounded w-3/4 mb-3"></div>
               <div className="h-4 bg-purple-200 dark:bg-purple-800/50 rounded w-1/2"></div>
            </div>
          )}

          {result && model !== "Gemini" && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}
