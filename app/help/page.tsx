import {
  InformationCircleIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  ChartBarIcon,
  BeakerIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Help() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title Section */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl shadow-blue-100/40 dark:shadow-none text-center">
        <div className="inline-flex justify-center items-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
          <InformationCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4 cursor-default">
          Help & Documentation
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Welcome to the support center. Find everything you need to understand how our platform categorizes blood smear images, guides on usage, and frequently asked questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          
          {/* About the Platform */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              About the Platform
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
              This platform is designed to assist in the preliminary screening for <strong>B-cell Acute Lymphoblastic Leukemia (B-ALL)</strong> by analyzing blood smear images. Using advanced deep learning algorithms, the platform categorizes blood smear images into four classes:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 ml-4 font-medium">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Benign (non-leukemic)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Early Pre-B</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Pre-B</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Pro-B</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm italic">
              These categories help in the early detection and differentiation of leukemia types, facilitating timely medical intervention.
            </p>
          </div>

          {/* Understanding the Results */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border border-indigo-100 dark:border-gray-700 p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BeakerIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Understanding the Results
            </h2>
            <div className="space-y-4">
              <div className="bg-white/60 dark:bg-gray-800/80 p-4 rounded-xl">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-1">Benign</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Indicates that no leukemia cells are detected in the uploaded sample.</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/80 p-4 rounded-xl">
                <h3 className="font-semibold text-rose-700 dark:text-rose-400 mb-1">Early Pre-B, Pre-B, Pro-B</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">These labels represent various stages of B-cell development associated with B-ALL. If any of these are detected, it is recommended to seek further medical advice.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">

          {/* How to Use the Platform */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
              How to Use the Platform
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CloudArrowUpIcon className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">Upload Image</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Upload a clear blood smear slide (JPEG/PNG) meeting quality guidelines.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CpuChipIcon className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">Analyze</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Click "Analyze" to begin processing. The platform provides results in seconds.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">Interpret Results</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">View the categorized result. If malignant, consult a medical professional immediately.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <QuestionMarkCircleIcon className="w-6 h-6 text-gray-400" />
              FAQs
            </h2>
            <div className="space-y-4">
              <details className="group border-b border-gray-100 dark:border-gray-800 pb-3 cursor-pointer">
                <summary className="font-medium text-sm text-gray-800 dark:text-gray-200">What does this tool provide?</summary>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-2 border-l-2 border-indigo-200 dark:border-indigo-900">This tool offers preliminary insights by classifying blood smear images into specific categories relevant to leukemia. It does not replace professional diagnosis.</p>
              </details>
              <details className="group border-b border-gray-100 dark:border-gray-800 pb-3 cursor-pointer">
                <summary className="font-medium text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">Is my data secure? <ShieldCheckIcon className="w-4 h-4 text-green-500" /></summary>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-2 border-l-2 border-indigo-200 dark:border-indigo-900">Yes, any uploaded images are processed securely, and privacy protocols are in place to protect user information.</p>
              </details>
              <details className="group pb-1 cursor-pointer">
                <summary className="font-medium text-sm text-gray-800 dark:text-gray-200">What if my image quality is low?</summary>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-2 border-l-2 border-indigo-200 dark:border-indigo-900">Clear, high-resolution images are essential for accurate analysis. Please re-upload if image quality does not meet platform guidelines.</p>
              </details>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Support Banner */}
      <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <EnvelopeIcon className="w-10 h-10 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Contact Support</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-6 text-sm">
          If you encounter issues or need additional assistance, please reach out. Our support team is here to help ensure that you can use the platform effectively and get reliable preliminary results.
        </p>
        <a href="mailto:support@leukemiadetector.com" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
          support@leukemiadetector.com
        </a>
      </div>
    </div>
  );
}
