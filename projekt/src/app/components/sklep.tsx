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
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[ 
          { src: "profilowe-foty/ja1.jpg", price: 10, id: 1 },
          { src: "profilowe-foty/ja2.jpg", price: 20, id: 2 },
          { src: "profilowe-foty/ja3.jpg", price: 30, id: 3 },
          { src: "profilowe-foty/bartolini-cropped.png", price: 40, id: 4 },
          { src: "profilowe-foty/gibalski-cropped.png", price: 50, id: 5 },
          { src: "profilowe-foty/osiol-cropped.png", price: 60, id: 6 },
          { src: "profilowe-foty/wojt-cropped.png", price: 100, id: 7 },
          { src: "profilowe-foty/ksiadz-cropped.png", price: 100, id: 8 },
          { src: "profilowe-foty/kiler-cropped.png", price: 1000, id: 9 }
        ].map(({ src, price, id }) => (
          <div key={id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <img src={src} alt={`Profilowe ${id}`} className="w-56 h-56 object-cover rounded-md" />
            <button
              onClick={() => kup(id)}
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition-transform transform hover:scale-105"
            >
              Kup to zdjęcie jako profilowe za {price} MilanCoinów
            </button>
          </div>
        ))}
      </div>
  
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
    </main>
  );
  
}