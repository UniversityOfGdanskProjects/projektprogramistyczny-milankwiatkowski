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
  function utworz_quiz_txt(): void{
    router.push("/wlasny-quiz-tekstowy")
  }
  function utworz_quiz_graf(): void{
    router.push("/wlasny-quiz-graficzny")
  }
  function sklep(): void{
    router.push("/sklep")
  }
  return (
    <main className="h-full flex flex-col items-center justify-start pt-20 gap-3">
      <button
        onClick={tekstowy}
        className="w-60 bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
      >
        Tryb Tekstowy
      </button>
      <button
        onClick={graficzny}
        className="w-60 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
      >
        Tryb Graficzny
      </button>
      <button
        onClick={utworz_quiz_txt}
        className="w-60 bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
      >
        Utwórz Quiz Tekstowy
      </button>
      <button
        onClick={utworz_quiz_graf}
        className="w-60 bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105"
      >
        Utwórz Quiz Graficzny
      </button>
      <button
        onClick={sklep}
        className="w-60 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-pink-600 transition-transform transform hover:scale-105"
      >
        Sklep z akcesoriami
      </button>
      <button
        onClick={usunLocalStorage}
        className="w-60 bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
      >
        Usuń LocalStorage
      </button>
    </main>
  );
  
  
}