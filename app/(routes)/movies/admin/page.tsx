import MovieList from "@/components/MovieList"

export default async function Page() {
	return (
		<div className='ms-4 me-4'>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight  mb-4'>
				Meine Filme bearbeiten
			</h1>
			<MovieList />
		</div>
	)
}
