"use client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
type Quiz = {
  nazwa_quizu:string
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
export default function Filtrowanie({params}: {params: {value:string}}){
  const [quizy,pobierz_quizy] = useState<Array<Quiz>>([])
  useEffect(()=>{
      fetch(`/api/get_filtered_quizzes?value=${params.value}`)
      .then(res => res.json())
      .then(res => {
        pobierz_quizy(res.finder_kategorie)
      })
      .catch(err => console.log(err))
    },[params])
    return (
      <main>
        {quizy.length > 0 ? (
          <div>{quizy.map((quiz, index) => <p key={index}>{quiz.tytul}</p>)}</div>
        ) : (
          <p>Ładowanie...</p>
        )}
      </main>
    );
}