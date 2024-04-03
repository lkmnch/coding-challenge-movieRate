import "../globals.css"
import { Button } from "@/components/ui/button"
import { Film, CirclePlus, CircleUserRound } from "lucide-react"
import Link from "next/link"

export const metadata = {
	title: "Next.js",
	description: "Barebone Next.js installation",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='de'>
			<body>
				{children}
				<div className='flex gap-4 fixed bottom-0 left-0 right-0 bg-gray-900 p-4  justify-around items-center lg:hidden'>
					<Link href='/'>
						<Button variant={"outline"} className='flex flex-col  h-fit w-16'>
							<Film />
							<span>Filme</span>
						</Button>
					</Link>

					<Link href='/movies/addMovie'>
						<Button variant={"outline"} className='flex flex-col  h-fit w-16'>
							<CirclePlus />
							<span>Neu</span>
						</Button>
					</Link>

					<Button variant={"outline"} className='flex flex-col  h-fit w-16'>
						<CircleUserRound />
						<span>Profil</span>
					</Button>
				</div>
			</body>
		</html>
	)
}
