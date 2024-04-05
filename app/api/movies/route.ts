import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"

let db: Database | null = null

// Funktion um alle Filme aus der DB zu holen
export async function GET(req: Request, res: Response): Promise<Response> {
	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}
	const movies = await db.all("SELECT * FROM movie")

	return new Response(JSON.stringify(movies), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}

// Funktion, um einen Film in die DB hinzuzufügen
export async function POST(req: Request, res: Response): Promise<Response> {
	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}
	const movie = await req.json()
	const result = await db.run(
		"INSERT INTO movie (user_id, title, description, release_year, movie_length) VALUES (?, ?, ?, ?, ?)",
		1,
		movie.movieTitle,
		movie.description,
		movie.releaseYear,
		movie.duration
	)
	return new Response(JSON.stringify(result), {
		headers: { "Content-Type": "application/json" },
		status: 201,
	})
}
