import { MovieType } from "@/app/(routes)/page"
import React, { useEffect } from "react"
import Movie from "./Movie"

interface MovieListProps {
	movies: MovieType[]
}

function MovieList({ movies }: MovieListProps) {
	return (
		<div>
			{movies.map((movie) => (
				<Movie
					key={movie.movieId}
					movieId={movie.movieId}
					title={movie.title}
					description={movie.description}
					releaseYear={movie.release_year}
					movieLength={movie.movie_length}
					img={movie.img}
				/>
			))}
		</div>
	)
}

export default MovieList
