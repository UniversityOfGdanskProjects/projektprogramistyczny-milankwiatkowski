"use client";
import { useEffect, useState } from "react";

export default function KontoUzytkownika() {
  const [storageData, setStorageData] = useState<[string, string][]>([]);
  const [profilowe,foteczka] = useState<string | null>(null)
  useEffect(()=>{
    document.title="Twoje konto Filmdle"
    foteczka(localStorage.getItem("Profilowe"))
  },[])
  useEffect(() => {
    const data: [string, string][] = Object.entries(localStorage);
    const data2: [string,string][] = data.filter(
        ([klucz]) => klucz !== "haslo" && klucz !== "ally-supports-cache" && klucz !== "__NEXT_DISMISS_PRERENDER_INDICATOR" && klucz !== "Profilowe" && klucz !== "Odblokowane Quizy" && klucz !== "Zapisane Quizy ID"
      );
    setStorageData(data2);
  }, []);

  return (
    <main className="p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-center mb-6">
        {profilowe ? (
          <img
            src={profilowe}
            alt="Obrazek z localStorage"
            className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl transition-transform transform hover:scale-105 hover:border-yellow-400"
          />
        ) : (
          <p className="text-gray-500 italic">Brak zdjęcia profilowego</p>
        )}
      </div>
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow-md">
        Twoje Konto
      </h2>
      <ul className="space-y-4 w-full max-w-lg bg-white p-6 rounded-2xl shadow-2xl border border-gray-200">
        {storageData.map(([key, value], index) => (
          <li
            key={key}
            className={`flex justify-between items-center px-4 py-3 rounded-lg shadow-sm transition-colors ${
              index % 2 === 0 ? "bg-indigo-50 hover:bg-indigo-100" : "bg-yellow-50 hover:bg-yellow-100"
            }`}
          >
            <strong className="text-gray-800 uppercase tracking-wide">
              {key}:
            </strong>
            <span className="text-gray-600 break-words max-w-xs text-right">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
