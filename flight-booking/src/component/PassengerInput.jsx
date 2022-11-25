export default function PassengerInput({ label,
	sublabel,
	maxCount,
	passengerType,
	setPassengers, passengers }) {

	return (
		<div className="">
			<label>
				{label}
				<span className="">{sublabel}</span>
			</label>
			<div className="">
				<button
					className=""
					onClick={() => {
						setPassengers((prevState) => {
							return {
								...prevState,
								[passengerType]: prevState[passengerType] - 1,
							};
						});
					}}
					disabled={passengers[passengerType].lenght === 0}
				>
					-
				</button>
			</div>
			<span className="">{passengers[passengerType]}</span>
			<div className="">
				<button
					className=""
					onClick={() => {
						setPassengers((prevState) => {
							return {
								...prevState,
								[passengerType]: prevState[passengerType] + 1,
							};
						});
					}}
					disabled={passengers[passengerType].lenght === maxCount}
				>
					+
				</button>
			</div>
		</div>
	);

}