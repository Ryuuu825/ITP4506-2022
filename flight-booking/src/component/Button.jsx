export function PrimaryBtn( { content, onClick } ) {
    return <button onClick={ onClick } className="bg-primary p-3 rounded-lg hover:bg-primary-800" >{ content }</button>;
}

export function SecondaryBtn( { content, onClick } ) {
    return <button onClick={ onClick } className="bg-secondary p-3 rounded-lg hover:bg-secondary-800" >{ content }</button>;
}