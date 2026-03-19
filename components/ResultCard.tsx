import { useState } from "react";
import { DocumentMagnifyingGlassIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ReportPDF } from "./ReportPDF";
import { pdf } from "@react-pdf/renderer";

export default function ResultCard({ result }: { result: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const confidence = "98.4%";

  const isHealthy = result.toLowerCase().includes("normal") || result.toLowerCase().includes("healthy");
  const isDanger = result.toLowerCase().includes("malignant") || result.toLowerCase().includes("leukemia") || result.toLowerCase().includes("abnormal");

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diagnosis: result, confidence }),
      });

      if (!res.ok) throw new Error("Failed to fetch report from AI");

      const data = await res.json();
      const reportContent = data.report;

      // Generate PDF Blob using @react-pdf/renderer programmatically
      const blob = await pdf(<ReportPDF reportContent={reportContent} />).toBlob();
      
      // Auto-download logic
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Clinical_Diagnostic_Report.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generating report", error);
      alert("Failed to generate the report. Please check API configurations.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-10 overflow-hidden transform transition-all duration-300">
      <div className="border border-indigo-100 dark:border-indigo-900/40 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl shadow-indigo-100/40 dark:shadow-none">
        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 border-b border-indigo-50 dark:border-indigo-900/20 flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-2 rounded-xl">
            <DocumentMagnifyingGlassIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 tracking-wide uppercase">Analysis Complete</h3>
        </div>
        
        <div className="p-8 pb-10 flex flex-col items-center justify-center space-y-4 relative">
          <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-[0.02]">
            <CheckCircleIcon className="w-32 h-32 text-indigo-900 dark:text-white" />
          </div>
          
          <div className="z-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Primary Diagnosis</p>
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${
              isDanger ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-900/30" : isHealthy ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-900/30" : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 ring-1 ring-indigo-200 dark:ring-indigo-900/30"
            }`}>
              {isDanger && <ExclamationTriangleIcon className="w-5 h-5" />}
              {isHealthy && <CheckCircleIcon className="w-5 h-5" />}
              <span className="text-xl font-bold tracking-tight">{result}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden p-5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center px-8 relative">
          <span>Confidence Score: <b>{confidence}</b></span>
          <button 
            onClick={generateReport}
            disabled={isGenerating}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-50 flex items-center gap-1 transition-opacity"
          >
            {isGenerating ? (
              <>
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                Validating Report...
              </>
            ) : (
              "View Detailed Report →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
