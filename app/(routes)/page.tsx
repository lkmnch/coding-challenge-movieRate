import MovieList from "@/components/MovieList"

export type MovieType = {
	movieId: number
	userId: number
	title: string
	description: string
	release_year: number
	movie_length: number
	img: string
}

//Funktion, um die Filme vom API-Endpoint zu holen mit REST-Methode GET
async function getData() {
	const res = await fetch("http://localhost:3001/api", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})

	if (!(res.status === 200)) {
		throw new Error("Failed to fetch data")
	}

	return res.json()
}

export default async function Page() {
	const movies = (await getData()) as MovieType[]
	return <MovieList movies={movies} />
}
