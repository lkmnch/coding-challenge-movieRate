import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import { NextRequest } from "next/server"

let db: Database | null = null

// Funktion, die alle Ratings zu einem Film aus der Datenbank holt
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id
	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}

	const ratings = await db.all("SELECT * FROM rating WHERE movie_id = ? ", id)
	if (!ratings) {
		return new Response(JSON.stringify({ error: "No Ratings" }), {
			headers: {
				"Content-Type": "application/json",
			},
			status: 404,
		})
	}
	return new Response(JSON.stringify(ratings), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}

// Funktion, die ein Rating zu einem Film in der Datenbank speichert
export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params
	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}
	const rating = await req.json()
	const result = await db.run(
		"INSERT INTO rating (movie_id, user_id, rating) VALUES (?, ?, ?)",
		id,
		rating.user_id,
		rating.rating
	)
	return new Response(JSON.stringify(result), {
		headers: { "Content-Type": "application/json" },
		status: 201,
	})
}
