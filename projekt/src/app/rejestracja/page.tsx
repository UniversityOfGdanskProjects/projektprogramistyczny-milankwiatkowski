"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setSecondPassword] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter()
  function checkemail(){
    if (email.includes("@")){
      return true
    }
    else{
      return false
    }
  }
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password || !password2) {
      setError("Wszystkie pola są wymagane!");
      return;
    }
    if (password === password2 && checkemail() == true) {
      setError("");
      const osiagniecia: Array<String> = []
      const odblokowane_postacie: Array<String> = []
      localStorage.setItem("email",email)
      localStorage.setItem("haslo",password)
      localStorage.setItem("punkty","0")
      localStorage.setItem("poziom","1")
      localStorage.setItem("osiagniecia",JSON.stringify(osiagniecia))
      localStorage.setItem("odblokowane_postacie",JSON.stringify(odblokowane_postacie))
      router.push("/login")
    } else {
      setError("Nieprawidłowy e-mail lub hasła!");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {isLoggedIn ? (
        <div>
          <h1>Witaj, {email}!</h1>
          <button onClick={() => setIsLoggedIn(false)}>Wyloguj</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <h1>Logowanie</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2"
          />
            <input
            type="password"
            placeholder="Powtórz hasło"
            value={password2}
            onChange={(e) => setSecondPassword(e.target.value)}
            className="border p-2"
          />
          
          <button type="submit" className="bg-blue-500 text-white p-2">Zarejestruj się</button>
        </form>
      )}
    </main>
  );
}
