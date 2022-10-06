
export default function SortBox() {
	return (
		<div className="flex flex-col justify-center items-center w-full">
			<div className="w-full mb-4 border rounded-lg border-gray-200 bg-white">
				<ul className="text-base shadow-md flex flex-wrap -mb-px text-sm font-medium text-center" id="sortTab" data-tabs-toggle="#sortTabContent" role="tablist">
					<li className="px-2 my-1 flex-1 border-r" role="presentation">
						<button className="inline-block w-full font-bold p-4 hover:text-blue-700 hover:bg-gray-100 hover:border-blue-700" id="dashboard-tab" data-tabs-target="#best" type="button" role="tab" aria-controls="best" aria-selected="false">Best</button>
					</li>
					<li className="px-2 my-1 flex-1 border-r" role="presentation">
						<button className="inline-block w-full font-bold p-4 hover:text-blue-700 hover:bg-gray-100" id="dashboard-tab" data-tabs-target="#cheapest" type="button" role="tab" aria-controls="cheapest" aria-selected="false">Cheapest</button>
					</li>
					<li className="px-2 my-1 flex-1" role="presentation">
						<button className="inline-block w-full font-bold p-4 hover:text-blue-700 hover:bg-gray-100" id="settings-tab" data-tabs-target="#quickest" type="button" role="tab" aria-controls="quickest" aria-selected="true">Quickest</button>
					</li>
				</ul>
			</div>
		</div>
	);
}