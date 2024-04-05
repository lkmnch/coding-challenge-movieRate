import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import { NextRequest, NextResponse } from "next/server"
import { CommentType } from "@/lib/types/movie"

let db: Database | null = null

// Funktion, die alle Kommentare zu einem Film aus der Datenbank holt
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

	const comments = await db.all("SELECT * FROM comment WHERE movie_id = ?", id)
	if (!comments) {
		return new Response(JSON.stringify({ error: "No Ratings" }), {
			headers: {
				"Content-Type": "application/json",
			},
			status: 404,
		})
	}
	return new Response(JSON.stringify(comments), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}
// Funktion, die einen Kommentar zu einem Film in der Datenbank speichert
export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id
	const comment: CommentType = await req.json()
	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}

	const result = await db.run(
		"INSERT INTO comment (user_id, movie_id, comment) VALUES (?, ?, ?)",
		comment.user_id,
		comment.movie_id,
		comment.comment
	)
	return new Response(
		JSON.stringify({ message: "Comment added successfully" }),
		{
			headers: { "Content-Type": "application/json" },
			status: 200,
		}
	)
}
// Funktion, die einen Kommentar zu einem Film in der Datenbank löscht
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> {
	const id = params.id
	const { comment_id } = await req.json()

	if (!db) {
		db = await open({
			filename: "./movie.db",
			driver: sqlite3.Database,
		})
	}

	await db.run(
		"DELETE FROM comment WHERE movie_id = ? and comment_id = ?",
		id,
		comment_id
	)

	return new NextResponse(JSON.stringify({ message: "Comment deleted" }), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	})
}
