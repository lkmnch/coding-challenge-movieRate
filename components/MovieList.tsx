import { CommentType, MovieType, RatingType } from "@/lib/types/movie"

import MovieCard from "./MovieCard"

//Funktion, um alle Filme vom API-Endpoint zu holen mit REST-Methode GET
async function getAllMovies(): Promise<MovieType[]> {
	const res = await fetch("http://localhost:3000/api/movies", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	})

	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}

	return res.json()
}
//Funktion, um alle Ratings vom API-Endpoint zu holen mit REST-Methode GET
async function getAllRatings(): Promise<RatingType[]> {
	const res = await fetch(`http:localhost:3000/api/movies/ratings`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	})
	if (!res.ok) {
		throw new Error("Failed to fetch Ratings")
	}
	return res.json()
}
//Funktion, um alle Kommentare vom API-Endpoint zu holen mit REST-Methode GET
async function getAllComments(): Promise<CommentType[]> {
	const res = await fetch(`http:localhost:3000/api/movies/comments`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	})
	if (!res.ok) {
		throw new Error("Failed to fetch Comments")
	}
	return res.json()
}

async function MovieList() {
	const movies: MovieType[] = await getAllMovies()
	const allRatings: RatingType[] = await getAllRatings()
	const allComments: CommentType[] = await getAllComments()
	return (
		<div>
			{!movies.length ? (
				<div className='text-3xl'>
					Keine Filme vorhanden, leg einen neuen Film an.
				</div>
			) : (
				<div>
					{/* Über das movie array wird iteriert und für jeden Film wird ein MovieCard-Element erstellt, welches die Informationen des Films, die Ratings und die Kommentare enthält. */}
					{movies.map((movie) => {
						const movieRatings = allRatings.filter(
							(rating) => rating.movie_id === movie.movie_id
						)
						const movieComments = allComments.filter(
							(comment) => comment.movie_id === movie.movie_id
						)

						return (
							<MovieCard
								key={movie.movie_id}
								movieData={movie}
								ratings={movieRatings}
								comments={movieComments}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default MovieList
