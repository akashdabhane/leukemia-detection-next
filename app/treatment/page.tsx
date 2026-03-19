import {
  ShieldCheckIcon,
  BeakerIcon,
  SunIcon,
  SparklesIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

export default function Treatment() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title Section */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl shadow-rose-100/40 dark:shadow-none text-center">
        <div className="inline-flex justify-center items-center p-3 bg-rose-100 dark:bg-rose-900/30 rounded-2xl mb-4">
          <ShieldCheckIcon className="w-8 h-8 text-rose-600 dark:text-rose-400" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-orange-500 dark:from-rose-400 dark:to-orange-400 mb-4 cursor-default">
          Basic Treatment Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Treatment for leukemia varies significantly based on the type of leukemia, the patient's age, and overall health. Medical professionals combine these methodologies to provide the best possible outcome.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chemotherapy */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:border-red-200 dark:hover:border-red-900/50 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <BeakerIcon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chemotherapy</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p><strong className="text-gray-800 dark:text-gray-200">Overview:</strong> The primary treatment for many types of leukemia. It uses strong drugs to target and kill cancer cells in the blood and bone marrow.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Process:</strong> Treatment often occurs in cycles, with a combination of drugs administered over several months.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Side Effects:</strong> Common side effects include fatigue, nausea, hair loss, and increased susceptibility to infections.</p>
          </div>
        </div>

        {/* Targeted Therapy */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:border-blue-200 dark:hover:border-blue-900/50 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Targeted Therapy</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p><strong className="text-gray-800 dark:text-gray-200">Overview:</strong> Focuses on specific abnormalities in cancer cells, like proteins or genetic mutations, that promote growth.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Common Drugs:</strong> Medications such as tyrosine kinase inhibitors (TKIs) can be effective, particularly for CML.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Advantages:</strong> Typically has fewer side effects than chemotherapy, targeting cancer cells while sparing healthy ones.</p>
          </div>
        </div>

        {/* Radiation Therapy */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:border-orange-200 dark:hover:border-orange-900/50 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <SunIcon className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Radiation Therapy</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p><strong className="text-gray-800 dark:text-gray-200">Purpose:</strong> Uses high-energy beams to kill leukemia cells or reduce the size of tumors interfering with organs.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Application:</strong> Used to treat localized areas where leukemia cells are concentrated.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Combination:</strong> May be used with chemotherapy or before a stem cell transplant to prepare the body.</p>
          </div>
        </div>

        {/* Immunotherapy */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Immunotherapy</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p><strong className="text-gray-800 dark:text-gray-200">Overview:</strong> Leverages the body's immune system to identify and attack cancer cells more effectively.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">CAR-T Cell Therapy:</strong> A newer form involving modifying the patient's T-cells to recognize and destroy leukemia cells.</p>
            <p><strong className="text-gray-800 dark:text-gray-200">Benefits:</strong> Highly personalized treatment, effective for certain leukemias resistant to traditional routes.</p>
          </div>
        </div>

        {/* Stem Cell Transplant */}
        <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-900/40 border border-indigo-100 dark:border-indigo-800/50 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ArrowPathRoundedSquareIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stem Cell Transplant</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-xl">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Purpose</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Aims to replace diseased bone marrow with healthy stem cells to produce normal blood cells.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-xl">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Process</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">After high doses of chemo or radiation, healthy stem cells are infused into the bloodstream.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-xl">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">Recovery</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Has the potential to cure, but requires extensive recovery. Used for patients in remission.</p>
            </div>
          </div>
        </div>

        {/* Bottom Dual Grid - Supportive & Experimental */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* Supportive Care */}
          <div className="bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <HeartIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <h3 className="font-bold text-teal-900 dark:text-teal-300">Supportive Care</h3>
            </div>
            <div className="space-y-3 text-sm text-teal-900/80 dark:text-teal-100/70">
              <p><strong className="text-teal-900 dark:text-teal-300">Symptom Management:</strong> Addresses symptoms like pain relief, blood transfusions, and antibiotics.</p>
              <p><strong className="text-teal-900 dark:text-teal-300">Psychological Support:</strong> Maintaining a balanced diet, managing stress, and addressing emotional needs are crucial.</p>
            </div>
          </div>

          {/* Experimental and Emerging */}
          <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <LightBulbIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h3 className="font-bold text-amber-900 dark:text-amber-300">Experimental Therapies</h3>
            </div>
            <div className="space-y-3 text-sm text-amber-900/80 dark:text-amber-100/70">
              <p><strong className="text-amber-900 dark:text-amber-300">Clinical Trials:</strong> Patients may access innovative treatments testing new methodologies to improve outcomes.</p>
              <p><strong className="text-amber-900 dark:text-amber-300">Genetic Testing:</strong> Expanding knowledge of molecular profiles leads to highly tailored treatment approaches.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
