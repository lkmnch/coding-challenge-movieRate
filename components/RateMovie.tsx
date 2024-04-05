import * as React from "react"
import { useState } from "react"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Star } from "lucide-react"
import { Button } from "./ui/button"
import { RatingType } from "@/lib/types/movie"

interface RateMovieProps {
	movie_id: number
	ratings: RatingType[]
	setRatings: React.Dispatch<React.SetStateAction<RatingType[]>>
}
function RateMovie({ movie_id, ratings, setRatings }: RateMovieProps) {
	const [selectedRating, setSelectedRating] = useState("")

	// Funktion, um den Wert des Selects zu ändern
	const handleValueChange = (value: string) => {
		setSelectedRating(value)
	}
	// Funktion, um die Bewertung an den API-Endpunkt zu senden
	const handleSubmit = async () => {
		const data: RatingType = {
			user_id: 1,
			movie_id: movie_id,
			rating: parseInt(selectedRating),
		}
		try {
			const response = await fetch(`/api/movies/${movie_id}/ratings`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})

			let newRatingId = 0
			if (ratings) {
				if (ratings[ratings.length - 1]?.rating_id) {
					newRatingId = ratings[ratings.length - 1].rating_id! + 1
					setRatings((ratings) => [...ratings, { newRatingId, ...data }])
				} else {
					setRatings((ratings) => [...ratings, { newRatingId, ...data }])
				}
			}
			console.log("Rating submitted successfully")
		} catch (error) {
			console.error("Error submitting rating:", error)
		}
	}
	// Funktion, um die Sterne zu rendern, abhängig von der Bewertung des Films wird die Farbe der Sterne geändert (gefüllt oder leer)
	const renderStars = (rating: number) => {
		const stars: React.ReactNode[] = []
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<Star
					key={i}
					size={"15px"}
					fill={i <= rating ? "slate" : "transparent"}
				/>
			)
		}
		return stars
	}

	return (
		<div className='mb-5 flex  gap-1'>
			<Select onValueChange={handleValueChange} value={selectedRating}>
				<SelectTrigger className='w-3/4'>
					<SelectValue placeholder='Bewerte den Film' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Bewertung</SelectLabel>
						<SelectItem value='1'>
							{" "}
							<div className='flex'>{renderStars(1)}</div>
						</SelectItem>
						<SelectItem value='2'>
							<div className='flex'>{renderStars(2)}</div>
						</SelectItem>
						<SelectItem value='3'>
							<div className='flex'>{renderStars(3)}</div>
						</SelectItem>
						<SelectItem value='4'>
							<div className='flex'>{renderStars(4)}</div>
						</SelectItem>
						<SelectItem value='5'>
							<div className='flex'>{renderStars(5)}</div>
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Button onClick={handleSubmit} className='w-1/4'>
				Bewerten
			</Button>
		</div>
	)
}

export default RateMovie
