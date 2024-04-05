import "../globals.css"
import { Button } from "@/components/ui/button"
import { Film, CirclePlus, CircleUserRound, Popcorn } from "lucide-react"
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
				{/* Das ist der Header für die mobile Ansicht */}
				<header className='fixed top-0 left-0 right-0 z-10  h-fit bg-slate-900 lg:hidden'>
					<Link href='/' className='flex gap-1 items-center p-2'>
						<Popcorn color='white' size={"40px"} />
						<h1 className='text-white text-2xl'>MovieRate</h1>
					</Link>
				</header>
				{/* Das ist der Header / Navigation für die  Desktop Ansicht */}
				<header className='hidden fixed top-0 left-0 right-0 lg:block h-fit bg-slate-900 lg:mb-20'>
					<div className='container flex justify-between items-center '>
						<Link href='/' className='flex gap-1 items-center p-2'>
							<Popcorn color='white' size={"40px"} />
							<h1 className='text-white text-2xl'>MovieRate</h1>
						</Link>

						<div className='  flex gap-4  bg-none p-1 justify-end items-center mt-3 mb-3'>
							<Link href='/movies'>
								<Button className='flex flex-col h-fit w-fit gap-1 bg-slate-500  hover:bg-slate-600  focus:bg-slate-600 lg:flex-row  '>
									<Film color='white' />
									<span className='text-white selection:text-black'>Filme</span>
								</Button>
							</Link>
							<Link href='/movies/addMovie'>
								<Button className='flex flex-col h-fit w-fit gap-1 bg-slate-500  hover:bg-slate-600  focus:bg-slate-600 lg:flex-row '>
									<CirclePlus color='white' />
									<span className='text-white'>Neu</span>
								</Button>
							</Link>
							<Link href='/movies/admin'>
								<Button className='flex flex-col h-fit w-fit gap-1 bg-slate-500  hover:bg-slate-600  focus:bg-slate-600 lg:flex-row '>
									<CircleUserRound color='white' />
									<span className='text-white'>Admin</span>
								</Button>
							</Link>
						</div>
					</div>
				</header>

				<main className='mb-32 mt-16 lg:mt-24 lg:container'>{children}</main>
				{/* Das ist die mobile Navigation */}
				<div className='flex gap-4 fixed bottom-0 left-0 right-0 bg-gray-900 p-1  justify-around items-center lg:hidden'>
					<Link href='/movies'>
						<Button
							variant={"ghost"}
							className='flex flex-col  h-fit w-16 hover:bg-slate-500  focus:bg-slate-500'>
							<Film color='white' />
							<span className='text-white selection:text-black'>Filme</span>
						</Button>
					</Link>
					<Link href='/movies/addMovie'>
						<Button
							variant={"ghost"}
							className='flex flex-col  h-fit w-16 hover:bg-slate-500  focus:bg-slate-500'>
							<CirclePlus color='white' />
							<span className='text-white'>Neu</span>
						</Button>
					</Link>
					<Link href='/movies/admin'>
						<Button
							variant={"ghost"}
							className='flex flex-col  h-fit w-16 hover:bg-slate-500  focus:bg-slate-500'>
							<CircleUserRound color='white' />
							<span className='text-white'>Admin</span>
						</Button>
					</Link>
				</div>
			</body>
		</html>
	)
}
