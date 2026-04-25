import { ChevronDownIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function ModelSelector({ model, setModel }: any) {
  const models = [
    { id: "MobileNetV2", label: "MobileNet V2" },
    // { id: "EfficientNetB0", label: "EfficientNet B0" },
    // { id: "ResNet50", label: "ResNet 50 (Pro)" },
  ];

  return (
    <div className="mb-8">
      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <SparklesIcon className="w-5 h-5 text-indigo-500" />
        Diagnostic Engine
      </label>

      <div className="relative group">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 py-3.5 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium cursor-pointer"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-focus-within:text-indigo-500">
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Select highest tier for enhanced cellular analysis algorithms.
      </p>
    </div>
  );
}
