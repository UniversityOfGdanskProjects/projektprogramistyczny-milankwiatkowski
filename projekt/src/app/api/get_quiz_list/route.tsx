import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const sciezka = path.join(process.cwd(), "public", "database.json");
type Quiz = {
  nazwa_quizu:number,
  quiz_id: number,
  tytul:string,
  opis:string,
  podpowiedz:string,
  typ_quizu:string,
  gatunki:Array<number>,
  gatunki_nazwy:Array<string>,
  ocena:number,
  rok_produkcji:string,
  film_id:number,
  sciezka_obraz:string,
  tworca:string,
  popularnosc:number
}
function wczytajDane() {
  try {
    const data = fs.readFileSync(sciezka, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error)
    return [];
  }
}
export async function GET(req: Request) {
    const quizy:Quiz[] = await wczytajDane();
    const graficzne = quizy.filter(p => p.typ_quizu === "Graficzny")
    const tekstowe = quizy.filter(p => p.typ_quizu === "Tekstowy")
    return NextResponse.json({graficzne,tekstowe})
}