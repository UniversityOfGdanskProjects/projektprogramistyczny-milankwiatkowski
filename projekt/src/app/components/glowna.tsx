"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  function tekstowy(): void{
    router.push("/tryb-tekstowy")
  }
  function graficzny(): void{
    router.push("/tryb-graficzny")
  }
  function usunLocalStorage(): void{
    router.push("/usun-localStorage")
  }
  function utworz_quiz(): void{
    router.push("/wlasny-quiz")
  }
  function sklep(): void{
    router.push("/sklep")
  }
  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 via-cyan-100 to-indigo-100 p-6">
      <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-2xl shadow-2xl">
        <div
          onClick={tekstowy}
          className="w-64 cursor-pointer transition-transform hover:scale-105 shadow rounded-xl overflow-hidden"
        >
          <img src="/tekstowe_obrazek.jpeg" className="w-full" />
          <button className="w-full bg-green-500 text-white font-semibold py-2 hover:bg-green-600 transition-colors">
            Tryb Tekstowy
          </button>
        </div>
  
        <div
          onClick={graficzny}
          className="w-64 cursor-pointer transition-transform hover:scale-105 shadow rounded-xl overflow-hidden"
        >
          <img src="/graficzne_obrazek.jpeg" className="w-full" />
          <button className="w-full bg-blue-500 text-white font-semibold py-2 hover:bg-blue-600 transition-colors">
            Tryb Graficzny
          </button>
        </div>
  
        <button
          onClick={utworz_quiz}
          className="w-64 bg-yellow-500 text-white font-semibold py-2 rounded-xl shadow hover:bg-yellow-600 transition-transform hover:scale-105"
        >
          Utwórz Quiz
        </button>
  
        <button
          onClick={sklep}
          className="w-64 bg-pink-500 text-white font-semibold py-2 rounded-xl shadow hover:bg-pink-600 transition-transform hover:scale-105"
        >
          Sklep z akcesoriami
        </button>
  
        <button
          onClick={usunLocalStorage}
          className="w-64 bg-red-500 text-white font-semibold py-2 rounded-xl shadow hover:bg-red-600 transition-transform hover:scale-105"
        >
          Usuń LocalStorage
        </button>
      </div>
    </main>
  );
}