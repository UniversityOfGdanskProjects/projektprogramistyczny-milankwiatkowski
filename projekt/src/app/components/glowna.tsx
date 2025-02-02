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
  function user(): void{
    router.push("/konto-uzytkownika")
  }
  function utworz_quiz(): void{
    router.push("/wlasny-quiz")
  }
  function sklep(): void{
    router.push("/sklep")
  }
  return (
    <main>
      <button onClick={user}>HEJO</button>
      <button onClick={tekstowy}>Tryb Tekstowy</button>
      <button onClick={graficzny}>Tryb Graficzny</button>
      <button onClick={utworz_quiz}>Utwórz Quiz</button>
      <button onClick={sklep}>Sklep z akcesoriami</button>
      <button onClick={usunLocalStorage}>Usuń LocalStorage</button>
    </main>
  );
}