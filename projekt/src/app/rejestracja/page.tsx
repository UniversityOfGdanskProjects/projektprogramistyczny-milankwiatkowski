"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
    useEffect(()=>{
      document.title="🔥Zarejestuj się już teraz!🔥"
    })
  function rejestracja(dane: { email: string; haslo: string; powtorzhaslo: string }) {
    if (!dane.email || !dane.haslo || !dane.powtorzhaslo) {
      setError("Wszystkie pola są wymagane!");
      return;
    }
    async function zapiszobrazek() {
      try {
        const response = await fetch(`/user-icon.png`);
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
    if (dane.haslo === dane.powtorzhaslo) {
      setError("");
      const osiagniecia: string[] = [];
      const odblokowane_filmy: string[] = [];
      const odblokowane_id: number[] = []
      localStorage.setItem("email", dane.email);
      localStorage.setItem("haslo", dane.haslo);
      localStorage.setItem("Poziom", JSON.stringify(1));
      localStorage.setItem("Osiągnięcia", JSON.stringify(osiagniecia));
      localStorage.setItem("Odblokowane Filmy", JSON.stringify(odblokowane_filmy));
      localStorage.setItem("Odblokowane Quizy", JSON.stringify(odblokowane_id));
      localStorage.setItem("Utworzone Quizy", JSON.stringify(0));
      localStorage.setItem("MilanCoiny", JSON.stringify(0));
      zapiszobrazek()
      router.push("/login");
    } else {
      setError("Hasła się nie zgadzają!");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {isLoggedIn ? (
        <div>
          <h1>Witaj!</h1>
          <button onClick={() => setIsLoggedIn(false)}>Wyloguj</button>
        </div>
      ) : (
        <Formik
          initialValues={{ email: "", haslo: "", powtorzhaslo: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Nieprawidłowy email").required("Wymagane"),
            haslo: Yup.string().min(6, "Min. 6 znaków").required("Wymagane"),
            powtorzhaslo: Yup.string()
              .oneOf([Yup.ref("haslo")], "Hasła muszą być takie same")
              .required("Potwierdzenie hasła jest wymagane"),
          })}
          onSubmit={rejestracja}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              {error && <div className="text-red-500">{error}</div>}
              <label>Email:</label>
              <br></br>
              <Field type="email" name="email" />
              <br></br>
              <ErrorMessage name="email" component="div" className="text-red-500" />

              <label>Hasło:</label>
              <br></br>
              <Field type="password" name="haslo" />
              <br></br>
              <ErrorMessage name="haslo" component="div" className="text-red-500" />

              <label>Powtórz hasło:</label>
              <br></br>
              <Field type="password" name="powtorzhaslo" />
              <br></br>
              <ErrorMessage name="powtorzhaslo" component="div" className="text-red-500" />
              <br></br>
              <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
                Zarejestruj
              </button>
            </Form>
          )}
        </Formik>
      )}
    </main>
  );
}
