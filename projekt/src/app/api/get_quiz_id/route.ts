import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const sciezka = path.join(process.cwd(), "public", "database.json");

function wczytajDane() {
  try {
    const data = fs.readFileSync(sciezka, "utf-8");
    return (JSON.parse(data).length)
  } catch (error) {
    console.log(error)
    return 0
    }
}

export async function GET() {
  const ilosc = wczytajDane();
  return NextResponse.json(ilosc);
}
