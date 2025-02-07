"use client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
type Quiz = {
  nazwa_quizu:string,
  quiz_id: number,
  tytul:string,
  opis:string,
  podpowiedz:string,
  typ_quizu:string,
  gatunki:Array<number>,
  gatunki_nazwy:Array<string>,
  ocena:number,
  rok_produkcji:string,
  film_id:number,
  sciezka_obraz:string,
  tworca:string,
  popularnosc:number
}
export default function Filtrowanie({params}: {params: {value:string}}){
  const [quizy,pobierz_quizy] = useState<Array<Quiz>>([])
  const router = useRouter()
  useEffect(()=>{
      fetch(`/api/get_filtered_quizzes?value=${params.value}`)
      .then(res => res.json())
      .then(res => {
        pobierz_quizy(res.final_tab)
      })
      .catch(err => console.log(err))
    },[params])
    function move_to_quiz(id:number):void{
      router.push(`/quizy/${id}`)
    }
    return (
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-6">
        <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-2xl p-6 bg-white border border-gray-300 mb-4">
          <ul className="space-y-4">
            {quizy.length > 0 ? (
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