"use client";
import { useRouter } from "next/navigation";
export default function Nawigacja(){
    const router = useRouter()
    function glowna(): void{
        router.push("/")
    }
    return (
        <nav className="fixed top-0 left-0 w-full bg-indigo-600 shadow-md z-50 p-4 flex justify-center">
          <button
            onClick={glowna}
            className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-lg shadow hover:bg-indigo-100 transition-transform transform hover:scale-105"
          >
            Strona główna
          </button>
        </nav>
      );
}