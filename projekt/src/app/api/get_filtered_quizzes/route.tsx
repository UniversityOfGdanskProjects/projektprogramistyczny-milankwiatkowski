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
  tworca:string
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
    const { searchParams } = new URL(req.url);
    const params = searchParams.get("value");
    const helper:Quiz[] = []
    const finder_nazwa = quizy.filter(p => String(p.nazwa_quizu).toLowerCase() === params)
    const finder_kategorie = quizy.map((x)=>{
      const finder = x.gatunki_nazwy.find(y => y.toLowerCase() === params)
      if(finder!==undefined){
        helper.push(x)
      }
    })
    const final_tab = [...finder_nazwa,...helper]
    return NextResponse.json({final_tab})
}