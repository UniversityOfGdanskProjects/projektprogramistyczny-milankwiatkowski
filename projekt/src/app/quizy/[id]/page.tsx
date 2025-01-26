"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useRouter } from "next/navigation";
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
  sciezka_obraz:string
}
type gatunki = {
  id:number,
  name:string
}
export default function QuizyTekstowe({params}: {params: {id:string}}) {
    // const router = useRouter()
    const [czyGraficzny,sprawdz_czy_graficzny] = useState<boolean>(false)
    const [dane,dane_update] = useState<Quiz | null>(null)
    const [genres, genres_update] = useState<Array<gatunki>>([])
    const [klikniecia, update_klikniecia] = useState<number>(1)
    const [error, setError] = useState<string>("");
    const [if_used_hints,setHintsTrue] = useState<boolean>(false)
    const [podpowiedzi,update_podpowiedzi] = useState<Array<string>>([])
    const [wyswietl,pokaz_podpowiedzi] = useState<boolean>(false)
    const [sprawdz_czy_wyslano_haslo,pokazano_podpowiedz] = useState<boolean>(false) //zeby sie nie wsywietlalo milion razy ta sama podpowiedzd
    const [Alert, pokazalert] = useState(false);
    const [latestalert,pokazalert2] = useState<string>("")
    const [ifended,setend] = useState<boolean>(true)
    const [ifalreadydone,checkifdone] = useState<boolean>(true)
    const komentarze = ["Pudło!","No... nie.","Prawie byłeś nawet blisko!","Kieleckie jest cieplejsze niż ten strzał...","Przecież to oczywiste...","Spróbuj ponownie!"]
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTAwODQ0MjRiZTBiMjJkMzg2Mjc5NGYwMmM0YjJmMiIsIm5iZiI6MTczNzY1Mjk3Mi43MTYsInN1YiI6IjY3OTI3YWVjODNkMTgyNDA0ZWVhZDgxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WkMZ_rtDeywYzT-iQgIGqNtE28gVa00xnTtl4bhJyGM'
      }
    };
    function osiagniecia(osiagniecie:string){
      const kaska = localStorage.getItem("MilanCoiny")
      const achievements = localStorage.getItem("Osiągnięcia")
          if(achievements && kaska){
            const parsed:string[] = JSON.parse(achievements)
            const finder = parsed.findIndex(p => p === osiagniecie)
            if(finder===-1){
              const parsed_kaska:number = JSON.parse(kaska)
              pokazalert(true)
              pokazalert2(`Zdobywasz osiągnięcie - "${osiagniecie}" ! W nagrodę otrzymjesz 30 MilanCoinów!`)
              parsed.push(osiagniecie)
              localStorage.setItem("Osiągnięcia",JSON.stringify(parsed))
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska+30))
            }
          }
    }
    useEffect(()=>{
      document.title="Filmdle!"
    })
    useEffect(()=>{
      async function get_quiz_data():Promise<void>{
        fetch(`/api/get_quiz_data?id=${params.id}`,{
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })
        .then(res=>res.json())
        .then(res=>{
          dane_update(res.finder)
          if(res.finder.typ_quizu=="Graficzny"){
            sprawdz_czy_graficzny(true)
          }
        })
        .catch(err=>console.log(err))
      }
      get_quiz_data()
    },[])
    useEffect(()=>{
      async function get_quiz_genres():Promise<void>{
        fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
        .then(res => res.json())
        .then(res =>{
          if(dane){
            dane.gatunki.forEach((x)=>{
              const gatunek = res.genres.find((p:gatunki) => p.id === x)
              genres_update(lista=>[...lista,gatunek.name])
            })
          }
        })
      }
      get_quiz_genres()
    },[dane])

    useEffect(()=>{
      const filmy_check = localStorage.getItem("Odblokowane Quizy")
      if(filmy_check && dane){
        const parsed_check:number[] = JSON.parse(filmy_check)
        const finder_check = parsed_check.findIndex(p => p === dane.quiz_id)
        if(finder_check!=-1){
          checkifdone(false)
        }
      }
    })
    function wyslij(dane_wpisane: {haslo:string}):void{
      update_klikniecia(klikniecia+1)
      pokazano_podpowiedz(false)
      if(klikniecia==15){
        osiagniecia("Jak się tu dostaliśmy?")
      }
      if(klikniecia==25){
        osiagniecia("Może czas sobie odpuścić?")
      }
      if(klikniecia==50){
        osiagniecia("Jak nie było internetu to tylko rodzina wiedziała, że niezdolny...")
      }
      if(dane && dane_wpisane.haslo==dane.tytul){
        setend(false)
        pokazalert(true)
        pokazalert2("Wygrałeś!")
        if(if_used_hints==false){
          osiagniecia("Cierpliwy")
        }
        if(klikniecia==2){
          osiagniecia("Najszybszy na Dzikim Zachodzie")
        }
        if(klikniecia==13){
          osiagniecia("Szczęśliwa 13")
        }
        const filmy = localStorage.getItem("Odblokowane Filmy")
        const obejrzaneid = localStorage.getItem("Odblokowane Quizy")
        const kaska = localStorage.getItem("MilanCoiny")
        const lvl = localStorage.getItem("Poziom")
        let kaska_add:number = 0
        let lvl_add:number = 0
        if(lvl && kaska && filmy && obejrzaneid){
          const parsed_obejrzane:number[] = JSON.parse(obejrzaneid)
          parsed_obejrzane.push(dane.quiz_id)
          localStorage.setItem("Odblokowane Quizy",JSON.stringify(parsed_obejrzane))
          const parsed_filmy:string[] = JSON.parse(filmy)
          const finder = parsed_filmy.findIndex(p => p === dane.tytul)
          if(finder===-1){
            parsed_filmy.push(dane.tytul)
            localStorage.setItem("Odblokowane Filmy",JSON.stringify(parsed_filmy))
          }
          const parsedkaska:number = JSON.parse(kaska)
          const parsedlvl:number = JSON.parse(lvl)
          const szanse = 10/klikniecia
          if(szanse==10){
            lvl_add = 1
            kaska_add = 25
            pokazalert(true)
            pokazalert2("LEVEL UP!")
          }
          if(szanse==5){
            const randomowa = Math.floor(Math.random())
            kaska_add = 15
            if(randomowa==1){
              pokazalert(true)
              pokazalert2("LEVEL UP!")
              lvl_add = 1
            }
          }
          if(szanse==3){
            const randomowa = Math.floor(Math.random()*3)
            kaska_add = 7
            if(randomowa==1){
              pokazalert(true)
              pokazalert2("LEVEL UP!")
              lvl_add = 1
            }
          }
          if(szanse==2){
            const randomowa = Math.floor(Math.random()*5)
            kaska_add = 4
            if(randomowa==1){
              pokazalert(true)
              pokazalert2("LEVEL UP!")
              lvl_add = 1
            }
          }
          if(szanse==1){
            const randomowa = Math.floor(Math.random()*10)
            kaska_add = 2
            if(randomowa==1){
              pokazalert(true)
              pokazalert2("LEVEL UP!")
              lvl_add = 1
            }
          }
        localStorage.setItem("MilanCoiny",JSON.stringify(parsedkaska+kaska_add))
        localStorage.setItem("Poziom",JSON.stringify(parsedlvl+lvl_add))
        }
      }
      else{
        let randomowa:number = Math.floor(Math.random()*5)
        setError(komentarze[randomowa])
      }
    }
    function daj_podpowiedzi(){
      if(klikniecia==2 && dane && sprawdz_czy_wyslano_haslo==false){
        update_podpowiedzi(lista=>[...lista,genres.toString()])
        pokazano_podpowiedz(true)
      }
      if(klikniecia==4 && dane && sprawdz_czy_wyslano_haslo==false){
        update_podpowiedzi(lista=>[...lista,dane.rok_produkcji])
        pokazano_podpowiedz(true)
      }
      if(klikniecia==6 && dane && sprawdz_czy_wyslano_haslo==false){
        update_podpowiedzi(lista=>[...lista,dane.ocena.toString()])
        pokazano_podpowiedz(true)
      }
      if(klikniecia==7 && dane && sprawdz_czy_wyslano_haslo==false){
        update_podpowiedzi(lista=>[...lista,dane.podpowiedz])
        pokazano_podpowiedz(true)
      }
      if(klikniecia==9 && dane && sprawdz_czy_wyslano_haslo==false){
        update_podpowiedzi(lista=>[...lista,dane.opis])
        pokazano_podpowiedz(true)
      }
      if(wyswietl==true){
        pokaz_podpowiedzi(false)
      }
      else{
        setHintsTrue(true)
        pokaz_podpowiedzi(true)
      }
    } 
    return (
<main>
  <div>
    {ifended && ifalreadydone ? (
      <>
        <h2>Zgadnij film!</h2>
        <Formik
          initialValues={{ haslo: "" }}
          validationSchema={Yup.object({
            haslo: Yup.string().min(1, "Min. 1 znak").required("Wymagane"),
          })}
          onSubmit={wyslij}
        >
          {() => (
            <Form className="flex flex-col gap-3">
              {error && <div className="text-red-500">{error}</div>}
              <label>Hasło:</label>
              <br />
              <Field name="haslo" />
              <br />
              <ErrorMessage name="haslo" component="div" className="text-red-500" />
              <br />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Wyślij
              </button>
            </Form>
          )}
        </Formik>
      </>
    ) : (
      <p>Wygrałeś!</p>
    )}

    <p>{klikniecia}</p>

    {dane ? (
      <button onClick={daj_podpowiedzi}>Kliknij po podpowiedzi</button>
    ) : (
      <p>Ładowanie...</p>
    )}
    {czyGraficzny ? (
      <img src={"/ja1.jpg"} alt="Plakat" width="150px"/>
    ):(<p></p>)}
    {wyswietl && <div>{podpowiedzi}</div>}
    <div>
      {Alert && (
        <div className="custom-alert">
          <p>{latestalert}</p>
          <button onClick={() => pokazalert(false)}>OK</button>
        </div>
      )}
    </div>
  </div>
</main>

    );
  }