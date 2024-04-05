"use client"
import { MovieType, RatingType, CommentType } from "@/lib/types/movie"
import { Ratings } from "./Ratings"
import RateMovie from "./RateMovie"
import CommentSection from "./CommentSection"
import { useEffect, useState } from "react"

function MoviePage({
	movie,
	ratingsData,
	comments,
}: {
	movie: MovieType
	ratingsData: RatingType[]
	comments: CommentType[]
}) {
	const [ratings, setRatings] = useState<RatingType[]>(ratingsData)
	const [averageRating, setAverageRating] = useState(0)

	// Berechnung des Durchschnitts der Bewertungen, indem die Bewertungen zusammengezählt und durch die Anzahl der Bewertungen geteilt wird und auf eine Nachkommastelle gerundet wird
	useEffect(() => {
		setAverageRating(
			ratings.length
				? +(
						ratings.reduce((sum, rating) => sum + rating.rating, 0) /
						ratings.length
				  ).toFixed(1)
				: 0
		)
	}, [ratings])

	return (
		<div className='ms-2 me-2 mt-2'>
			<div className='flex gap-4 items-center justify-between'>
				<img
					src={movie.img ? movie.img : "/defaults/defaultImage_film.png"}
					alt='movie poster'
					className='w-32 rounded-sm lg:w-48'
				/>

				<div className=' border-1 shadow-sm p-4 h-fit bg-slate-300 rounded-sm flex flex-col gap-1 items-center'>
					<p className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						{averageRating}/5
					</p>

					<div className=' flex'>
						<Ratings rating={averageRating} />
					</div>
					<p>{ratings ? ratings.length : 0} Bewertungen</p>
				</div>
			</div>
			<h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
				{movie.title}
			</h1>
			<span className='font-thin'>
				{movie.release_year} - {`${movie.movie_length} min`}
			</span>
			<p className='leading-7 [&:not(:first-child)]:mt-6 mb-3'>
				{movie.description}
			</p>
			<RateMovie
				movie_id={movie.movie_id}
				ratings={ratings}
				setRatings={setRatings}
			/>
			<CommentSection movie_id={movie.movie_id} commentsData={comments} />
		</div>
	)
}

export default MoviePage
