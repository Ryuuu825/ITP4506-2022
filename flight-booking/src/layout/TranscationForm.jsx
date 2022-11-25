import phonecodes from '../db/phonecodes.json';
export default function PassengersForm({ setPassengers }) {
	return (
		<div className="mt-4 mx-auto flex flex-col w-3/5">
			<div className="flex flex-col py-4">
				<label className="text-2xl font-bold mx-auto">Contact Details</label>
				<label className="text-sm mb-4"><label className="text-red-600">*</label> Required</label>

				<div className="flex flex-row items-center">
					<label className="flex flex-row w-1/4">
						Contact Email&nbsp;<label className="text-red-600">*</label>
					</label>
					<div className="grow relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg ariaHidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
						</div>
						<input type="email" required id="input-group-1" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" />
					</div>
					{/* <input type="email" className="grow border p-3 rounded-sm" placeholder="Email" required /> */}
				</div>
				<br />
				<div className="flex flex-row items-center">
					<label className="flex flex-row w-1/4">
						Phone&nbsp;<label className="text-red-600">*</label>
					</label>
					<div className="grow relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg className="w-5 h-5 text-gray-500 dark:text-gray-400 feather feather-phone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
						</div>
						<select className="text-gray-900 text-sm p-3 pl-10" value={"B"} defaultValue="B">
							{
							phonecodes.map((code) => (
								<option value={code.phoneCode}>{code.countryNameEn + " " + code.phoneCode}</option>
							))
							}
						</select>
					</div>
					<div className="grow relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg className="w-5 h-5 text-gray-500 dark:text-gray-400 feather feather-phone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
						</div>
						<input type="tel" required id="input-group-1" className="border p-3 border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone No." />
					</div>
				</div>
			</div>

			<div className="flex flex-col py-4">
				<label className="text-2xl font-bold mx-auto">Passengers</label>
				<label className="text-sm mb-4"><label className="text-red-600">*</label> Required</label>

				<PassengerInfo />
			</div>
			<div className="w-full flex flex-row justify-end">
				<button className="flex flew-row p-4 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold rounded">
					<svg className="mr-4 feather feather-user-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>Add Passenger</button>
				<button className="flex flex-row ml-2 bg-blue-800 shadow-md hover:bg-blue-700 text-white font-bold p-4 rounded">
					Next
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-4 feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
				</button>
			</div>
		</div>
	);
}

function PassengerInfo({ title }) {
	const options = [
		{ value: null, label: 'Select' },
		{ value: 'm', label: 'Male' },
		{ value: 'f', label: 'Famale' },
	]
	return (
		<div className="w-full">
			<div className="flex flex-row items-center">

			</div>
			<div className="flex flex-row items-center">
				<label className="flex flex-row w-1/4">
					First Name&nbsp;<label className="text-red-600">*</label>
				</label>
				<input type="email" className="grow border p-3 rounded-sm" placeholder="Email" required />
				<label className="flex flex-row w-1/4">
					Last Name&nbsp;<label className="text-red-600">*</label>
				</label>
				<input type="email" className="grow border p-3 rounded-sm" placeholder="Email" required />
			</div>
			<br />
			<div className="flex flex-row items-center">
				<label className="flex flex-row w-1/4">
					<svg className="mx-2 feather feather-phone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
					Gender&nbsp;<label className="text-red-600">*</label>
				</label>
			</div>
		</div>
	);
}