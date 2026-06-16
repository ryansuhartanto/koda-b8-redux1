import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";

import { cn } from "#/utils";

const tw = {
	inputToggle: "w-5 h-5 cursor-pointer accent-violet-700",
};

const schema = yup.object({
	name: yup.string().required("Nama wajib diisi"),
	age: yup
		.number()
		.typeError("Umur harus berupa angka")
		.integer("Umur harus bilangan bulat")
		.min(1, "Umur tidak valid")
		.required("Umur wajib diisi"),
	gender: yup
		.string()
		.oneOf(["male", "female"])
		.required("Jenis kelamin wajib dipilih"),
	smoking: yup
		.string()
		.oneOf(["0", "1"])
		.required("Pilihan perokok wajib dipilih"),
	brand: yup.array().when("smoking", {
		is: "0",
		// oxlint-disable-next-line unicorn/no-thenable
		then: (s) => s.length(0, "Silahkan pilih perokok jika anda merokok"),
		otherwise: (s) => s.optional(),
	}),
});

const fields = [
	{ input: "name", label: "Siapa nama Anda?", type: "text" },
	{ input: "age", label: "Berapa umur Anda?", type: "number" },
	{
		input: "gender",
		label: "Apa jenis kelamin Anda?",
		type: "radio",
		choices: [
			{ value: "male", label: "Laki-laki" },
			{ value: "female", label: "Perempuan" },
		],
	},
	{
		input: "smoking",
		label: "Apakah Anda perokok?",
		type: "radio",
		choices: [
			{ value: "1", label: "Ya" },
			{ value: "0", label: "Tidak" },
		],
	},
	{
		input: "brand",
		label: "Jika anda perokok, rokok apa yang anda pernah coba?",
		type: "checkbox",
		choices: [
			{ value: "gudang-garam-filter", label: "Gudang Garam Filter" },
			{ value: "lucky-strike", label: "Lucky Strike" },
			{ value: "marlboro", label: "Marlboro" },
			{ value: "esse", label: "Esse" },
		],
	},
];

/**
 * @typedef CardProps
 * @prop {"header" | "field"} [variant]
 */

/**
 * @param {React.PropsWithChildren<React.ComponentProps<"div"> & CardProps>}
 */
function Card({ variant = "field", className, children, ...props }) {
	return (
		<div
			className={cn(
				"p-6 py-7 border border-black/20 bg-white flex flex-col gap-6",
				{
					"rounded-b-lg rounded-t-2xl border-t-16 border-t-violet-700":
						variant === "header",
					"rounded-lg": variant === "field",
				},
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

/**
 * @typedef ButtonProps
 * @prop {"primary" | "text"} [variant]
 */

/**
 * @param {React.PropsWithChildren<React.ComponentProps<"button"> & ButtonProps>}
 */
function Button({ variant = "primary", className, children, ...props }) {
	return (
		<button
			className={cn(
				"w-fit text-sm font-medium p-2.5 cursor-pointer",
				{
					"px-6 text-white bg-violet-700 border border-black/20 rounded hover:opacity-90 transition-opacity":
						variant === "primary",
					"text-violet-700 bg-transparent border-none hover:underline":
						variant === "text",
				},
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export default function Form() {
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { brand: [] },
	});

	function onSubmit(data) {
		const existing = JSON.parse(localStorage.getItem("data") ?? "[]");
		localStorage.setItem("data", JSON.stringify([...existing, data]));
		setSubmitted(true);
	}

	return (
		<main className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
			{!submitted ? (
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Card variant="header">
						<h1 className="text-3xl">Form Survey Perokok</h1>
					</Card>

					{fields.map((field) => (
						<Card key={field.input}>
							<div className="text-lg">
								<label htmlFor={field.input}>{field.label}</label>
							</div>

							{field.choices ? (
								field.choices.map((choice) => (
									<div
										key={choice.value}
										className="flex items-center gap-3"
									>
										<input
											type={field.type}
											id={choice.value}
											value={choice.value}
											className={tw.inputToggle}
											{...register(field.input)}
										/>
										<label
											htmlFor={choice.value}
											className="cursor-pointer"
										>
											{choice.label}
										</label>
									</div>
								))
							) : (
								<input
									type={field.type}
									id={field.input}
									placeholder="Jawaban Anda"
									className="border-0 p-4 py-5 bg-black/2.5 border-b border-black/50 mb-px focus:outline-none focus:border-b-2 focus:border-black focus:mb-0"
									{...register(field.input)}
								/>
							)}

							{errors[field.input] && (
								<p className="text-red-500 text-sm mbs-1">
									{errors[field.input].message}
								</p>
							)}
						</Card>
					))}

					<div className="flex justify-between mt-2">
						<Button type="submit">Simpan</Button>
						<Button
							type="reset"
							onClick={reset}
							variant="text"
						>
							Bersihkan form
						</Button>
					</div>
				</form>
			) : (
				<Card variant="header">
					<h1 className="text-3xl">Terimakasih telah mengisi form ini.</h1>
				</Card>
			)}

			<Link
				to="/result"
				className="text-violet-700 my-2 text-sm font-medium no-underline hover:underline block"
			>
				Lihat hasil
			</Link>
		</main>
	);
}
