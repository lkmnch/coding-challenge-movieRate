"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import MoviePoster from "./MoviePoster"

function AddMovie() {
	const [file, setFile] = useState<File>()

	const router = useRouter()

	/* 	const MAX_FILE_SIZE = 500000
	const ACCEPTED_IMAGE_TYPES = [
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/webp",
	] */

	// Erstellung eines Validierungsschemas für das Filmformular
	const formSchema = z.object({
		movieTitle: z
			.string()
			.min(2, { message: "Titel muss mindestens 2 Zeichen lang sein" })
			.max(50, { message: "Titel darf maximal 50 Zeichen lang sein" }),
		description: z.string().max(500, { message: "Beschreibung zu lang" }),
		releaseYear: z.coerce
			.number()
			.gte(1000, { message: "Gib ein gültiges Jahr ein" })
			.max(9999, { message: "Gib ein gültiges Jahr ein" }),
		duration: z.coerce
			.number()
			.min(1, { message: "Film muss eine Länge haben" }),
		//movieImg: z.any(),
		/* movieImg: z
			.any()
			.refine((files) => files instanceof File, "Filmposter wird benötigt")
			.refine(
				(files) => files?.[0]?.size <= MAX_FILE_SIZE,
				`Maximal Größe von 5MB überschritten.`
			)
			.refine(
				(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
				"Nur .jpg, .jpeg, .png und .webp werden unterstützt."
			), */
	})
	// Verwendung von react-hook-form, um das Formular zu steuern und die Validierung durchzuführen
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			movieTitle: "",
			description: "",
			releaseYear: 0,
			duration: 0,
		},
	})

	// Funktion, um das Filmformular an den API-Endpunkt zu senden
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!file) return
		console.log(file?.name)
		try {
			const data = new FormData()
			data.set("file", file)

			const uploadPosterResponse = await fetch(
				"http://localhost:3000/api/upload",
				{
					method: "POST",
					body: data,
				}
			)
			const addMovieResponse = await fetch("http://localhost:3000/api/movies", {
				method: "POST",
				body: JSON.stringify({ ...values, filename: file?.name }),
			})
			console.log("Movie added successfully")
			router.push("/movies")
			router.refresh()
		} catch (error) {
			console.log("🚀 ~ onSubmit ~ error:", error)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'>
				<FormField
					control={form.control}
					name='movieTitle'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xl'>Titel</FormLabel>
							<FormControl>
								<Input placeholder='Titel eingeben' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xl'>Filmbeschreibung</FormLabel>
							<FormControl>
								<Textarea
									className='resize-none'
									placeholder='Filmbeschreibung eingeben'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='releaseYear'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xl'>Veröffentlichungsjahr</FormLabel>
							<FormControl>
								<Input
									placeholder='Gib das Veröffentlichungsjahr an'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='duration'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-xl'>Länge</FormLabel>
							<FormControl>
								<Input
									placeholder='Gib die Filmlänge an'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name='movieImg'
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel className='text-xl'>Filmposter</FormLabel>
								<div className='flex gap-1'>
									<FormControl>
										<input type='file' className='resize-none' {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
 */}
				<Input
					type='file'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFile(e.target.files?.[0])
					}
					required={true}
				/>
				<Button type='submit'>Film hinzufügen</Button>
			</form>
		</Form>
	)
}

export default AddMovie
