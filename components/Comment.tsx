import { CommentType } from "@/lib/types/movie"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Trash2, User } from "lucide-react"
import { Button } from "./ui/button"

function Comment({
	comment,
	setComments,
	movie_id,
}: {
	comment: CommentType
	setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
	movie_id: number | undefined
}) {
	const pathname = usePathname()
	const router = useRouter()
	// Funktion, um einen Kommentar an den API-Endpunkt zu senden, damit er anhand seiner ID gelöscht wird
	const handleDeleteComment = async (comment_id: number) => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/movies/${movie_id}/comments`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ comment_id }),
				}
			)
			setComments((prev) => prev.filter((c) => c.comment_id !== comment_id))
			router.refresh()
			console.log("Comment deleted successfully")
		} catch (error) {
			console.log("🚀 ~ handleDeleteComment ~ error:", error)
		}
	}

	return (
		<div
			key={comment.comment_id}
			className='border-1 shadow-sm flex justify-between p-2'>
			<div className='flex gap-3 items-center'>
				<Avatar className='w-14 h-14 '>
					<AvatarImage />
					<AvatarFallback className='bg-slate-300'>
						<User />
					</AvatarFallback>
				</Avatar>
				<div>
					<div className='text-xs font-semibold'>username</div>
					<span>{comment.comment}</span>
				</div>
			</div>
			{/* Auf der Seite /movies/admin/:id wird ein Button zum Löschen des Kommentars angezeigt */}
			{pathname == `/movies/admin/${movie_id}` && (
				<Button
					variant={"ghost"}
					onClick={() =>
						comment.comment_id && handleDeleteComment(comment.comment_id)
					}>
					<Trash2 className='w-6 h-6 text-red-500' />
				</Button>
			)}
		</div>
	)
}

export default Comment
