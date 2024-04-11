export type MovieType = {
	movie_id: number
	user_id: number
	title: string
	description: string
	release_year: number
	movie_length: number
	img: string | null
}

export type RatingType = {
	rating_id?: number
	user_id: number
	movie_id: number
	rating: number
}

export type CommentType = {
	comment_id?: number
	user_id: number
	movie_id: number
	comment: string
}
