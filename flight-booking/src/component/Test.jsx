export  function Test( { name } ) {
    return <div>Hello { name }! </div>;
}

export  function Test_Array( { names } ) {
    return names.map( name => <Test name={ name } /> );
}