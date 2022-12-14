import ive_logo from "../asserts/ive-logo.png";
export default function LogoClouds() {
    return (
        <div className="container mx-auto pt-16">
            <div className="w-11/12 xl:w-2/3 lg:w-2/3 md:w-2/3 mx-auto sm:mb-10 mb-16">
                <h1 className=" xl:text-5xl md:text-3xl text-xl text-center text-gray-800 font-extrabold mb-5 pt-4">
                    Trusted by the world's best
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-center text-gray-600 font-normal xl:w-10/12 xl:mx-auto">
                    We're proud to work with the world's best brands and
                    agencies to create amazing experiences.
                </p>
            </div>
            <div className="overflow-hidden">
                <div className="py-16 flex justify-center overflow-hidden w-fit">
                    <div className="rounded-lg shadow-xl w-60 flex justify-center border-gray-200  items-center">
                        <img
                            src={ive_logo}
                            style={{ height: "72px", width: "110px" }}
                            className="my-8"
                        />
                    </div>
                    <div className="  rounded-lg shadow-xl w-60 flex justify-center  border-gray-200  items-center ">
                        <img
                            src={ive_logo}
                            style={{ height: "72px", width: "110px" }}
                            className="my-8"
                        />
                    </div>
                    <div className=" rounded-lg shadow-xl w-60 flex justify-center border-gray-200  items-center ">
                        <img
                            src={ive_logo}
                            style={{ height: "72px", width: "110px" }}
                            className="my-8"
                        />
                    </div>
                    <div className="  rounded-lg shadow-xl w-60 flex justify-center border-gray-200  items-center ">
                        <img
                            src={ive_logo}
                            style={{ height: "72px", width: "110px" }}
                            className="my-8"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
