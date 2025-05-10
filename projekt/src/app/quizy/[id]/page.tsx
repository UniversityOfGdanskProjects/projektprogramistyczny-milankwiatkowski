"use client";
import Quiz from "@/app/components/quiz_gra"
import Nawigacja from "@/app/components/nav"
import Stopka from "@/app/components/stopka"
export default function Rejestracja({ params }: { params: { id: string }}) {
  return (<><Nawigacja/><Quiz params={params}/><Stopka/></>)
}