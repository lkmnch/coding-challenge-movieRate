import React from "react"

function MoviePoster({ src }: { src?: string }) {
	return (
		<img
			src={src ? src : "/defaults/defaultImage_film.png"}
			alt='image of movie poster'
			className='w-20'
		/>
	)
}

export default MoviePoster
