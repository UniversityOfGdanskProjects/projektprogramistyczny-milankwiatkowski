"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
type gatunki = {
  id:number,
  name:string
}
export default function TworzenieQuizu() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [genres, genres_update] = useState<Array<string>>([])
  const [error, setError] = useState<string>("");
  const router = useRouter();
  useEffect(()=>{
    document.title="Stwórz własny quiz na Filmdle!"
  })
  const dodaj_quiz = async (dane: {nazwa_quizu:string,quiz_id:number,tytul:string,opis:string,podpowiedz:string, typ_quizu:string,gatunki:Array<number>,gatunki_nazwy:Array<string>,ocena:number,rok_produkcji:string,film_id:number,tworca:string,}) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTAwODQ0MjRiZTBiMjJkMzg2Mjc5NGYwMmM0YjJmMiIsIm5iZiI6MTczNzY1Mjk3Mi43MTYsInN1YiI6IjY3OTI3YWVjODNkMTgyNDA0ZWVhZDgxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WkMZ_rtDeywYzT-iQgIGqNtE28gVa00xnTtl4bhJyGM'
      }
    };
    const query = encodeURIComponent(dane.tytul)
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&page=1`, options)
      .then(res => res.json())
      .then(res =>{
        if(res.total_results!==0){
          dane.ocena = res.results[0].vote_average
          dane.rok_produkcji = res.results[0].release_date
          dane.gatunki = res.results[0].genre_ids
          dane.film_id = res.results[0].id
          const nick = localStorage.getItem("Nick")
          if(nick){
            dane.tworca = nick
          }
          fetch("/api/get_quiz_id",{
            method: "GET",
            headers: { "Content-Type": "application/json" }
          })
          .then(res2=>res2.json())
          .then(res2=>{
            dane.quiz_id=res2+1
            alltogether()
          })
          .catch(err=>console.log(err))
        }
        else{
          setError("Nie ma filmu o takim tytule!")
        }
      })
      .catch(err => console.error(err));
      const alltogether = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, options);
        const data = await res.json();
        
        if (dane) {
          const gatunkiNazwy = dane.gatunki
            .map((x) => data.genres.find((p: gatunki) => p.id === x))
            .filter(Boolean)
            .map((g) => g.name.toLowerCase());
      
          genres_update(gatunkiNazwy);
          dane.gatunki_nazwy = gatunkiNazwy;
          posting();
        }
      };
      const posting = async()=>{
      fetch("/api/posting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      const moje_quizy = localStorage.getItem("Utworzone Quizy")
      if(moje_quizy){
        const parsed:number = JSON.parse(moje_quizy)
        localStorage.setItem("Utworzone Quizy",JSON.stringify(parsed+1))
      }
      router.push("/")}
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-6">
      {isLoggedIn ? (
        <div className="text-center bg-white p-6 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-red-700 mb-4">Witaj!</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Wyloguj
          </button>
        </div>
      ) : (
        <Formik
          initialValues={{ nazwa_quizu: "", quiz_id: 0, tytul: "", opis: "", podpowiedz: "", typ_quizu: "", gatunki: [],gatunki_nazwy:[], ocena: 0, rok_produkcji: "", film_id: 0, tworca: "" }}
          validationSchema={Yup.object({
            tytul: Yup.string().required("Wymagane"),
            opis: Yup.string().min(6, "Min. 6 znaków").required("Wymagane"),
            nazwa_quizu: Yup.string().min(6, "Min. 6 znaków").required("Wymagane"),
            podpowiedz: Yup.string(),
            typ_quizu: Yup.string().min(4,"Wybierz typ!").required("Wymagane!"),
          })}
          onSubmit={dodaj_quiz}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-2xl w-80">
              {error && <div className="text-red-500 font-semibold text-center">{error}</div>}
  
              <label className="font-bold text-gray-700">Nazwa Quizu:</label>
              <Field
                name="nazwa_quizu"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <ErrorMessage name="nazwa_quizu" component="div" className="text-red-500 text-sm" />
  
              <label className="font-bold text-gray-700">Tytuł filmu:</label>
              <Field
                name="tytul"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <ErrorMessage name="tytul" component="div" className="text-red-500 text-sm" />
  
              <label className="font-bold text-gray-700">Opis:</label>
              <Field
                name="opis"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <ErrorMessage name="opis" component="div" className="text-red-500 text-sm" />
  
              <label className="font-bold text-gray-700">Podpowiedź:</label>
              <Field
                name="podpowiedz"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <ErrorMessage name="podpowiedz" component="div" className="text-red-500 text-sm" />

              <label className="font-bold text-gray-700">Typ Quizu:</label>
              <Field as="select" name="typ_quizu" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="" label="--" />
                <option value="Tekstowy" label="Quiz Tekstowy" />
                <option value="Graficzny" label="Quiz Obrazkowy" />
              </Field>
              <ErrorMessage name="typ_quizu" component="div" className="text-red-500 text-sm" />


              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Utwórz Quiz
              </button>
            </Form>
          )}
        </Formik>
      )}
    </main>
  );
}
