import { NextRequest, NextResponse } from "next/server"
import path, { join } from "path"
import { writeFile } from "fs/promises"

// Funktion mit der ein Bild hochgeladen werden kann
export async function POST(req: NextRequest) {
	const data = await req.formData()
	const file: File | null = data.get("file") as unknown as File

	if (!file) {
		return NextResponse.json({ success: false })
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)

	const path = join(
		"C:/Users/loukm/Desktop/projects/coding-challenge-movieRate/public/posters",
		file.name
	)
	await writeFile(path, buffer)
	console.log(`open ${path} to see the uploaded file`)
	return NextResponse.json({ success: true })
}
