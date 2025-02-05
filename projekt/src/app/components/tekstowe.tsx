"use client";
import {useEffect} from "react"
import { useState } from "react";
import { useRouter } from "next/navigation";
type Quiz = {
  nazwa_quizu:string,
  quiz_id: number,
  tytul:string,
  opis:string,
  podpowiedz:string,
  typ_quizu:string,
  gatunki:Array<number>,
  ocena:number,
  rok_produkcji:string,
  film_id:number,
  sciezka_obraz:string,
  tworca:string
}
export default function QuizyTekstowe() {
  const router = useRouter() 
  const [quizy,pobierz_quizy] = useState<Array<Quiz>>([])
  useEffect(()=>{
    document.title="Wybierz quiz do rozwiązania!"
  })
  useEffect(()=>{
    fetch("/api/get_quiz_list")
    .then(res => res.json())
    .then(res => {
      pobierz_quizy(res.tekstowe)
    })
    .catch(err => console.log(err))
  },[])
  function move_to_quiz(id:number):void{
    router.push(`/quizy/${id}`)
  }
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 via-cyan-100 to-indigo-100 p-6">
      <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-2xl p-6 bg-white border border-gray-300 mb-4">
        <ul className="space-y-4">
          {quizy ? (
            quizy.map((x) => (
              <li key={x.quiz_id} className="bg-indigo-50 p-4 rounded-lg shadow hover:bg-indigo-100 transition-transform transform hover:scale-105">
                <button
                  onClick={() => move_to_quiz(x.quiz_id)}
                  className="w-full text-left text-indigo-700 font-bold text-lg"
                >
                  {x.nazwa_quizu.toUpperCase()}
                  <br />
                  <span className="text-gray-600 font-medium">By: {x.tworca}</span>
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 italic text-center">Brak dostępnych quizów</p>
          )}
        </ul>
      </div>
    </main>
  );
}