"use client";
import Nawigacja from "@/app/components/nav"
import Filtrowanie from "@/app/components/filtrowanie"
import Stopka from "@/app/components/stopka"
export default function Filtr({ params }: { params: { value: string } }) {
  return (<><Nawigacja/><Filtrowanie params={params}/><Stopka/></>)
}