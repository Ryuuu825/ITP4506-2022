import ive_logo from '../asserts/ive-logo.png';
export default function LogoClouds() {
    return (
        <div className="flex flex-col w-full items-center text-center justify-center align-middle mx-auto mt-10 mb-10">
            <div className="text-2xl font-bold">
                Trusted by  {" "}
                <span className="text-blue-500 underline">10000+</span>
                {" "} best schools
            </div>
            <div className="flex flex-row justify-around w-full mt-5 pt-8">
                <img src={ive_logo} alt="ive_logo" className="h-20 w-32 mx-2" />
                <img src={ive_logo} alt="ive_logo" className="h-20 w-32 mx-2" />
                <img src={ive_logo} alt="ive_logo" className="h-20 w-32 mx-2" />
                <img src={ive_logo} alt="ive_logo" className="h-20 w-32 mx-2" />
            </div>
        </div>
    )
}