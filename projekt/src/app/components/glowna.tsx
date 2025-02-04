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
    <main>
      <button onClick={tekstowy}>Tryb Tekstowy</button>
      <button onClick={graficzny}>Tryb Graficzny</button>
      <button onClick={utworz_quiz_txt}>Utwórz Quiz Tekstowy</button>
      <button onClick={utworz_quiz_graf}>Utwórz Quiz Graficzny</button>
      <button onClick={sklep}>Sklep z akcesoriami</button>
      <button onClick={usunLocalStorage}>Usuń LocalStorage</button>
    </main>
  );
}