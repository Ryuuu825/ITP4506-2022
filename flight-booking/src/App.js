import logo from './logo.svg';
import './App.css';
import { useState , useRef } from 'react';
import { InputText } from "./component/InputGroup";

function App() {
  // create a array of object and pass it to Test_Array component
  const names = [
    "Ken",
    "Ben"
  ];

  const [count, setCount] = useState(0); // useState will cause re-render
  const counter = useRef(0); // use ref will not cause re-render

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <InputText label="Testing" prefix="$" placeholder="Money" dropdown_list={["USD" , "HKD" , "JPD"]}/>
        <button onClick={() => setCount(count + 1)} className="underline ">
          Click Me (useState)
        </button>
        <span className="text-red-400/100"> {count}</span>
        <button onClick={() => counter.current++} className="underline text-sky-400/100">
          Click Me (useRef)
        </button>
        <span className="text-red-400/100"> {counter.current}</span>
      </header>
    </div>
  );
}

export default App;
