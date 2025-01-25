"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";
export default function ClearLocalStorageButton() {
  const handleClear = () => {
    localStorage.clear();
    alert("LocalStorage wyczyszczone!");
  };
    useEffect(()=>{
      document.title="Wybierz quiz do rozwiązania!"
    })
  return <button onClick={handleClear}>Wyczyść localStorage</button>;
}
// export default function Home() {
//   const router = useRouter()

//   return (
//     <main>
//         Tryb Graficzny
//     </main>
//   );
// }