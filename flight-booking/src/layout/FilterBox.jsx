import { PriceFilter, FlightTime } from "../component/Filters";
import { useSearchParams} from "react-router-dom";


export default function FilterBox({ setIsFilterPrice, setIsFilterTime, setCurrentPage, ticketCount, locCount, destCount, dest, min, max, setDestForm, destForm }) {
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	return (
		<div className="flex flex-col justify-center items-center w-full px-2 py-4">
			<div className="w-10/12 mb-5 border-b-2">
				<div className="flex">
					<svg fill="blue" width="30px" height="30px" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M110.22,117.75h-80a10,10,0,0,0,0,20h80a10,10,0,0,0,0-20Z" /><path d="M177.22,125.75a9.67,9.67,0,0,0-14,0l-8,7.5V42.75a10,10,0,0,0-20,0v113.5a8.29,8.29,0,0,0,3,8,9.67,9.67,0,0,0,14,0l24.5-24.5a10.13,10.13,0,0,0,.5-14Z" /><path d="M110.22,37.75h-80a10,10,0,0,0,0,20h80a10,10,0,0,0,0-20Z" />
						<path d="M30.22,97.75h70a10,10,0,0,0,0-20h-70a10,10,0,0,0,0,20Z" />
					</svg>
					<p className="text-lg font-bold">Filter</p>
				</div>
			</div>
			<p className="text-sm mb-5">Showing {ticketCount} results</p>
			<PriceFilter setIsFilterPrice={setIsFilterPrice} setCurrentPage={setCurrentPage} params={searchParams} setParams={setSearchParams} min={ticketCount === 0 ? 0 : min} max={ticketCount === 0 ? 0 : max} setDestForm={setDestForm} destForm={destForm}/>
			<FlightTime setIsFilterTime={setIsFilterTime} setCurrentPage={setCurrentPage} params={searchParams} setParams={setSearchParams} locCount={locCount} destCount={destCount} dest={dest} setDestForm={setDestForm} destForm={destForm}/>
		</div>
	);
}