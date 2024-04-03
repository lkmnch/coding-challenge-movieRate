import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card"
import Link from "next/link"
import Rating from "./Rating"

interface MovieProps {
	movieId: number
	title: string
	description: string
	releaseYear: number
	movieLength: number
	img: string
}

function Movie({
	movieId,
	title,
	description,
	releaseYear,
	movieLength,
	img,
}: MovieProps) {
	return (
		<div>
			<Card className=' hover:bg-slate-50 w-fit m-4'>
				<Link href={`/movies/`} className='flex p-4 content-center'>
					<div>
						<img
							id='CardImage'
							src={img}
							alt='Image of Movie Poster'
							className='w-32'
						/>
					</div>
					<div>
						<CardHeader className='pt-0'>
							<CardTitle>{title}</CardTitle>
							<CardDescription>
								{releaseYear} - {`${movieLength} min`}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Rating />
							<span># Comments</span>
						</CardContent>
					</div>
				</Link>
			</Card>
		</div>
	)
}

export default Movie
