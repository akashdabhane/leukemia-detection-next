export default function About() {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-xl shadow-indigo-100/40 dark:shadow-none">
      <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">About Leukemia</h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Leukemia is a cancer of blood-forming tissues, affecting white blood cells.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">Types</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Acute Lymphoblastic Leukemia (ALL)</li>
        <li>Acute Myeloid Leukemia (AML)</li>
        <li>Chronic Lymphocytic Leukemia (CLL)</li>
        <li>Chronic Myeloid Leukemia (CML)</li>
      </ul>
    </div>
  );
}
