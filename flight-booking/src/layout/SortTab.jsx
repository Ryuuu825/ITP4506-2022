import { useState } from "react";
export default function SortBox({ setSort }) {
	const [active, setActive] = useState("best");
	const handleClick = (e) => {
		e.target.ariaSelected = true;
		setSort(e.target.value);
		setActive(e.target.value);
	};
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="w-full mb-4 border rounded-lg border-gray-200 bg-white">
				<ul className="text-base shadow-md flex flex-wrap -mb-px text-sm font-medium text-center" id="sortTab" data-tabs-toggle="#sortTabContent" role="tablist">
					<li className="px-2 my-2 flex-1 border-r" role="presentation">
						<button className={active === "best" ? "inline-block border-b-2 w-full font-bold p-4 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-700 border-blue-700 text-blue-700" : "inline-block border-b-2 border-transparent w-full font-bold p-4 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-700"} id="dashboard-tab" data-tabs-target="#best" type="button" role="tab" aria-controls="best" aria-selected="true" value="best" onClick={handleClick}>Best</button>

					</li>
					<li className="px-2 my-2 flex-1 border-r" role="presentation">
						<button className={active === "cheapest" ? "inline-block border-b-2 w-full font-bold p-4 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-700 border-blue-700 text-blue-700" : "inline-block border-b-2 border-transparent w-full font-bold p-4 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-700"} id="dashboard-tab" data-tabs-target="#cheapest" type="button" role="tab" aria-controls="cheapest" aria-selected="false" value="cheapest" onClick={handleClick}>Cheapest</button>
					</li>
					<li className="px-2 my-2 flex-1" role="presentation">
						<button className={active === "quickest" ? "inline-block border-b-2 w-full font-bold p-4 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-700 border-blue-700 text-blue-700" : "inline-block border-b-2 border-transparent w-full font-bold p-4 hover:text-blue-700 hover:bg-blue-100 hover:border-blue-700"} id="dashboard-tab" data-tabs-target="#quickest" type="button" role="tab" aria-controls="quickest" aria-selected="false" value="quickest" onClick={handleClick}>Quickest</button>
					</li>
				</ul>
			</div>
		</div>
	);
}