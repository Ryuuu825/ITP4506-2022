import { HeroBanner, Banner } from "../layout/Banner";
import { Link } from "react-router-dom";
import Accordion from "../component/Accordion";
import { Paragraph } from "../component/Text";
import Nav from "../layout/Nav";
function Box({ name }) {
    return (
        <div
            class={
                "relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mr-4 hover:scale-105 transition duration-300 ease-in-out "
            }
        >
            <img
                src="https://mdbootstrap.com/img/new/standard/nature/028.jpg"
                class="w-full"
                alt={name}
            />
            <Link className="cursor-pointer">
                <div
                    class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                >
                    <div class="flex justify-start items-end h-full">
                        <div class="text-white m-6">
                            <h5 class="font-bold text-lg mb-3">{name}</h5>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function ListItem({ dest, dest_code, price, date, flight_class }) {
    return (
        <Link
            to="/booking"
            class="text-black px-4 py-2 flex flex-row justify-between items-center border p-3 rounded-lg mt-1 mb-2 relative mx-1 hover:scale-105"
            style={{ width: "47%" }}
        >
            <div class="flex flex-row items-center">
                <div class="flex flex-col ml-4">
                    <p>
                        <span class="text-lg font-bold">Hong Kong (HKG) </span>
                        <span> to </span>
                        <span class="text-lg font-bold">
                            {dest} ({dest_code})
                        </span>
                    </p>
                    <p class="text-sm text-gray-500">{date}</p>
                    <p class="text-sm text-gray-500">{flight_class}</p>
                    <p>
                        From{" "}
                        <span class="text-lg font-bold text-primary-800">
                            HKD {price}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                </svg>
            </div>
        </Link>
    );
}

function ListBoxHor(props) {
    return (
        <div className="flex mt-4 flex-nowrap justify-around">
            {props.children}
        </div>
    );
}

function ListBox(props) {
    return (
        <div className="flex mt-4 flex-col justify-between">
            {props.children}
        </div>
    );
}

export function LandingPage() {
    return (
        <div>
            <Nav />
            <Banner />
            <HeroBanner />
            <div className="w-11/12 mx-auto 2xl:w-6/12">
                <div className="p-dest">
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold">
                            Popular flight destination
                        </h1>
                    </div>
                    <ListBoxHor>
                        <Box name="Japan" />
                        <Box name="Taiwan" />
                        <Box name="China" />
                        <Box name="United Kingdom" />
                    </ListBoxHor>
                </div>

                <div className="b-deals">
                    <div className="w-1/2 mt-10">
                        <h1 className="text-3xl font-bold ">
                            Today's best deals
                        </h1>
                    </div>
                    <ListBoxHor>
                        <ListItem
                            dest="Tokyo"
                            dest_code="NRT"
                            price="5999"
                            date="07-DEC-2022"
                            flight_class="Economy"
                        />
                        <ListItem
                            dest="TaiWan"
                            dest_code="TPE"
                            price="3049"
                            date="14-DEC-2022"
                            flight_class="Economy"
                        />
                    </ListBoxHor>

                    <ListBoxHor>
                        <ListItem
                            dest="BangKok"
                            dest_code="BKK"
                            price="2914"
                            date="07-DEC-2022"
                            flight_class="Economy"
                        />
                        <ListItem
                            dest="Incheon"
                            dest_code="ICN"
                            price="4292"
                            date="07-DEC-2022"
                            flight_class="Economy"
                        />
                    </ListBoxHor>
                    <div>
                        <span className="text-gray-500 pl-3">
                            * The above prices are for reference only. Please
                            refer to the actual price when booking.
                        </span>
                    </div>
                </div>
            </div>

            <div className="divider mb-5 ">
                <div className="mt-10 bg-gray-200 ">
                    <div className="flex flex-row justify-between px-12 py-8 2xl:w-6/12 2xl:mx-auto">
                        <div className="flex flex-col justify-center p-3 text-center">
                            <div className="mx-auto">
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    ></path>
                                </svg>
                            </div>
                            <div className="text-3xl font-bold">
                                Huge selection
                            </div>
                            <div className="mt-3">
                                Easily find the best flight for your needs
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-3 text-center">
                            <div className="mx-auto">
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    ></path>
                                </svg>
                            </div>
                            <div className="text-3xl font-bold">
                                Best price guarantee
                            </div>
                            <div className="mt-3">
                                We offer the best prices on the market
                            </div>
                        </div>

                        <div className="flex flex-col justify-center p-3 text-center">
                            <div className="mx-auto">
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="text-3xl font-bold">
                                No hidden fees
                            </div>
                            <div className="mt-3">
                                Know what you're paying for
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto 2xl:w-6/12 mt-10">
                <div className="text-3xl font-bold mb-10">
                    Frequently asked questions
                </div>
                <Accordion
                    title={"Why book with us?"}
                    content={
                        <>
                            <Paragraph>
                                We are a airline company that set up by a group
                                of professional and experienced people. Our goal
                                is to provide the best service to our customers.
                            </Paragraph>
                            <Paragraph>
                                <span className="text-primary">
                                    <Link to="/create-acc">Login</Link>
                                </span>{" "}
                                to get the best deals straight to your inbox.
                            </Paragraph>
                        </>
                    }
                    alwaysOpen
                />
                <Accordion
                    title={`What happens after I've booked my flight?`}
                    content={
                        <>
                            <Paragraph>
                                After you've booked your flight, you will
                                receive a confirmation email. You can also check
                                your booking status in the "My Booking" section.
                            </Paragraph>
                        </>
                    }
                />
                <Accordion
                    title={`How can I stay up to date with the latest news?`}
                    content={
                        <>
                            <Paragraph>
                                If you've got a trip in mind but you're not
                                ready to book yet, you can save your search and
                                we'll send you an email when the price drops.
                            </Paragraph>
                            <Paragraph>
                                You can also follow us on
                                <span className="text-primary">
                                    <Link to="/NotFound"> Facebook </Link>
                                </span>
                                to get the latest news and updates.
                            </Paragraph>
                        </>
                    }
                />
                <Accordion
                    title={`Any requirements under COVID-19?`}
                    content={
                        <>
                            <Paragraph>
                                According to the current
                                <span className="text-primary">
                                    <a
                                        href="https://www.hongkongairport.com/en/COVID19.page"
                                        target="_blank"
                                    >
                                        {" "}
                                        regulations{" "}
                                    </a>
                                </span>
                                , all passengers must fulfilled vaccination
                                requirements, and must have a negative COVID-19
                                test result within 72 hours before departure.
                            </Paragraph>
                        </>
                    }
                />
            </div>

            <div className="mb-40 mt-40"></div>
        </div>
    );
}
