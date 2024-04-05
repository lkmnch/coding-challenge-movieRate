import { CommentType } from "@/lib/types/movie"
import React from "react"
import Comment from "./Comment"
interface CommentListProps {
	comments: CommentType[]
	setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
	movie_id?: number
	children: React.ReactNode
}

function CommentList({
	comments,
	setComments,
	movie_id,
	children,
}: CommentListProps) {
	return (
		<div>
			<h1 className='text-2xl font-semibold'>
				{comments.length == 1
					? `${comments.length} Kommentar`
					: `${comments.length} Kommentare`}{" "}
			</h1>

			{children}

			{comments && comments.length ? (
				comments.map((comment: CommentType) => (
					<Comment
						key={comment.comment_id}
						comment={comment}
						setComments={setComments}
						movie_id={movie_id}
					/>
				))
			) : (
				<div>Keine Kommentare vorhanden</div>
			)}
		</div>
	)
}

export default CommentList
