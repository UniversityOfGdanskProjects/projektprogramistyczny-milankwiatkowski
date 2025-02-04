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
    <main className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center mb-4">
        {profilowe ? (
          <img
            src={profilowe}
            alt="Obrazek z localStorage"
            className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-md"
          />
        ) : (
          <p className="text-gray-500">Brak zdjęcia profilowego</p>
        )}
      </div>
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Twoje Konto:</h2>
      <ul className="space-y-2 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
        {storageData.map(([key, value]) => (
          <li key={key} className="border-b last:border-none py-2">
            <strong className="text-gray-800">{key.toUpperCase()}:</strong> 
            <span className="text-gray-600"> {value}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
