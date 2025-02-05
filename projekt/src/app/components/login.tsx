"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter()
  useEffect(()=>{
    document.title="Zaloguj się do Filmdle!"
  })
  function login(dane: {email:string,haslo:string}): void {
    if (!dane.email || !dane.haslo) {
      setError("Wszystkie pola są wymagane!");
      return;
    }
    if ((dane.email === "test@gmail.com" && dane.haslo === "haslo1") || (dane.email == localStorage.getItem("email") && dane.haslo == localStorage.getItem("haslo"))) {
      setIsLoggedIn(true);
      setError("");
      router.push("/")
    } else {
      setError("Nieprawidłowy e-mail lub hasło!");
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 p-6">
      {isLoggedIn ? (
        <div className="text-center bg-white p-6 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">Witaj!</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Wyloguj
          </button>
        </div>
      ) : (
        <Formik
          initialValues={{ email: "", haslo: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Nieprawidłowy email").required("Wymagane"),
            haslo: Yup.string().required("Wymagane"),
          })}
          onSubmit={login}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-2xl w-80">
              {error && <div className="text-red-500 font-semibold text-center">{error}</div>}
  
              <label className="font-bold text-gray-700">Email:</label>
              <Field
                type="email"
                name="email"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
  
              <label className="font-bold text-gray-700">Hasło:</label>
              <Field
                type="password"
                name="haslo"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="haslo"
                component="div"
                className="text-red-500 text-sm"
              />
  
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Zarejestruj
              </button>
            </Form>
          )}
        </Formik>
      )}
    </main>
  );
}
