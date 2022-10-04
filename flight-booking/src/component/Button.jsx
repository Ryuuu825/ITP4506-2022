export function Button( { content, onClick, color , hovercolor , disable , style , id } ) {
    if (!color) color = "primary";
    let className = "bg-".concat(color, " p-3 rounded-lg text-white font-normal my-5 hover:bg-")
    if ( hovercolor ) {
        className = className.concat(hovercolor);
    }
    else {
        className = className.concat(color);
    }

    if ( disable ) {
        className = className.concat(" disabled:opacity-50 disabled:cursor-not-allowed");
    }
    className = className.concat(" ", style ) 
    return <button onClick={ onClick } className={className} disabled={disable} id={id}>{ content }</button>;
}

export function Floating ( { path , onClick, color } ) {
   return (
    <div class="flex space-x-2 justify-center">
    <div>
        <button type="button" onClick={onClick} class="inline-block rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-12 h-12">
            { path }
        </button>
    </div>
    </div>
   );
}
