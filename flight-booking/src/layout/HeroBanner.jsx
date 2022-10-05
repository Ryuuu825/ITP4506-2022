import { Button } from "../component/Button";
import { FloatingLabel, InputBox } from "../component/Form";

export default function HeroBanner()
{
    return (
        <div className=" w-11/12 mx-auto mb-10 2xl:w-full">
            <section class="">
                <div
                    class="relative overflow-hidden bg-no-repeat bg-cover rounded-lg"
                    style={{ backgroundPosition:"50%" , backgroundImage:'url(https://mdbcdn.b-cdn.net/img/new/slides/146.webp)' , height: "500px" }}>
                    <div
                        class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div class="flex justify-center items-center h-full">
                            <div class="text-center text-white px-6 md:px-12">
                                <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                                    <span class="block">Let the journey begin</span>
                                </h1>
                                <div className="flex justify-center flex-row align-middle">
                                    <div className=" w-9/12 mr-10">
                                        <InputBox
                                                type="text"
                                                placeholder="Enter your destination"
                                                validate={true}
                                            />
                                    </div>
                                    <Button content="Search" />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}