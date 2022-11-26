import { Card } from "flowbite-react";
import meal from "../asserts/food.jpg";
import car from "../asserts/carservice.jpg";

export default function AddOnForm({ passengers, setPassengers, setForm, form, setStep, step }) {
	const setNextFormHandler = (e) => {
		setStep(step + 1);
		form.addon = ["meal"];
		setForm(form);
	}

	const setPreFormHandler = (e) => {
		setStep(step - 1);
		form.addon = ["meal"];
		setForm(form);
	}

	return (
		<div className="w-full p-8 animate-fade-in duration-1000">
			<div className="w-4/5 flex flex-row mx-auto items-center">
				<h1 className="grow mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white">
					Add-Ons
				</h1>
				<h1 onClick={setNextFormHandler} className="underline cursor-pointer flex flex-row items-center mb-4 text-xl font-bold tracking-tight text-blue-900 dark:text-white">
					Skip this step
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-2 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
				</h1>
			</div>
			<div className="w-4/5 mx-auto pr-8 flex flex-row border rounded-xl shadow-md ">
				<img className="rounded-l-lg" src={meal} alt="" width={400} height={400} />
				<div className="flex grow flex-col m-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Airline Meal Reservation
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						We will provide each passenger with a free in-flight meal. If there are additional needs, we can provide you with more in-flight meal options, and the price will vary according to your choice.
					</p>
					<div className="flex flex-row items-end justify-end mt-8 w-full h-full">
						<button className="text-white font-bold w-3/5 py-4 bg-blue-800 uppercase">Choose Meal</button>
					</div>
				</div>
			</div>

			<div className="w-4/5 mx-auto pr-8 flex my-8 flex-row border rounded-xl shadow-md ">
				<img className="rounded-l-lg" src={car} alt="" width={400} height={400} />
				<div className="flex grow flex-col m-4">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Airport Shuttle Service
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						We provide airport shuttle service, if necessary, please choose this additional service.
					</p>
					<div className="flex flex-row items-end justify-end mt-8 w-full h-full">
						<button className="text-white font-bold w-3/5 py-4 bg-yellow-500 uppercase">Add Service</button>
					</div>
				</div>
			</div>
			<div className="w-4/5 mx-auto flex flex-row">
				<div className="flex flex-row justify-start mt-8">
					<button onClick={setPreFormHandler} className="flex flew-row p-4 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold rounded">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-4 feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>Back</button>
				</div>
				<div className="flex grow flex-row justify-end mt-8">
					<button onClick={setNextFormHandler} className="flex flex-row ml-2 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded">
						Next
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-4 feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
				</div>
			</div>
		</div>
	);
}