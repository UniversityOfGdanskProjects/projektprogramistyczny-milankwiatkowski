"use client";
import { useEffect, useState } from "react";

export default function KontoUzytkownika() {
  const [storageData, setStorageData] = useState<[string, string][]>([]);
  const profilowe = fota()
  function fota(){
    return localStorage.getItem("Profilowe");
  }
  useEffect(()=>{
    document.title="Twoje konto Filmdle"
  })
  useEffect(() => {
    const data: [string, string][] = Object.entries(localStorage);
    const data2: [string,string][] = data.filter(
        ([klucz]) => klucz !== "haslo" && klucz !== "ally-supports-cache" && klucz !== "__NEXT_DISMISS_PRERENDER_INDICATOR" && klucz !== "Profilowe" && klucz !== "Odblokowane Quizy"
      );
    setStorageData(data2);
  }, []);

  return (
    <main>
      <div>{profilowe ? (
        <img src={profilowe} alt="Obrazek z localStorage" width="150px"/>
      ) : (
        <p></p>
      )}</div>
      <h2>Twoje Konto:</h2>
      <ul>
        {storageData.map(([key, value]) => (
          <li key={key}>
            <strong>{key.toUpperCase()}:</strong> {value}
          </li>
        ))}
      </ul>
    </main>
  );
}
