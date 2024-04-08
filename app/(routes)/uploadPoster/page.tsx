"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

function page() {
	const [file, setFile] = useState<File>()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!file) return
		try {
			const data = new FormData()
			data.set("file", file)

			const res = await fetch("http://localhost:3000/api/upload", {
				method: "POST",
				body: data,
			})
		} catch (error) {
			console.log("🚀 ~ handleSubmit ~ error:", error)
		}
	}
	return (
		<div>
			<form
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
				className='flex'>
				<Input
					type='file'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFile(e.target.files?.[0])
					}
				/>
				<Button type='submit'>Upload File</Button>
			</form>
		</div>
	)
}

export default page
