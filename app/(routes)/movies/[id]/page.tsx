import MoviePage from "@/components/MoviePage"
import React from "react"

// Funktion, um einen Film anhand seiner ID von der API anzufragen
async function getMovie(movieId: string) {
	const res = await fetch(`http://localhost:3000/api/movies/${movieId}`, {
		method: "GET",

		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	})

	if (!res.ok) {
		const errorData = await res.json()
		throw new Error(errorData.error || "Failed to fetch data")
	}

	return res.json()
}
//Funktion, um die Ratings eines Films anhand der Film ID von der API anzufragen
async function getRatings(movieId: string) {
	const res = await fetch(
		`http://localhost:3000/api/movies/${movieId}/ratings`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		}
	)

	if (!res.ok) {
		if (res.status === 404) {
			return []
		} else {
			throw new Error("Failed to fetch Ratings")
		}
	}

	return res.json()
}

//Funktion, um die Kommentare eines Films anhand der Film ID von der API anzufragen
async function getComments(movieId: string) {
	const res = await fetch(
		`http://localhost:3000/api/movies/${movieId}/comments`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		}
	)

	if (!res.ok) {
		if (res.status === 404) {
			return []
		} else {
			throw new Error("Failed to fetch Comments")
		}
	}

	return res.json()
}

async function page({ params }: { params: { id: string } }) {
	const movie = await getMovie(params.id)
	const ratings = await getRatings(params.id)
	const comments = await getComments(params.id)
	return <MoviePage movie={movie} ratingsData={ratings} comments={comments} />
}

export default page
