"use client"
import React from "react"
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

function AddMovie() {
	const router = useRouter()
	const formSchema = z.object({
		movieTitle: z
			.string()
			.min(2, { message: "Titel muss mindestens 2 Zeichen lang sein" })
			.max(50, { message: "Titel darf maximal 50 Zeichen lang sein" }),
		description: z.string().max(500),
		releaseYear: z.number().min(1900).max(2030),
		duration: z.number().min(1),
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			movieTitle: "",
			description: "",
			releaseYear: 0,
			duration: 0,
		},
	})
	const onSubmit = (values: z.infer<typeof formSchema>) => {}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-10'>
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

				<Button type='submit'>Film hinzufügen</Button>
			</form>
		</Form>
	)
}

export default AddMovie
