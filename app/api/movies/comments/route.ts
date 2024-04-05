import sqlite3 from "sqlite3"
import { NextRequest, NextResponse } from "next/server"
import { open, Database } from "sqlite"

let db: Database | null = null

// Funktion, die alle Kommentare aus der Datenbank holt
export async function GET(): Promise<NextResponse> {
	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}
	const allComments = await db.all("SELECT * FROM comment ")

	return new NextResponse(JSON.stringify(allComments), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}
