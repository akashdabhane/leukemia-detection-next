"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DocumentTextIcon, BeakerIcon, ExclamationTriangleIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function PrescriptionSuggestionPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patient: {
      age: "",
      gender: "male",
      weight: "",
    },
    symptoms: "",
    duration: "",
    vitals: {
      temperature: "",
      bp: "",
      spo2: "",
    },
    medical_history: "",
    current_medications: "",
    allergies: "",
    lifestyle: {
      smoking: false,
      alcohol: false,
    },
    notes: "",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await fetch("/api/prescriptions");
      if (!res.ok) return;
      const data = await res.json();
      setHistory(data.prescriptions || []);
    } catch (e) {
      console.error("Failed to load prescription history", e);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadHistory();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-gray-300 text-sm">Checking authentication...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    // Redirect effect is already in progress; just show nothing here.
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false;

    if (name.startsWith("patient.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        patient: { ...formData.patient, [field]: value },
      });
    } else if (name.startsWith("vitals.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        vitals: { ...formData.vitals, [field]: value },
      });
    } else if (name.startsWith("lifestyle.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        lifestyle: { ...formData.lifestyle, [field]: isCheckbox ? checked : value === "true" },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Process some fields into arrays if needed
      const processedData = {
        ...formData,
        symptoms: formData.symptoms.split(",").map((s) => s.trim()).filter(Boolean),
        medical_history: formData.medical_history.split(",").map((s) => s.trim()).filter(Boolean),
        current_medications: formData.current_medications.split(",").map((s) => s.trim()).filter(Boolean),
        allergies: formData.allergies.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const res = await fetch("/api/prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to generate suggestion");

      setResult(data.data);

      // Refresh history so the sidebar updates with the latest entry
      await loadHistory();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 -mx-4 md:-mx-8">
      {/* Sidebar: Prescription history */}
      <aside className="w-64 h-screen hidden md:flex flex-col fixed top-18 self-start bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/70 dark:bg-gray-950/70">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">History</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 text-sm">
          {historyLoading && (
            <p className="text-xs text-gray-500 px-2 py-1">Loading...</p>
          )}
          {history.length === 0 && !historyLoading && (
            <p className="text-xs text-gray-500 px-2 py-1">No prescriptions yet.</p>
          )}
          {history.map((item) => (
            <button
              key={item._id}
              onClick={() => router.push(`/prescription/${item._id}`)}
              className="w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors truncate bg-white/70 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className="block truncate">
                {item.input?.symptoms || "Prescription"}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main prescription form */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto w-full py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4 h-12">
              AI Prescription Suggestion
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Enter patient details to get AI-powered suggestions for possible conditions, basic medicine dosages, and precautions.
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium border border-yellow-200 dark:border-yellow-800">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              This is AI-generated and not a substitute for professional medical advice.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Patient Basic Info */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 font-semibold">1</span>
                    Patient Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                      <input
                        type="number"
                        name="patient.age"
                        required
                        value={formData.patient.age}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                      <select
                        name="patient.gender"
                        value={formData.patient.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</label>
                      <input
                        type="number"
                        name="patient.weight"
                        required
                        value={formData.patient.weight}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Chief Complaint */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 font-semibold">2</span>
                    Chief Complaint
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Symptoms (comma separated)</label>
                      <input
                        type="text"
                        name="symptoms"
                        required
                        placeholder="e.g., Fever, Cough, Headache"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        required
                        placeholder="e.g., 3 days, 1 week"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Vitals */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 font-semibold">3</span>
                    Vital Signs (Optional)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Temperature (°F)</label>
                      <input
                        type="number"
                        name="vitals.temperature"
                        value={formData.vitals.temperature}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Blood Pressure</label>
                      <input
                        type="text"
                        name="vitals.bp"
                        placeholder="120/80"
                        value={formData.vitals.bp}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SpO2 (%)</label>
                      <input
                        type="number"
                        name="vitals.spo2"
                        value={formData.vitals.spo2}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: History & Allergies */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 font-semibold">4</span>
                    History & Allergies
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Existing Diseases (comma separated)</label>
                      <input
                        type="text"
                        name="medical_history"
                        placeholder="e.g., Asthma, Diabetes"
                        value={formData.medical_history}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Allergies (comma separated)</label>
                      <input
                        type="text"
                        name="allergies"
                        placeholder="e.g., Penicillin, Peanuts"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Medications (comma separated)</label>
                      <input
                        type="text"
                        name="current_medications"
                        placeholder="e.g., Paracetamol"
                        value={formData.current_medications}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: Additional Info */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 font-semibold">5</span>
                    Additional Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-6">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="lifestyle.smoking"
                          checked={formData.lifestyle.smoking}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Smoker</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="lifestyle.alcohol"
                          checked={formData.lifestyle.alcohol}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Alcohol Use</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Doctor Notes / Additional Context</label>
                      <textarea
                        name="notes"
                        rows={4}
                        placeholder="Patient reports severe pain at night..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 py-3 px-4 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? "Generating Prescription..." : "Get AI Prescription Suggestion"}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-12 space-y-8 animate-fade-in-up">
                  <div className="border-t-2 border-indigo-100 dark:border-indigo-900/50 pt-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 mb-8 flex items-center">
                      <DocumentTextIcon className="w-10 h-10 mr-4 text-indigo-500" />
                      AI Suggested Prescription
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Conditions */}
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/50">
                        <h3 className="text-xl font-bold text-orange-900 dark:text-orange-300 mb-4 flex items-center">
                          <HeartIcon className="w-6 h-6 mr-2 text-orange-500" />
                          Possible Conditions
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-orange-800 dark:text-orange-400">
                          {result?.conditions?.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Precautions */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center">
                          <ExclamationTriangleIcon className="w-6 h-6 mr-2 text-blue-500" />
                          Precautions
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-400">
                          {result?.precautions?.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Medicines */}
                    <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                      <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-6 flex items-center">
                        <BeakerIcon className="w-6 h-6 mr-2 text-indigo-500" />
                        Suggested Medicines
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-indigo-200 dark:border-indigo-800">
                              <th className="pb-3 text-indigo-800 dark:text-indigo-400 font-semibold">Medicine</th>
                              <th className="pb-3 text-indigo-800 dark:text-indigo-400 font-semibold">Dosage</th>
                              <th className="pb-3 text-indigo-800 dark:text-indigo-400 font-semibold">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-indigo-100 dark:divide-indigo-800/50">
                            {result?.medicines?.map((med: any, index: number) => (
                              <tr key={index} className="text-indigo-900 dark:text-indigo-300">
                                <td className="py-4 font-medium">{med.name}</td>
                                <td className="py-4">{med.dosage}</td>
                                <td className="py-4">{med.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* When to consult */}
                    <div className="mt-8 bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800/50">
                      <h3 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">When to Consult a Doctor</h3>
                      <p className="text-red-800 dark:text-red-400">{result?.whenToConsult}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
