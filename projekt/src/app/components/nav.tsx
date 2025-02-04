"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Nawigacja(){
    const router = useRouter()
    const [profilowe, setProfilowe] = useState<string | null>(null);
    function user(): void{
        router.push("/konto-uzytkownika")
    }
    function glowna(): void{
        router.push("/")
    }
    useEffect(() => {
        const profiloweZLocalStorage = localStorage.getItem("Profilowe");
        setProfilowe(profiloweZLocalStorage);
    }, []);
    return(
        <main>
            <div onClick={user}>{profilowe ? (
                <img src={profilowe} alt="Obrazek z localStorage" width="50px"/>) : (
        <p></p>)}</div>
            <button onClick={glowna}>Strona główna</button>
        </main>
    )
}