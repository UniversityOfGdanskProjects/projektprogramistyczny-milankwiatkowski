"use client";
import {useEffect} from "react"
// import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function QuizyTekstowe() {
  useEffect(()=>{
    document.title="Wybierz quiz do rozwiązania!"
  })
  // const router = useRouter()
  return (
    <main>
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
          <h2 className="text-xl font-bold mb-2">Tytuł karty</h2>
          <p className="text-gray-700">To jest treść karty.</p>
        </div>
    </main>
  );
}