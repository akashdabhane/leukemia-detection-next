"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { DocumentTextIcon, BeakerIcon, ExclamationTriangleIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function PrescriptionDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prescription, setPrescription] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const loadPrescription = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/prescriptions/${id}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load prescription");
        }
        const data = await res.json();
        setPrescription(data.prescription);
      } catch (e: any) {
        setError(e.message || "Failed to load prescription");
      } finally {
        setLoading(false);
      }
    };

    if (id && status === "authenticated") {
      loadPrescription();
    }
  }, [id, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 dark:text-gray-300 text-sm">Loading prescription...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  const input = prescription?.input || {};
  const result = prescription?.result || {};

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
            Prescription Details
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Created at {new Date(prescription.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => router.push("/prescription")}
          className="text-sm px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Back to form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center mb-4">
            <DocumentTextIcon className="w-7 h-7 mr-2 text-indigo-500" />
            Patient Input
          </h2>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Age:</span> {input.patient?.age}</p>
            <p><span className="font-semibold">Gender:</span> {input.patient?.gender}</p>
            <p><span className="font-semibold">Weight:</span> {input.patient?.weight} kg</p>
            <p><span className="font-semibold">Symptoms:</span> {input.symptoms}</p>
            <p><span className="font-semibold">Duration:</span> {input.duration}</p>
            <p><span className="font-semibold">Vitals:</span> Temp {input.vitals?.temperature}°F, BP {input.vitals?.bp}, SpO2 {input.vitals?.spo2}%</p>
            <p><span className="font-semibold">Medical History:</span> {input.medical_history}</p>
            <p><span className="font-semibold">Current Medications:</span> {input.current_medications}</p>
            <p><span className="font-semibold">Allergies:</span> {input.allergies}</p>
            <p><span className="font-semibold">Lifestyle:</span> {[
              input.lifestyle?.smoking ? "Smoker" : null,
              input.lifestyle?.alcohol ? "Alcohol use" : null,
            ].filter(Boolean).join(", ") || "Not specified"}</p>
            <p><span className="font-semibold">Notes:</span> {input.notes || "-"}</p>
          </div>
        </div>

        {/* AI Result summary */}
        <div className="space-y-6">
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
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
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
    </div>
  );
}
