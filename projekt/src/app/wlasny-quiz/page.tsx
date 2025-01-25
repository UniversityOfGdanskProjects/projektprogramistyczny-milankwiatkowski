"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function TworzenieQuizu() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const dodaj_quiz = async (dane: {quiz_id:number,tytul:string,opis:string,podpowiedz:string, typ_quizu:string,gatunki:Array<number>,ocena:number,rok_produkcji:string}) => {
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
          fetch("/api/get_quiz_id",{
            method: "GET",
            headers: { "Content-Type": "application/json" }
          })
          .then(res2=>res2.json())
          .then(res2=>{
            dane.quiz_id=res2+1
            fetch("/api/posting", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dane),
            });
          })
          .catch(err=>console.log(err))
          const moje_quizy = localStorage.getItem("Utworzone Quizy")
          if(moje_quizy){
            const parsed:number = JSON.parse(moje_quizy)
            localStorage.setItem("Utworzone Quizy",JSON.stringify(parsed+1))
          }
          router.push("/")
        }
        else{
          setError("Nie ma filmu o takim tytule!")
        }
      })
      .catch(err => console.error(err));
  };
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {isLoggedIn ? (
        <div>
          <h1>Witaj!</h1>
          <button onClick={() => setIsLoggedIn(false)}>Wyloguj</button>
        </div>
      ) : (
        <Formik
          initialValues={{quiz_id:0, tytul: "", opis: "", podpowiedz: "",typ_quizu:"", gatunki:[],ocena:0,rok_produkcji:"",}}
          validationSchema={Yup.object({
            tytul: Yup.string().required("Wymagane"),
            opis: Yup.string().min(6, "Min. 6 znaków").required("Wymagane"),
            podpowiedz: Yup.string(),
            typ_quizu: Yup.string().min(2,"Wybierz typ quizu!").required("Wybierz typ quizu"),
          })}
          onSubmit={dodaj_quiz}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              {error && <div className="text-red-500">{error}</div>}
              <label>Tytuł:</label>
              <Field name="tytul" />
              <ErrorMessage name="tytul" component="div" className="text-red-500" />

              <label>Opis:</label>
              <Field name="opis" />
              <ErrorMessage name="opis" component="div" className="text-red-500" />

              <label>Podpowiedź:</label>
              <Field name="podpowiedz" />
              <ErrorMessage name="podpowiedz" component="div" className="text-red-500" />

              <label>Typ Quizu:</label>
              <Field as="select" name="typ_quizu">
              <option value=""></option>
              <option value="Tekstowy">Tekstowy</option>
              <option value="Graficzny">Graficzny</option>
              </Field>

              <ErrorMessage name="typ_quizu" component="div" className="text-red-500" />
              
              <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
                Zarejestruj
              </button>
            </Form>
          )}
        </Formik>
      )}
    </main>
  );
}
