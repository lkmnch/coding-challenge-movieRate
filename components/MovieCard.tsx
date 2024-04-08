"use client"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card"
import Link from "next/link"
import { Ratings } from "./Ratings"
import { CommentType, MovieType, RatingType } from "@/lib/types/movie"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"

interface MovieProps {
	movieData: MovieType
	ratings: RatingType[]
	comments: CommentType[]
}

function MovieCard({ movieData, ratings, comments }: MovieProps) {
	const [movie, setMovie] = React.useState<MovieType | null>(movieData)
	const router = useRouter()
	const pathname = usePathname()

	// Berechnung des Durchschnitts der Ratings, indem die Summe aller Ratings durch die Anzahl der Ratings geteilt wird und auf eine Nachkommastelle gerundet wird
	const averageRating = ratings.length
		? +(
				ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
		  ).toFixed(1)
		: 0
	// Funktion, um einen Film zu löschen, indem der API-Endpoint mit der REST-Methode DELETE für den jeweiligen Film aufgerufen wird
	const handleDelete = async () => {
		try {
			if (!movie) {
				return
			}
			const res = await fetch(
				`http://localhost:3000/api/movies/${movie.movie_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			console.log("Movie deleted successfully")
			// Wenn der Film gelöscht wurde wird der state auf null gesetzt, damit das MovieCard-Element nicht mehr gerendert wird
			setMovie(null)
			router.refresh()
		} catch (error) {
			console.log("🚀 ~ handleDelete ~ error:", error)
		}
	}
	return (
		<div>
			{/* Wenn der Pfad /movies ist, wird das MovieCard-Element ohne den Delete-Button gerendert */}
			{movie && pathname == "/movies" ? (
				<div>
					<Card className=' hover:bg-slate-50 w-full mb-2'>
						<Link
							href={`/movies/${movie.movie_id}`}
							className='flex p-4 content-center'>
							<div>
								<img
									id='CardImage'
									src={
										movie.img !== null
											? `/posters/${movie.img}`
											: "/defaults/defaultImage_film.png"
									}
									alt='Image of Movie Poster'
									className='w-32'
								/>
							</div>
							<div>
								<CardHeader className='pt-0 pb-1'>
									<CardTitle>{movie.title}</CardTitle>
									<CardDescription>
										{movie.release_year} - {`${movie.movie_length} min`}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='flex'>
										<Ratings rating={averageRating} />
									</div>

									<span>
										{comments.length == 1
											? `${comments.length} Kommentar`
											: `${comments.length} Kommentare`}
									</span>
								</CardContent>
							</div>
						</Link>
					</Card>
				</div>
			) : (
				movie && (
					<div>
						<Card className=' hover:bg-slate-50 w-full mb-2'>
							<div className='flex justify-between'>
								<Link
									href={`/movies/admin/${movie.movie_id}`}
									className='flex p-4 content-center'>
									<div>
										<img
											id='CardImage'
											src={
												movie.img !== null
													? `/posters/${movie.img}`
													: "/defaults/defaultImage_film.png"
											}
											alt='Image of Movie Poster'
											className='w-32'
										/>
									</div>
									<div>
										<CardHeader className='pt-0 pb-1'>
											<CardTitle>{movie.title}</CardTitle>
											<CardDescription>
												{movie.release_year} - {`${movie.movie_length} min`}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className='flex'>
												<Ratings rating={averageRating} />
											</div>

											<span>
												{comments.length == 1
													? `${comments.length} Kommentar`
													: `${comments.length} Kommentare`}
											</span>
										</CardContent>
									</div>
								</Link>
								<Button variant={"ghost"} onClick={() => handleDelete()}>
									<Trash2 className='w-6 h-6 text-red-500' />
								</Button>
							</div>
						</Card>
					</div>
				)
			)}
		</div>
	)
}

export default MovieCard
