"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Yup from "yup";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
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
  useEffect(() => {
    document.title = "🔥Zarejestruj się już teraz!🔥";

    if (session) {
      const osiagniecia:Array<string> = [];
      const odblokowane_filmy:Array<string> = [];
      const odblokowane_id:Array<number> = [];
      localStorage.setItem("email", session.user.email || "");
      localStorage.setItem("Nick", session.user.name || "Nowy Użytkownik");
      localStorage.setItem("Poziom", JSON.stringify(1));
      localStorage.setItem("MilanCoiny", JSON.stringify(0));
      localStorage.setItem("Zapisane Quizy", JSON.stringify([]));
      localStorage.setItem("Zapisane Quizy ID", JSON.stringify([]));
      localStorage.setItem("Osiągnięcia", JSON.stringify(osiagniecia));
      localStorage.setItem("Odblokowane Filmy", JSON.stringify(odblokowane_filmy));
      localStorage.setItem("Odblokowane Quizy", JSON.stringify(odblokowane_id));
      localStorage.setItem("Utworzone Quizy", JSON.stringify(0));
      localStorage.setItem("Zakupione Awatary", JSON.stringify(0));
      localStorage.setItem("Wydano na Awatary", JSON.stringify(0));
      zapiszobrazek()
      router.push("/");
    }
  }, [session]);

  function rejestracja(dane: {email:string,haslo:string,powtorzhaslo:string,nick:string}) {
    if (!dane.email || !dane.haslo || !dane.powtorzhaslo || !dane.nick) {
      setError("Wszystkie pola są wymagane!");
      return;
    }

    if (dane.haslo !== dane.powtorzhaslo) {
      setError("Hasła się nie zgadzają!");
      return;
    }

    const osiagniecia:Array<string> = [];
    const odblokowane_filmy:Array<string> = [];
    const odblokowane_id:Array<number> = [];
    localStorage.setItem("email", dane.email);
    localStorage.setItem("Nick", dane.nick);
    localStorage.setItem("haslo", dane.haslo);
    localStorage.setItem("Poziom", JSON.stringify(1));
    localStorage.setItem("Osiągnięcia", JSON.stringify(osiagniecia));
    localStorage.setItem("Odblokowane Filmy", JSON.stringify(odblokowane_filmy));
    localStorage.setItem("Odblokowane Quizy", JSON.stringify(odblokowane_id));
    localStorage.setItem("Utworzone Quizy", JSON.stringify(0));
    localStorage.setItem("MilanCoiny", JSON.stringify(0));
    localStorage.setItem("Zakupione Awatary", JSON.stringify(0));
    localStorage.setItem("Wydano na Awatary", JSON.stringify(0));
    localStorage.setItem("Zapisane Quizy", JSON.stringify([]));
    localStorage.setItem("Zapisane Quizy ID", JSON.stringify([]));
    zapiszobrazek()
    router.push("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-6">
      {session ? (
        <div className="text-center bg-white p-6 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            Witaj, {session.user.name}!
          </h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Wyloguj się
          </button>
        </div>
      ) : (
        <Formik
          initialValues={{ email: "", haslo: "", powtorzhaslo: "", nick: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Nieprawidłowy email").required("Wymagane"),
            haslo: Yup.string().min(6, "Min. 6 znaków").required("Wymagane"),
            powtorzhaslo: Yup.string()
              .oneOf([Yup.ref("haslo")], "Hasła muszą być takie same")
              .required("Potwierdzenie hasła jest wymagane"),
            nick: Yup.string().min(4, "Min. 4 znaki").required("Wymagane"),
          })}
          onSubmit={rejestracja}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-2xl w-80">
              {error && (
                <div className="text-red-500 font-semibold text-center">{error}</div>
              )}

              <label className="font-bold text-gray-700">Email:</label>
              <Field
                type="email"
                name="email"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

              <label className="font-bold text-gray-700">Nick:</label>
              <Field
                name="nick"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage name="nick" component="div" className="text-red-500 text-sm" />

              <label className="font-bold text-gray-700">Hasło:</label>
              <Field
                type="password"
                name="haslo"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage name="haslo" component="div" className="text-red-500 text-sm" />

              <label className="font-bold text-gray-700">Powtórz hasło:</label>
              <Field
                type="password"
                name="powtorzhaslo"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage name="powtorzhaslo" component="div" className="text-red-500 text-sm" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Zarejestruj
              </button>

              <button
                type="button"
                onClick={() => signIn("google")}
                className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Zaloguj się przez Google
              </button>
            </Form>
          )}
        </Formik>
      )}
    </main>
  );
}
