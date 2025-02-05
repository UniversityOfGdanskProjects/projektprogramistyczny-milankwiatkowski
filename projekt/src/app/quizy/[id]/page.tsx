"use client";
import Nawigacja from "@/app/components/nav"
import Stopka from "@/app/components/stopka"
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useRouter } from "next/navigation";
type Quiz = {
  nazwa_quizu:number,
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
  tworca:string
}
type gatunki = {
  id:number,
  name:string
}
export default function QuizyTekstowe({params}: {params: {id:string}}) {
    // const router = useRouter()
    const [czyGraficzny,sprawdz_czy_graficzny] = useState<boolean>(false)
    const [dane,dane_update] = useState<Quiz | null>(null)
    const [klikniecia, update_klikniecia] = useState<number>(0)
    const [error, setError] = useState<string>("");
    const [if_used_hints,setHintsTrue] = useState<boolean>(false)
    const [podpowiedzi,update_podpowiedzi] = useState<Array<string>>([])
    const [wyswietl,pokaz_podpowiedzi] = useState<boolean>(false)
    const [ifcreator,sprawdz_tworce] = useState<boolean>(false)
    const [Alert, pokazalert] = useState(false);
    const [latestalert,pokazalert2] = useState<string>("")
    const [ifended,setend] = useState<boolean>(true)
    const [ifalreadydone,checkifdone] = useState<boolean>(false)
    const [foteczka,zmienfote] = useState<string | null>(null)
    const [iffav,checkiffav] = useState<boolean>(false)
    const komentarze = ["Pudło!","No... nie.","Prawie byłeś nawet blisko!","Kieleckie jest cieplejsze niż ten strzał...","Przecież to oczywiste...","Spróbuj ponownie!","Czekam na poprawną odpowiedź...","WIĘCEJ!","Nice try!","Praaaaaaaaaaaaaaaaaaaaaaawie!"]
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
    // useEffect(()=>{
    //   const gracz = localStorage.getItem("Nick")
    //   if(gracz && dane){
    //     const parsed_gracz = JSON.parse(gracz)
    //     if(gracz==dane.tworca){
    //       sprawdz_tworce(true)
    //     }
    //   }
    // })
    useEffect(()=>{
      const filmy_check = localStorage.getItem("Odblokowane Quizy")
      if(filmy_check && dane){
        const parsed_check:number[] = JSON.parse(filmy_check)
        const finder_check = parsed_check.findIndex(p => p === dane.quiz_id)
        if(finder_check!=-1){
          checkifdone(true)
        }
      }
    })
    useEffect(()=>{
      if(czyGraficzny==true && dane){
        function zaladuj(){
          fetch(`https://api.themoviedb.org/3/movie/${dane?.film_id}/images`, options)
            .then(res => res.json())
            .then(res => {
              const randomowa = Math.floor(Math.random()*res.backdrops.length)
              const obrazek = `https://image.tmdb.org/t/p/w500${res.backdrops[randomowa].file_path}`;
              zmienfote(obrazek)
            })
            .catch(err => console.error(err));
        }
        zaladuj()
      }
    },[czyGraficzny])
    function wyslij(dane_wpisane: {haslo:string}):void{
      update_klikniecia(klikniecia+1)
      if(klikniecia==15){
        osiagniecia("Jak się tu dostaliśmy?")
      }
      if(klikniecia==25){
        osiagniecia("Może czas sobie odpuścić?")
      }
      if(klikniecia==50){
        osiagniecia("Jak nie było internetu to tylko rodzina wiedziała, że niezdolny...")
      }
      if(dane){
        if(klikniecia==25 && dane.typ_quizu=="Graficzny"){
          osiagniecia("Ilu dioptrii brakuje?")
        }
        if(klikniecia==50 && dane.typ_quizu=="Graficzny"){
          osiagniecia("Oczu kąpiel?")
        }
      }
      if(dane && dane_wpisane.haslo==dane.tytul){
        setend(false)
        pokazalert(true)
        pokazalert2("Wygrałeś!")
        if(if_used_hints==false && klikniecia>7){
          osiagniecia("Cierpliwy")
        }
        if(klikniecia==1){
          osiagniecia("Najszybszy na Dzikim Zachodzie")
        }
        if(klikniecia==1 && dane.typ_quizu=="Graficzny"){
          osiagniecia("Sokole Oko")
        }
        if(klikniecia==7){
          osiagniecia("Szczęśliwa siódemka")
        }
        if(klikniecia==13){
          osiagniecia("Szczęśliwa 13")
        }
        if(ifalreadydone==false){
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
      }
      else{
        let randomowa:number = Math.floor(Math.random()*5)
        setError(komentarze[randomowa])
      }
    }
    useEffect(()=>{
        if(klikniecia==2 && dane){
          update_podpowiedzi(lista=>[...lista,genres.toString()])
        }
        if(klikniecia==4 && dane){
          update_podpowiedzi(lista=>[...lista,dane.rok_produkcji])
        }
        if(klikniecia==6 && dane){
          update_podpowiedzi(lista=>[...lista,dane.ocena.toString()])
        }
        if(klikniecia==7 && dane){
          update_podpowiedzi(lista=>[...lista,dane.podpowiedz])
        }
        if(klikniecia==9 && dane){
          update_podpowiedzi(lista=>[...lista,dane.opis])
        }
    },[klikniecia])
    function daj_podpowiedzi(){
      setHintsTrue(true)
      pokaz_podpowiedzi(true)
    }
    useEffect(()=>{
      const favs = localStorage.getItem("Zapisane Quizy ID")
      if(favs && dane){
        const parsed_favs = JSON.parse(favs)
        const finder = parsed_favs.findIndex(p => p === dane.quiz_id)
        if(finder!==-1){
          checkiffav(true)
        }
      }
    })
    function dodaj_usun_ulubiony(){
      if(dane){
        const favs = localStorage.getItem("Zapisane Quizy ID")
        const favs_user = localStorage.getItem("Zapisane Quizy")
        if(favs && favs_user){
          const parsed_favs = JSON.parse(favs)
          const parsed_favs_user = JSON.parse(favs_user)
          const finder = parsed_favs.findIndex(p => p === dane.quiz_id)
          if(finder===-1){
            parsed_favs.push(dane.quiz_id)
            parsed_favs_user.push(dane.nazwa_quizu)
            console.log(parsed_favs)
            checkiffav(true)
            localStorage.setItem("Zapisane Quizy ID",JSON.stringify(parsed_favs))
            localStorage.setItem("Zapisane Quizy",JSON.stringify(parsed_favs_user))
          }
          else{
            parsed_favs.splice(finder,1)
            parsed_favs_user.splice(finder,1)
            console.log(parsed_favs)
            checkiffav(false)
            localStorage.setItem("Zapisane Quizy ID",JSON.stringify(parsed_favs))
            localStorage.setItem("Zapisane Quizy",JSON.stringify(parsed_favs_user))
          }
        }
      }
    }
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-6 relative">
        {iffav ? (
          <img
            src="/fav.png"
            width="40px"
            onClick={dodaj_usun_ulubiony}
            className="cursor-pointer hover:scale-105 transition-transform absolute top-4 right-4"
          />
        ) : (
          <img
            src="/nfav.png"
            width="40px"
            onClick={dodaj_usun_ulubiony}
            className="cursor-pointer hover:scale-105 transition-transform absolute top-4 right-4"
          />
        )}
    
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md text-center">
          {ifended && !ifalreadydone && !ifcreator ? (
            <>
              <h2 className="text-2xl font-bold text-indigo-700 my-4">Zgadnij film!</h2>
              <Formik
                initialValues={{ haslo: "" }}
                validationSchema={Yup.object({
                  haslo: Yup.string().min(1, "Min. 1 znak").required("Wymagane"),
                })}
                onSubmit={wyslij}
              >
                {() => (
                  <Form className="flex flex-col gap-4">
                    {error && <div className="text-red-500 font-semibold">{error}</div>}
                    <label className="font-bold text-gray-700">Hasło:</label>
                    <Field
                      name="haslo"
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <ErrorMessage
                      name="haslo"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
                    >
                      Wyślij
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <p className="text-green-600 text-xl font-bold">Wygrałeś!</p>
          )}
    
          <p className="mt-4 text-gray-700">Ilość prób: {klikniecia}</p>
    
          {dane ? (
            <button
              onClick={daj_podpowiedzi}
              className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-yellow-500 transition-transform transform hover:scale-105 mt-2"
            >
              Kliknij po podpowiedzi
            </button>
          ) : (
            <p className="italic text-gray-500">Ładowanie...</p>
          )}
    
          {czyGraficzny && (
            <img
              src={foteczka}
              alt="Plakat"
              width="550px"
              className="mt-4 rounded-lg shadow-md"
            />
          )}
    
          {wyswietl && (
            <div className="bg-indigo-50 p-4 rounded-lg shadow mt-4">
              {podpowiedzi}
            </div>
          )}
    
          {Alert && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
              <p>{latestalert}</p>
              <button
                onClick={() => pokazalert(false)}
                className="mt-2 bg-white text-red-500 px-4 py-1 rounded hover:bg-red-100"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }