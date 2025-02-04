"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sklep() {
  const router = useRouter()
  const [Alert, pokazalert] = useState(false);
  const [latestalert,pokazalert2] = useState<string>("")
  const [error,setError] = useState<string>("")
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
    const awatary = localStorage.getItem("Zakupione Awatary")
    const wydano = localStorage.getItem("Wydano na Awatary")
    if(kaska && awatary && wydano){
        const parsed_kaska:number = JSON.parse(kaska)
        const parsed_awatary:number = JSON.parse(awatary)
        const parsed_wydano:number = JSON.parse(wydano)
        if(choice==1){
            if(parsed_kaska>=100){
                pokazalert(true)
                pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 100 MilanCoinów!")
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-100))
                localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
                localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+100))
                if(parsed_awatary>4){
                  osiagniecia("Kolekcjoner")
                }
                if(parsed_wydano+100>6000){
                  osiagniecia("Burżuazja")
                }
                await zapiszobrazek("ja1.jpg")
            }
            else{
              pokazalert(true)
              pokazalert2("Nie starczy Ci środków :(")
            }
        }
        else if(choice==2){
            if(parsed_kaska>=200){
                pokazalert(true)
                pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 200 MilanCoinów!")
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-200))
                localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
                localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+200))
                if(parsed_awatary>4){
                  osiagniecia("Kolekcjoner")
                }
                if(parsed_wydano+200>6000){
                  osiagniecia("Burżuazja")
                }
                await zapiszobrazek("ja2.jpg")
            }
            else{
              pokazalert(true)
              pokazalert2("Nie starczy Ci środków :(")
            }
        }
        else if(choice==3){
            if(parsed_kaska>=300){
                pokazalert(true)
                pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 300 MilanCoinów!")
                localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-300))
                localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
                localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+300))
                if(parsed_awatary>4){
                  osiagniecia("Kolekcjoner")
                }
                if(parsed_wydano+300>6000){
                  osiagniecia("Burżuazja")
                }
                await zapiszobrazek("ja3.jpg")
            }
            else{
              pokazalert(true)
              pokazalert2("Nie starczy Ci środków :(")
            }
        }
        else if(choice==4){
          if(parsed_kaska>=400){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 400 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-400))
              localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
              localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+400))
              if(parsed_awatary>4){
                osiagniecia("Kolekcjoner")
              }
              if(parsed_wydano+400>6000){
                osiagniecia("Burżuazja")
              }
              await zapiszobrazek("bartolini-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==5){
          if(parsed_kaska>=500){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 500 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-500))
              localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
              localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+500))
              if(parsed_awatary>4){
                osiagniecia("Kolekcjoner")
              }
              if(parsed_wydano+500>6000){
                osiagniecia("Burżuazja")
              }
              await zapiszobrazek("gibalski-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==6){
          if(parsed_kaska>=600){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 600 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-600))
              localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
              localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+600))
              if(parsed_awatary>4){
                osiagniecia("Kolekcjoner")
              }
              if(parsed_wydano+600>6000){
                osiagniecia("Burżuazja")
              }
              await zapiszobrazek("osiol-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==7){
          if(parsed_kaska>=1000){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 1000 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-1000))
              localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
              localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+1000))
              if(parsed_awatary>4){
                osiagniecia("Kolekcjoner")
              }
              if(parsed_wydano+1000>6000){
                osiagniecia("Burżuazja")
              }
              await zapiszobrazek("wojt-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==8){
          if(parsed_kaska>=1000){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 1000 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-1000))
              localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
              localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+1000))
              if(parsed_awatary>4){
                osiagniecia("Kolekcjoner")
              }
              if(parsed_wydano+1000>6000){
                osiagniecia("Burżuazja")
              }
              await zapiszobrazek("ksiadz-cropped.png")
          }
          else{
            pokazalert(true)
            pokazalert2("Nie starczy Ci środków :(")
          }
        }
        else if(choice==9){
          if(parsed_kaska>=10000){
              pokazalert(true)
              pokazalert2("Brawo, zakupiłeś nowe zdjęcie profilowe za 10000 MilanCoinów!")
              localStorage.setItem("MilanCoiny",JSON.stringify(parsed_kaska-10000))
              localStorage.setItem("Zakupione Awatary",JSON.stringify(parsed_awatary+1))
              localStorage.setItem("Wydano na Awatary",JSON.stringify(parsed_wydano+10000))
              if(parsed_awatary>4){
                osiagniecia("Kolekcjoner")
              }
              osiagniecia("Burżuazja")
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