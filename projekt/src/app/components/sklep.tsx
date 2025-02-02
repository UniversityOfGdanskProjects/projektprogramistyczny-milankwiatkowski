"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sklep() {
  const router = useRouter()
  const [Alert, pokazalert] = useState(false);
  const [latestalert,pokazalert2] = useState<string>("")
  const [error,setError] = useState<string>("")
  useEffect(()=>{
    document.title="Sklep z akcesoriami"
  })
  async function zapiszobrazek(obraz:string) {
    try {
      const response = await fetch(`/profilowe-foty/${obraz}`);
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
                pokazalert(true)
                pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 10 MilanCoinów!")
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-10))
                await zapiszobrazek("ja1.jpg")
            }
            else{
              pokazalert(true)
              pokazalert2("Nie starczy Ci środków :(")
            }
        }
        else if(choice==2){
            if(parsed_kaska>=20){
                pokazalert(true)
                pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 20 MilanCoinów!")
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-20))
                await zapiszobrazek("ja2.jpg")
            }
            else{
              pokazalert(true)
              pokazalert2("Nie starczy Ci środków :(")
            }
        }
        else if(choice==3){
            if(parsed_kaska>=30){
                pokazalert(true)
                pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 30 MilanCoinów!")
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-30))
                await zapiszobrazek("ja3.jpg")
            }
            else{
              pokazalert(true)
              pokazalert2("Nie starczy Ci środków :(")
            }
        }
        else if(choice==4){
          if(parsed_kaska>=40){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 40 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-40))
              await zapiszobrazek("bartolini-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==5){
          if(parsed_kaska>=50){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 50 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-50))
              await zapiszobrazek("gibalski-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==6){
          if(parsed_kaska>=60){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 60 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-60))
              await zapiszobrazek("osiol-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==7){
          if(parsed_kaska>=100){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 100 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-100))
              await zapiszobrazek("wojt-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==8){
          if(parsed_kaska>=100){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 100 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-100))
              await zapiszobrazek("ksiadz-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==9){
          if(parsed_kaska>=1000){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 1000 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-1000))
              await zapiszobrazek("kiler-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
    }
  }
  return (
    <main>
      <img src="profilowe-foty/ja1.jpg" width="225px"></img>
      <br></br>
      <button onClick={() => kup(1)}>Kup to zdjęcie jako profilowe za 10 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/ja2.jpg" width="225px"></img>
      <br></br>
      <button onClick={() => kup(2)}>Kup to zdjęcie jako profilowe za 20 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/ja3.jpg" width="225px"></img>
      <br></br>
      <button onClick={() => kup(3)}>Kup to zdjęcie jako profilowe za 30 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/bartolini-cropped.png" width="225px"></img>
      <br></br>
      <button onClick={() => kup(4)}>Kup to zdjęcie jako profilowe za 40 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/gibalski-cropped.png" width="225px"></img>
      <br></br>
      <button onClick={() => kup(5)}>Kup to zdjęcie jako profilowe za 50 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/osiol-cropped.png" width="225px"></img>
      <br></br>
      <button onClick={() => kup(6)}>Kup to zdjęcie jako profilowe za 60 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/wojt-cropped.png" width="225px"></img>
      <br></br>
      <button onClick={() => kup(7)}>Kup to zdjęcie jako profilowe za 100 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/ksiadz-cropped.png" width="225px"></img>
      <br></br>
      <button onClick={() => kup(8)}>Kup to zdjęcie jako profilowe za 100 MilanCoinów</button>
      <br></br>
      <img src="profilowe-foty/kiler-cropped.png" width="225px"></img>
      <br></br>
      <button onClick={() => kup(9)}>Kup to zdjęcie jako profilowe za 1000 MilanCoinów</button>
      <div>
      {Alert && (
        <div className="custom-alert">
          <p>{latestalert}</p>
          <button onClick={() => pokazalert(false)}>OK</button>
        </div>
      )}
    </div>
    </main>
  );
}