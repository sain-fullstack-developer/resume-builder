"use client";

import React, { useState } from "react";

import Header from "@/components/Header";
import ToggleMode from "@/components/ToggleMode";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";

function ContactPage() {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [messageError, setMessageError] = useState("");
	const [formError, setFormError] = useState("");
	const [submission, setSubmission] = useState("");

	const [onDarkMode, setOnDarkMode] = React.useState(false);
	const router = useRouter();

	const handleDarkToggle = () => {
		setOnDarkMode(!onDarkMode);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!fullname.trim()) {
			setNameError("Name is required.");
			return;
		} else {
			setNameError("");
		}

		if (!email.trim()) {
			setEmailError("Email is required.");
			return;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError("Invalid email address.");
			return;
		} else {
			setEmailError("");
		}

		if (!message.trim()) {
			setMessageError("Message is required.");
			return;
		} else {
			setMessageError("");
		}

		const formData = {
			fullname,
			email,
			message,
		};
		localStorage.setItem("feedback", JSON.stringify(formData));

		setSubmission("Feedback Submitted Successfully!");
		setEmail("");
		setMessage("");
		setFullname("");

		setTimeout(() => {
			router.push("/");
		}, 2000);
	};

	return (
		<div>
			<Header onDarkMode={onDarkMode} />
			<main
				className={`min-h-screen ${
					!onDarkMode ? "bg-primary" : "bg-black"
				}  block`}>
				<ToggleMode
					positionClass="top-24"
					isDarkMode={onDarkMode}
					handleDarkMode={handleDarkToggle}
				/>
				<h1 className="text-center text-4xl text-gray-400 mb-4 uppercase tracking-widest">
					Contact Us
				</h1>

				<form
					className="w-full grid justify-center align-middle mb-8"
					onSubmit={handleSubmit}>
					<div className="flex flex-col mb-5">
						<label
							className="text-xl font-base text-white uppercase tracking-widest"
							htmlFor="name">
							Name:
						</label>
						<InputField
							inputClass={`${
								onDarkMode ? "bg-white text-black" : "text-white"
							} bg-transperentBlack text-xl  border-none p-5 rounded-full outline-none mt-2.5 max-w-xl`}
							type="text"
							placeholder="Enter your name"
							id="name"
							name="fullname"
							value={fullname}
							onChange={(event) => setFullname(event.target.value)}
							required
						/>
						{nameError && (
							<p className="text-red-500 text-base mt-1">{nameError}</p>
						)}
					</div>
					<div className="flex flex-col mb-5 w-full">
						<label
							className="text-xl font-base text-white uppercase tracking-widest"
							htmlFor="email">
							Email:
						</label>
						<InputField
							inputClass={`${
								onDarkMode ? "bg-white text-black" : "text-white"
							} bg-transperentBlack text-xl border-none p-5 rounded-full outline-none mt-2.5 max-w-xl`}
							type="email"
							placeholder="Enter your email"
							id="email"
							name="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						{emailError && (
							<p className="text-red-500 text-base mt-1">{emailError}</p>
						)}
					</div>
					<div className="flex flex-col mb-5 w-full">
						<label
							className="text-xl font-base text-white uppercase tracking-widest"
							htmlFor="message">
							Message:
						</label>
						<textarea
							className={`${
								onDarkMode ? "bg-white text-black" : "text-white"
							} bg-transperentBlack text-xl border-none p-5 rounded-lg outline-none mt-2.5 max-w-xl`}
							id="message"
							name="message"
							rows={6}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							placeholder="Enter details"
							required></textarea>
						{messageError && (
							<p className="text-red-500 text-base mt-1">{messageError}</p>
						)}
					</div>
					{formError && (
						<p className="text-red-500 text-base mt-1">{formError}</p>
					)}
					<Button
						className="uppercase tracking-widest font-semibold"
						variant="primary"
						type="submit">
						Submit
					</Button>
				</form>
				{submission && (
					<h3 className="text-green-400 text-xl max-w-sm  w-full rounded-2xl m-auto font-semibold mb-4 text-center bg-transperentBlack p-5 mt-4">
						{submission}
					</h3>
				)}
				<Footer onDarkMode={onDarkMode} />
			</main>
		</div>
	);
}

export default ContactPage;
