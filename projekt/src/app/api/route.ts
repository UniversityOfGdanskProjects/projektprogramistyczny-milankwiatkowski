import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const sciezka = path.join(process.cwd(), "public", "database.json");

function wczytajDane() {
  try {
    const data = fs.readFileSync(sciezka, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function zapiszDane(data: any) {
  fs.writeFileSync(sciezka, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const quizzes = wczytajDane();
  return NextResponse.json(quizzes);
}

export async function POST(req: Request) {
  try {
    const newQuiz = await req.json();
    const quizzes = wczytajDane();
    quizzes.push(newQuiz); 
    zapiszDane(quizzes);
    return NextResponse.json({ message: "Quiz zapisany!", quiz: newQuiz });
  } catch (error) {
    return NextResponse.json({ error: "Błąd zapisu do pliku" }, { status: 500 });
  }
}
