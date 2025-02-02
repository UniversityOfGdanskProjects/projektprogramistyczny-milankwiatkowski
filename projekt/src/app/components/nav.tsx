"use client";
import { useRouter } from "next/navigation";
export default function Nawigacja(){
    const router = useRouter()
    function user(): void{
        router.push("/konto-uzytkownika")
    }
    function glowna(): void{
        router.push("/")
    }
    function fota(){
        return localStorage.getItem("Profilowe");
    }
    const profilowe = fota()
    return(
        <main>
            <div onClick={user}>{profilowe ? (
                <img src={profilowe} alt="Obrazek z localStorage" width="50px"/>) : (
        <p></p>)}</div>
            <button onClick={glowna}>Strona główna</button>
        </main>
    )
}