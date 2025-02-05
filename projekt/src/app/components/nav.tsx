"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function Nawigacja(){
    const router = useRouter()
    const [error, setError] = useState<string>("");
    const [profilowe, setProfilowe] = useState<string | null>(null);
    function user(): void{
        router.push("/konto-uzytkownika")
    }
    function glowna(): void{
        router.push("/")
    }
    function move_to_filter(dane:{value:string}):void{
      router.push(`/wyszukane-quizy/${dane.value.toLowerCase()}`)
    }
    useEffect(() => {
        const profiloweZLocalStorage = localStorage.getItem("Profilowe");
        setProfilowe(profiloweZLocalStorage);
    }, []);
    return (
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 py-6 px-10 shadow-md z-50">
        <div className="flex items-center mr-4">
          <div
            onClick={user}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            {profilowe ? (
              <img
                src={profilowe}
                alt="Obrazek z localStorage"
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm hover:border-yellow-300 transition-colors"
              />
            ) : (
              <p className="text-white italic">Brak zdjęcia</p>
            )}
          </div>
        </div>
    
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="/logo.png"
            width="100"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={glowna}
          />
        </div>
    
        <Formik
          initialValues={{ value: "" }}
          validationSchema={Yup.object({
            value: Yup.string().required("Wymagane"),
          })}
          onSubmit={(values) => move_to_filter(values)}
        >
          {({ isSubmitting }) => (
            <Form className="flex items-center gap-2">
              <Field
                name="value"
                placeholder="Szukaj..."
                className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm placeholder-gray-400 bg-transparent text-white"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white text-sm font-medium px-3 py-1 rounded-full hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Szukaj
              </button>
            </Form>
          )}
        </Formik>
      </nav>
    );
    
    
}