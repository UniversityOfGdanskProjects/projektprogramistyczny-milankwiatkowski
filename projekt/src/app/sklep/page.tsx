"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [error,setError] = useState<string>("")
  useEffect(()=>{
    document.title="Sklep z akcesoriami"
  })
  async function zapiszobrazek(obraz:string) {
    try {
      const response = await fetch(`/${obraz}`);
      if (!response.ok) throw new Error("Błąd pobierania obrazka");

      const blob = await response.blob();
      const odczyt = new FileReader();
      odczyt.readAsDataURL(blob);
      odczyt.onloadend = () => {
        const base64String = odczyt.result as string;
        localStorage.setItem("Profilowe", base64String);
      };

    } catch (err) {
      console.error("Błąd podczas pobierania obrazka:", err);
      setError("Nie udało się pobrać obrazka.");
    }
  }
  async function kup(choice:number): Promise<void>{
    const kaska = localStorage.getItem("MilanCoiny")
    if(kaska){
        const parsed_kaska:number = JSON.parse(kaska)
        if(choice==1){
            if(parsed_kaska>=10){
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-10))
                await zapiszobrazek("ja1.jpg")
            }
        }
        else if(choice==2){
            if(parsed_kaska>=20){
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-20))
                await zapiszobrazek("ja2.jpg")
            }
        }
        else if(choice==3){
            if(parsed_kaska>=30){
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-30))
                await zapiszobrazek("ja3.jpg")
            }
        }
    }
  }
  function user():void{
    router.push("/konto-uzytkownika")
  }
  return (
    <main>
      <nav>
        <button onClick={user}>HEJO</button>
      </nav>
      <img src="/ja1.jpg" width="225px"></img>
      <br></br>
      <button onClick={() => kup(1)}>Kup to zdjęcie jako profilowe za 10 MilanCoinów</button>
      <br></br>
      <img src="/ja2.jpg" width="225px"></img>
      <br></br>
      <button onClick={() => kup(2)}>Kup to zdjęcie jako profilowe za 20 MilanCoinów</button>
      <br></br>
      <img src="/ja3.jpg" width="225px"></img>
      <br></br>
      <button onClick={() => kup(3)}>Kup to zdjęcie jako profilowe za 30 MilanCoinów</button>
    </main>
  );
}