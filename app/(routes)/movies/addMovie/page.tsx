import AddMovie from "@/components/AddMovie"
import React from "react"

function page() {
	return (
		<div className='container mt-5 overflow-auto'>
			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight  mb-5'>
				Film hinzufügen
			</h1>
			<AddMovie />
		</div>
	)
}

export default page
