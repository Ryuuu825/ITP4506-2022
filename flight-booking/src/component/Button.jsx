export function Button( { content, onClick, color , hovercolor } ) {
    let className = "bg-".concat(color, " p-3 rounded-lg hover:bg-")
    if ( hovercolor ) {
        className = className.concat(hovercolor);
    }
    else {
        className = className.concat(color);
    }
    return <button onClick={ onClick } className={className} >{ content }</button>;
}

export function Floating ( { path , onClick, color } ) {
   return (
    <div class="flex space-x-2 justify-center">
    <div>
        <button type="button" onclick={onClick} class="inline-block rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-12 h-12">
            { path }
        </button>
    </div>
    </div>
   );
}
