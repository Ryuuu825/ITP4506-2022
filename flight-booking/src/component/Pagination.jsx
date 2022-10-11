import { useSearchParams } from "react-router-dom";

export default function Pagination({ records, perPage, setCurrentPage, currentPage }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageCount = Math.ceil((records === undefined ? 1 : records.length) / perPage);

	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));
		setSearchParams({ page: Number(event.target.id)+1 });
	};

	const handleNext = () => {
		if (currentPage < pageCount-1) {
			setCurrentPage(currentPage + 1);
			setSearchParams({ page: Number(currentPage + 2) });
		}
	};

	const handlePrev = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
			setSearchParams({ page: Number(currentPage) });
		}
	};


	return (
		<div className="flex flex-col items-center my-3 bg-white rounded-lg border shadow-md">
			<div className="flex text-gray-700">
				<div onClick={handlePrev} className="h-8 w-8 mr-1 flex justify-center items-center  cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-4 h-4">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</div>
				<div className="flex h-8 font-medium ">
					{[...Array(pageCount)].map((page, index) => {
						return (
							<div
								key={index}
								id={index}
								onClick={handleClick}
								className={`w-8 md:flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 ${currentPage === index ? "border-blue-600" : "border-transparent"
									}`}
							>
								{index + 1}
							</div>
						);
					})}
				</div>
				<div onClick={handleNext} className="h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-4 h-4">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</div>
			</div>
		</div>
	);
}