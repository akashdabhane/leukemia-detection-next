export default function Treatment() {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-xl shadow-indigo-100/40 dark:shadow-none">
      <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
        Basic Treatment Information
      </h1>

      <h2 className="font-semibold mt-4 text-gray-900 dark:text-gray-200">Chemotherapy</h2>
      <p className="text-gray-700 dark:text-gray-400">Uses drugs to kill cancer cells.</p>

      <h2 className="font-semibold mt-4 text-gray-900 dark:text-gray-200">Targeted Therapy</h2>
      <p className="text-gray-700 dark:text-gray-400">Targets specific cancer cell mutations.</p>
    </div>
  );
}
