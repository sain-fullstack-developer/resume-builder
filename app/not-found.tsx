import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

export default function PageNotFound() {
	return (
		<div className="text-center w-full flex flex-col justify-center align-middle min-h-screen bg-primary">
			<h1 className="text-8xl font-bold text-white mb-10">404</h1>
			<p className="text-gray-400 mb-10 text-4xl">Oops! Page not found.</p>
			<Link href="/">
				<Button
					variant="primary"
					type="button"
					className="bg-secondary w-40 text-white text-xl py-4 px-8 border-none rounded-full cursor-pointer transition-all hover:bg-primary">
					Go Back
				</Button>
			</Link>
		</div>
	);
}
