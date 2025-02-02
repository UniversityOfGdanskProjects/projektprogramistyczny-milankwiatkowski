import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const sciezka = path.join(process.cwd(), "public", "database.json");
type Quiz = {
    quiz_id: number,
    tytul:string,
    opis:string,
    podpowiedz:string,
    typ_quizu:string,
    gatunki:Array<number>,
    ocena:number,
    rok_produkcji:string
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