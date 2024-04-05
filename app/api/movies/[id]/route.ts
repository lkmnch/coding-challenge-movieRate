import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import { NextRequest, NextResponse } from "next/server"

let db: Database | null = null

// Funktion, um einen Film aus der DB zu holen
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

	const movie = await db.get("SELECT * FROM movie WHERE movie_id = ?", id)

	if (!movie) {
		return new Response(JSON.stringify({ error: "Movie not found" }), {
			headers: {
				"Content-Type": "application/json",
			},
			status: 404,
		})
	}

	return new Response(JSON.stringify(movie), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}

// Funktion, um einen Film und seine ratings sowie Kommentare in der DB zu löschen
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<Response> {
	const id = params.id

	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}

	await db.run("DELETE FROM movie WHERE movie_id = ?", id)
	await db.run("DELETE FROM rating WHERE movie_id = ?", id)
	await db.run("DELETE FROM comment WHERE movie_id = ?", id)

	return new Response(JSON.stringify({ message: "Movie deleted" }), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}
