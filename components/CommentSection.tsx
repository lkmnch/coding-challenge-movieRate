"use client"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { SendHorizontal, Trash2, User } from "lucide-react"
import { CommentType } from "@/lib/types/movie"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import CommentList from "./CommentList"

interface CommentSectionProps {
	commentsData: CommentType[]
	movie_id: number
}

function CommentSection({ commentsData, movie_id }: CommentSectionProps) {
	const [comments, setComments] = useState<CommentType[]>(commentsData)

	// Erstellung eines Validierungsschemas für das Kommentarformular
	const formSchema = z.object({
		comment: z
			.string()
			.min(1, { message: "Kommentar darf nicht leer sein" })
			.max(500, { message: "Kommentar zu lang" }),
	})

	// Verwendung von react-hook-form, um das Formular zu steuern und die Validierung durchzuführen
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
		},
	})

	// Funktion, um das Kommentarformular an den API-Endpunkt zu senden
	const onSubmit = async (data: { comment: string }) => {
		const commentData: CommentType = {
			user_id: 1,
			movie_id: movie_id,
			comment: data.comment,
		}

		try {
			const res = await fetch(
				`http://localhost:3000/api/movies/${movie_id}/comments`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(commentData),
				}
			)

			form.reset() // Formular zurücksetzen
			// Erhöhen der Kommentar-ID, um eine eindeutige ID für den neuen Kommentar zu erhalten
			let newCommentId = 0
			if (comments) {
				if (comments[comments.length - 1]?.comment_id) {
					newCommentId = comments[comments.length - 1].comment_id! + 1
					setComments((comments) => [
						...comments,
						{ comment_id: newCommentId, ...commentData },
					])
				} else {
					setComments((comments) => [
						...comments,
						{ comment_id: newCommentId, ...commentData },
					])
				}
			}
			console.log("Comment added successfully")
		} catch (error) {
			console.log("🚀 ~ onSubmit ~ error:", error)
		}
	}

	return (
		<div className='flex flex-col gap-2'>
			<CommentList
				comments={comments}
				setComments={setComments}
				movie_id={movie_id}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-1'>
						<FormField
							control={form.control}
							name='comment'
							render={({ field }) => (
								<FormItem className='w-3/4 p-2 flex-grow'>
									<div className='flex gap-3 items-center flex-grow'>
										<Avatar className='w-14 h-14 '>
											<AvatarImage />
											<AvatarFallback className='bg-slate-300'>
												<User />
											</AvatarFallback>
										</Avatar>
										<FormControl className='flex-grow'>
											<Input
												type='text'
												placeholder='Kommentar hinzufügen...'
												className=' text-lg h-fit w-full'
												{...field}
											/>
										</FormControl>
										<Button variant={"ghost"} type='submit' className='p-0'>
											<SendHorizontal size={"30px"} color='#222020' />
										</Button>
									</div>
									<FormMessage className='ms-16' />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CommentList>
		</div>
	)
}

export default CommentSection
