"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError("Wszystkie pola są wymagane!");
      return;
    }
    if ((email === "test@gmail.com" && password === "haslo1") || (email == localStorage.getItem("email") && password == localStorage.getItem("haslo"))) {
      setIsLoggedIn(true);
      setError("");
      router.push("/")
    } else {
      setError("Nieprawidłowy e-mail lub hasło!");
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
          
          <button type="submit" className="bg-blue-500 text-white p-2">Zaloguj się</button>
        </form>
      )}
    </main>
  );
}
