"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter()
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
      <main className="flex flex-col items-center justify-center h-screen">
        {isLoggedIn ? (
          <div>
            <h1>Witaj!</h1>
            <button onClick={() => setIsLoggedIn(false)}>Wyloguj</button>
          </div>
        ) : (
          <Formik
            initialValues={{ email: "", haslo: ""}}
            validationSchema={Yup.object({
              email: Yup.string().email("Nieprawidłowy email").required("Wymagane"),
              haslo: Yup.string().required("Wymagane"),
            })}
            onSubmit={login}
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
