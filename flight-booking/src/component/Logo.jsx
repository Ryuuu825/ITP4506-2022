import logo from "../logo.svg";

export default function PageLogo() {
	return (
		<>
			<img src={logo} className="h-16" alt="logo" />
			<span className="text-3xl text-blue-700 font-semibold">
				IVE AIRLINE
			</span>
		</>
	);
}