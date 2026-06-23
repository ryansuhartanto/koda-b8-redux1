import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { removeEntry } from "#/store/reducers/survey";

const BRAND_LABELS = {
	"gudang-garam-filter": "Gudang Garam Filter",
	"lucky-strike": "Lucky Strike",
	"marlboro": "Marlboro",
	"esse": "Esse",
};

function formatBrand(brands = []) {
	return brands.map((b) => BRAND_LABELS[b] ?? b).join(", ");
}
const genderO = {
	male: "Laki-laki",
	female: "Perempuan",
};
const smokingO = {
	"0": "Ya",
	"1": "Tidak",
};

export default function Result() {
	const data = useSelector((state) => state.survey.entries);
	const dispatch = useDispatch();

	return (
		<main className="max-w-6xl mx-auto p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-medium">Data Survey Perokok</h1>
				<Link
					to="/"
					className="text-main text-sm font-medium hover:underline"
				>
					← Kembali
				</Link>
			</div>

			{data.length === 0 ? (
				<p className="text-black/50 text-sm">Belum ada data.</p>
			) : (
				<div className="relative overflow-x-auto bg-white shadow-xs rounded-lg border border-black/20">
					<table className="w-full text-sm text-left">
						<thead className="text-sm bg-black/2.5 border-b border-black/20">
							<tr>
								{["#", "Nama", "Umur", "Jenis Kelamin", "Perokok", "Merek"].map(
									(h) => (
										<th
											key={h}
											scope="col"
											className="px-6 py-3 font-medium"
										>
											{h}
										</th>
									),
								)}
							</tr>
						</thead>
						<tbody>
							{data.map(
								(
									{
										name = "",
										age = "",
										gender = "",
										smoking = "",
										brand = [],
									},
									i,
								) => (
									<tr
										key={i}
										className={`bg-white ${i < data.length - 1 ? "border-b border-black/10" : ""} *:px-6 *:py-4`}
									>
										<th
											scope="row"
											className="font-medium whitespace-nowrap"
										>
											{i + 1}
										</th>
										<td>{name}</td>
										<td>{age}</td>
										<td>{genderO[gender]}</td>
										<td>{smokingO[smoking]}</td>
										<td>{formatBrand(brand)}</td>
										<td>
											<button
												type="button"
												className="bg-red-600 text-white px-1 rounded-sm cursor-pointer"
												onClick={() => dispatch(removeEntry(i))}
											>
												Delete
											</button>
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>
				</div>
			)}
		</main>
	);
}
