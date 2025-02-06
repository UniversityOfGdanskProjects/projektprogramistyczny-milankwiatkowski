"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Stopka(){
    const router = useRouter()
    const [profilowe, setProfilowe] = useState<string | null>(null);
    function FAQ(): void{
        router.push("/FAQ")
    }
    function PolitykaPrywatnosci(): void{
        router.push("/polityka-prywatnosci")
    }
    function doGita():void{
        window.open("https://github.com/milankwiatkowski")
    }
    useEffect(() => {
        const profiloweZLocalStorage = localStorage.getItem("Profilowe");
        setProfilowe(profiloweZLocalStorage);
    }, []);
    return (
        <footer className="fixed bottom-0 left-0 w-full flex items-center justify-between bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 p-1 shadow-md z-50">
          <button
            onClick={FAQ}
            className="text-indigo-600 font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-200 transition-colors"
          >
            FAQ
          </button>
          <button
            onClick={PolitykaPrywatnosci}
            className="text-indigo-600 font-bold py-1 px-2 rounded-lg shadow hover:bg-yellow-200 transition-colors"
          >
            Polityka Prywatności
          </button>
          <div
            onClick={doGita}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src="/github.png"
              alt="GitHub"
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm hover:border-yellow-300 transition-colors"
            />
          </div>
        </footer>
      );
}