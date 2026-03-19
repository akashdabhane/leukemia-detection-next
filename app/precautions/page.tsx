import {
  ShieldCheckIcon,
  HeartIcon,
  BeakerIcon,
  SparklesIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Precautions() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title Section */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl shadow-green-100/40 dark:shadow-none text-center">
        <div className="inline-flex justify-center items-center p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
          <ShieldCheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-4 cursor-default">
          Basic Precaution Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Proactive measures and early awareness are critical. While leukemia cannot always be completely prevented, adopting these health guidelines can significantly minimize risks and promote early detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regular Health Checkups */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <HeartIcon className="w-6 h-6 text-rose-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Regular Health Checkups</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Early screening can be crucial, especially for individuals with a family history of blood-related cancers or who are in high-risk categories. Regular blood tests and medical checkups help monitor health changes and can catch warning signs early.
          </p>
        </div>

        {/* Awareness of Symptoms */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <MagnifyingGlassIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Awareness of Symptoms</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Recognizing symptoms of leukemia early—such as fatigue, frequent infections, easy bruising, and unexplained weight loss—can prompt early diagnosis. If any symptoms persist, consult a healthcare provider immediately.
          </p>
        </div>

        {/* Healthy Lifestyle Choices */}
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 border border-emerald-100 dark:border-gray-700 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <SparklesIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Healthy Lifestyle Choices</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Balanced Diet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Consuming a diet rich in fruits, vegetables, whole grains, and lean proteins helps strengthen the immune system, making the body more resilient.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Avoid Harmful Habits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tobacco and excessive alcohol consumption are linked to various cancers, including leukemia. Avoiding these reduces risk.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 p-5 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Physical Activity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Regular exercise boosts immunity, promotes circulation, and supports overall health, beneficial for preventing numerous health issues.</p>
            </div>
          </div>
        </div>

        {/* Minimizing Chemical Exposure */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <BeakerIcon className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Minimizing Chemical Exposure</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Exposure to certain chemicals, such as benzene (found in gasoline and pesticides), has been linked to a higher risk of leukemia. Use caution around such chemicals, follow safety guidelines, and avoid exposure where possible.
          </p>
        </div>

        {/* Genetic Counseling */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <UserGroupIcon className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Genetic Counseling</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            For those with a family history of leukemia or other cancers, genetic counseling and testing may help assess risk. Knowing one's genetic predisposition can guide early detection and preventive measures.
          </p>
        </div>

        {/* Stress & Screening (Bottom row) */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 p-6 rounded-2xl">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3">Routine Screening Tools & Innovations</h3>
            <p className="text-indigo-800/80 dark:text-indigo-300/80 text-sm">
              Leveraging modern diagnostic tools, such as automated blood smear analysis with deep learning models, can streamline leukemia screening. Our project aims to assist healthcare providers by offering an efficient tool for identifying leukemia subtypes and supporting early detection efforts.
            </p>
          </div>
          
          <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-6 rounded-2xl">
            <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-3">Stress Management & Mental Health</h3>
            <p className="text-orange-800/80 dark:text-orange-300/80 text-sm">
              High-stress levels can weaken the immune system over time. Practicing relaxation techniques, maintaining social connections, and seeking mental health support when needed can strengthen overall well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
