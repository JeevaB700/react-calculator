import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearAll = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    const allowedKeys = "0123456789+-*/().";
    if (allowedKeys.includes(key)) {
      handleClick(key);
    } else if (key === "Enter") {
      calculateResult();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  const scientificButtons = [
    { label: "sin", value: "sin(" },
    { label: "cos", value: "cos(" },
    { label: "tan", value: "tan(" },
    { label: "√", value: "sqrt(" },
    { label: "log", value: "log(" },
    { label: "ln", value: "ln(" },
    { label: "π", value: "pi" },
    { label: "^", value: "^" },
  ];

  return (
    <div className="container">
<div className="calculator">
  <div className="display">{input || "0"}</div>

  <div className="sci-buttons">
    {scientificButtons.map(btn => (
      <button key={btn.label} onClick={() => handleClick(btn.value)}>
        {btn.label}
      </button>
    ))}
  </div>

  <div className="keypad">
    <button className="clear" onClick={clearAll}>C</button>
    <button onClick={() => handleClick("(")}>(</button>
    <button onClick={() => handleClick(")")}>)</button>
    <button className="operator" onClick={() => handleClick("/")}>÷</button>

    <button onClick={() => handleClick("7")}>7</button>
    <button onClick={() => handleClick("8")}>8</button>
    <button onClick={() => handleClick("9")}>9</button>
    <button className="operator" onClick={() => handleClick("*")}>×</button>

    <button onClick={() => handleClick("4")}>4</button>
    <button onClick={() => handleClick("5")}>5</button>
    <button onClick={() => handleClick("6")}>6</button>
    <button className="operator" onClick={() => handleClick("-")}>−</button>

    <button onClick={() => handleClick("1")}>1</button>
    <button onClick={() => handleClick("2")}>2</button>
    <button onClick={() => handleClick("3")}>3</button>
    <button className="operator" onClick={() => handleClick("+")}>+</button>

    <button onClick={() => handleClick("0")}>0</button>
    <button onClick={() => handleClick(".")}>.</button>
    <button className="equal" onClick={calculateResult}>=</button>
  </div>
</div>

    </div>
  );
}

export default App;
