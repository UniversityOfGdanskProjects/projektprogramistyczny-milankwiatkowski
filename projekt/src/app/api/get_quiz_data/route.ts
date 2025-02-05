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

function zapiszDane(data: JSON): void {
  fs.writeFileSync(sciezka, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(req: Request) {
    const quizy:Quiz[] = await wczytajDane();
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    const finder = quizy.find(p => p.quiz_id === id)
    return NextResponse.json({finder})
}

export async function POST(req: Request) {
  try {
    const newQuiz = await req.json();
    const quizzes = wczytajDane();
    quizzes.push(newQuiz); 
    zapiszDane(quizzes);
    return NextResponse.json({ message: "Quiz zapisany!", quiz: newQuiz });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Błąd zapisu do pliku" }, { status: 500 });
  }
}
