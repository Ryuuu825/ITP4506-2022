import { useState , useRef , useEffect } from 'react';

function Spin({size_  }) 
{
    if (size_)
    {
        let size_num = [12,12]
        if (size_ == "s")
            size_num = [6,6]
        else if (size_ == "m")
            size_num = [12,12]
        else if (size_ == "l")
            size_num = [32,32]
        else if (size_ == "xl")
            size_num = [32,52]
    
        const className_with_size = "animate-spin rounded-full border-b-3 border-black-900" + " w-" + size_num[0] + " h-" + size_num[1] ; 
        return (
            <div className="flex justify-center items-center bg-white ">
                <svg className={className_with_size} viewBox="0 0 24 24"></svg>
            </div>
        )
    }
    else 
    {
        return (
            <>
                <div className="flex justify-center items-center bg-white">
                    {/* A screen size spinner */}
                    <div className=" m-40 ">
                        <div className="animate-spin rounded-full  border-l-4  border-black h-32 w-32">
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
}

export function Spinner({element , loading_time , size }) {
    const [loading , setLoading] = useState(true);
    const time = useRef(null);
    const timer = useRef(null);

    // load the element now


    useEffect(() => {
       // change the spinner to the element after loading_time
         timer.current = setInterval(() => {    
            time.current += 1;
            if ( time.current  >= loading_time ) {
                setLoading(false);
                clearInterval(timer.current);
            }
        }
        , 1000);
    }, [loading]);

    return (
        <div>
            { loading ? <Spin size_={size}  /> : element }
        </div>
    )
}

export function LoadPage({page, loading_time , Preloaded})
{
    const [loading , setLoading] = useState(true);
    const time = useRef(null);
    const timer = useRef(null);

    useEffect(() => {
       // change the spinner to the element after loading_time
         timer.current = setInterval(() => {    
            time.current += 1;
            if ( time.current  >= loading_time ) {
                setLoading(false);
                clearInterval(timer.current);
            }
        }
        , 1000);
    }, [loading]);

    return (    
        <div>
            { loading ? 
                <>
                    {Preloaded}
                    <Spin />
                </>
            
            : page }
        </div>
    )
}