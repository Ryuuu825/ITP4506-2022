import { Card } from "flowbite-react";
import meal from "../asserts/food.jpg";
import car from "../asserts/carservice.jpg";

export default function AddOnForm({ passengers, setPassengers, setForm, form, setStep, step }) {
	const setNextFormHandler = (e) => {
		setStep(step + 1);
		form.addon = ["meal"];
		setForm(form);
	}
	return (
		<div className="w-full h-screen p-8">
			<div className="w-4/5 flex flex-row mx-auto items-center">
				<h1 className="grow mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white">
					Add-Ons
				</h1>
				<h1 onClick={setNextFormHandler} className="underline cursor-pointer flex flex-row items-center mb-4 text-xl font-bold tracking-tight text-blue-900 dark:text-white">
					Skip this step
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-2 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
				</h1>
			</div>
			<h1 className="w-4/5 mb-4 mx-auto text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Reserve Meal
			</h1>
			<div className="w-4/5 mx-auto pr-8 flex flex-row border rounded-xl shadow-md ">
				<img className="rounded-l-lg" src={meal} alt="" width={400} height={400} />
				<div className="flex flex-col m-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Noteworthy technology acquisitions 2021
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
					</p>
				</div>
			</div>

			<h1 className="w-4/5 my-4 mx-auto text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Reserve Cars
			</h1>
			<div className="w-4/5 mx-auto pr-8 flex flex-row border rounded-xl shadow-md ">
				<img className="rounded-l-lg" src={car} alt="" width={400} height={400} />
				<div className="flex flex-col m-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Noteworthy technology acquisitions 2021
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
					</p>
				</div>
			</div>
		</div>
	);
}