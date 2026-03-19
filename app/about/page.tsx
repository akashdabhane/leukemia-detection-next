export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title Section */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl shadow-indigo-100/40 dark:shadow-none transition-all">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4 cursor-default">
          About Leukemia
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          Leukemia is a type of cancer that affects the blood and bone marrow, characterized by the overproduction of abnormal white blood cells. These cells can interfere with the body's ability to produce healthy blood cells, leading to a range of health issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Types Card */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-none hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm">1</span>
            Types of Leukemia
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Acute Lymphoblastic Leukemia (ALL)</span>
              <span className="text-sm">A fast-growing leukemia that affects lymphoid cells, most common in children.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Acute Myeloid Leukemia (AML)</span>
              <span className="text-sm">A fast-growing leukemia that affects myeloid cells, common in adults.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Chronic Lymphocytic Leukemia (CLL)</span>
              <span className="text-sm">A slow-growing leukemia that affects lymphoid cells, typically seen in older adults.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Chronic Myeloid Leukemia (CML)</span>
              <span className="text-sm">A slow-growing leukemia that affects myeloid cells, associated with a genetic mutation.</span>
            </li>
          </ul>
        </div>

        {/* Symptoms Card */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-none hover:border-purple-200 dark:hover:border-purple-900 transition-all">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm">2</span>
            Symptoms
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Common symptoms of leukemia include:</p>
          <ul className="grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Fatigue and weakness</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Frequent infections</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Easy bruising or bleeding</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Weight loss</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Swollen lymph nodes</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Fever or chills</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Persistent headaches</li>
          </ul>
        </div>

        {/* Causes Card */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-none hover:border-blue-200 dark:hover:border-blue-900 transition-all">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">3</span>
            Causes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">The exact cause of leukemia is unknown, but several factors may increase the risk, including:</p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
              <span>Genetic predisposition</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
              <span>Exposure to radiation or chemicals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
              <span>Certain genetic disorders (e.g., Down syndrome)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
              <span>Smoking</span>
            </li>
          </ul>
        </div>

        {/* Diagnosis & Prognosis Card */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-none hover:border-teal-200 dark:hover:border-teal-900 transition-all">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm">4</span>
            Diagnosis & Prognosis
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">Leukemia is diagnosed through a combination of tests, including:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-teal-500">•</span> Blood tests to check for abnormal cell counts</li>
                <li className="flex items-start gap-2"><span className="text-teal-500">•</span> Bone marrow biopsy to analyze the cells</li>
                <li className="flex items-start gap-2"><span className="text-teal-500">•</span> Cytogenetic analysis to detect genetic changes</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm">
                The prognosis for leukemia varies based on factors such as age, type of leukemia, and overall health. Early diagnosis and advances in treatment have improved survival rates significantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800/50 rounded-2xl p-6 text-center shadow-inner">
        <p className="text-indigo-800 dark:text-indigo-200 font-medium">
          If you or someone you know is experiencing symptoms of leukemia, it is essential to seek medical advice for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}
