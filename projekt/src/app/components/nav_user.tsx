"use client";
import { useRouter } from "next/navigation";
export default function Nawigacja(){
    const router = useRouter()
    function glowna(): void{
        router.push("/")
    }
    return(
        <main>
            <button onClick={glowna}>Strona główna</button>
        </main>
    )
}