"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function KontoUzytkownika() {
  const [storageData, setStorageData] = useState<[string, string][]>([]);
  const [zapisane, setQuizy] = useState<Array<string>>([]);
  const [zapisaneID, setQuizyID] = useState<Array<number>>([]);
  const [profilowe, foteczka] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const Wyloguj = () => {
    router.push("/rejestracja")
  };

  useEffect(() => {
    document.title = "Wybierz quiz do rozwiązania!";
  });

  useEffect(() => {
    document.title = "Twoje konto Filmdle";
    foteczka(localStorage.getItem("Profilowe"));
  }, []);

  useEffect(() => {
    const data: [string, string][] = Object.entries(localStorage);
    const data2: [string, string][] = data.filter(
      ([klucz]) =>
        klucz !== "haslo" &&
        klucz !== "ally-supports-cache" &&
        klucz !== "__NEXT_DISMISS_PRERENDER_INDICATOR" &&
        klucz !== "Profilowe" &&
        klucz !== "Odblokowane Quizy" &&
        klucz !== "Zapisane Quizy ID" &&
        klucz !== "nextauth.message" &&
        klucz !== "Zapisane Quizy"
    );
    const data3 = localStorage.getItem("Zapisane Quizy")
    const data4 = localStorage.getItem("Zapisane Quizy ID")
    setStorageData(data2);
    if(data3){
      const data3_1 = JSON.parse(data3)
      setQuizy(data3_1);
    }
    if(data4){
      const data4_1 = JSON.parse(data4)
      setQuizyID(data4_1)
    }
  }, []);
  function przenies_do_quizu(wybor:number):void{
    router.push(`/quizy/${wybor}`)
  }

  return (
    <main className="p-6 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-6 min-h-screen flex flex-col items-center py-36">
      {session ? (
        <div className="text-center p-6 rounded-xl">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Wyloguj się
          </button>
        </div>
      ) : (
        <div className="text-center p-6 rounded-xl">
          <button
            onClick={() => Wyloguj()}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Wyloguj się
          </button>
        </div>
      )}

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
        {storageData.map(([klucz, wartosc], index) => (
          <li
            key={klucz}
            className={`flex justify-between items-center px-4 py-3 rounded-lg shadow-sm transition-colors ${
              index % 2 === 0
                ? "bg-indigo-50 hover:bg-indigo-100"
                : "bg-yellow-50 hover:bg-yellow-100"
            }`}
          >
            <strong className="text-gray-800 uppercase tracking-wide">
              {klucz}:
            </strong>
            <span className="text-gray-600 break-words max-w-xs text-right">
              {wartosc}
            </span>
          </li>
        ))}
      </ul>
      <h3 className="text-2xl font-bold text-indigo-800 mt-8">Zapisane Quizy</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-4xl">
        {zapisane.map(([klucz], index) => (
          <div
            key={`${klucz}-${index}`}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-300 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out hover:bg-indigo-50"
            onClick={() => przenies_do_quizu(zapisaneID[index])}
          >
            <p className="text-gray-800 font-semibold text-lg text-center">{zapisane[index]}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
