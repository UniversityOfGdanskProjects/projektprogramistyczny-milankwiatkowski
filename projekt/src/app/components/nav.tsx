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
      router.push(`/wyszukane-quizy/${dane.value}`)
    }
    useEffect(() => {
        const profiloweZLocalStorage = localStorage.getItem("Profilowe");
        setProfilowe(profiloweZLocalStorage);
    }, []);
    return (
      <nav className="relative fixed top-0 left-0 w-full flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 py-6 px-10 shadow-md z-50 mb-0">
        <div className="flex items-center mr-4">
          <div
            onClick={user}
            className="cursor-pointer transition-transform transform hover:scale-105"
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
            width="100px" 
            className="cursor-pointer transition-transform transform hover:scale-105" 
            onClick={glowna} 
          />
        </div>
    
        <Formik
                  initialValues={{ value: "",}}
                  validationSchema={Yup.object({
                    value: Yup.string().required("Wymagane"),
                  })}
                  onSubmit={(values) => move_to_filter(values)}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-2xl w-80">
                      {error && <div className="text-red-500 font-semibold text-center">{error}</div>}
                      <Field
                        name="value"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <ErrorMessage
                        name="value"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
                      >
                        Wyślij
                      </button>
                    </Form>
                  )}
                </Formik>
      </nav>
    );
}