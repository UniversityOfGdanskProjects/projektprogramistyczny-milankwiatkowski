"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ClearLocalStorageButton() {
  const handleClear = () => {
    localStorage.clear();
    alert("LocalStorage wyczyszczone!");
  };

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