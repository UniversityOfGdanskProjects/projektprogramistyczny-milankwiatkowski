"use client";
import {useEffect} from "react"
import { useState } from "react";
import { useRouter } from "next/navigation";
type Quiz = {
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
    <main>
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
        <ul>
        {quizy ? (quizy.map((x) => (
          <li key={x.quiz_id}>
            <button onClick={() => move_to_quiz(x.quiz_id)}><strong>{x.tytul.toUpperCase()}</strong><br></br><strong>By: {x.tworca}</strong></button>
          </li>
        ))):(<p></p>)}
      </ul>
        </div>
    </main>
  );
}