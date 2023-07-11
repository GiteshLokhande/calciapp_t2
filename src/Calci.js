import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { create, all } from 'mathjs';

const math = create(all);

function Calculator() {
  const [result, setResult] = useState('');

  const handleInput = (event) => {
    const input = event.target.value;

    // Validate input
    if (/[^\d+*/.\-]/.test(input)) {
      alert('Invalid input! Only numbers and basic math operators (+, -, *, /) are allowed.');
      return;
    }

    setResult(input);
  };

  const handleClick = (event) => {
    const input = event.target.name;

    // Validate input
    if (/[^\d+*/.\-]/.test(input)) {
      alert('Invalid input! Only numbers and basic math operators (+, -, *, /) are allowed.');
      return;
    }

    setResult(result.concat(input));
  };

  const handleKeyDown = (event) => {
    const key = event.key;

    // Validate input
    if (/[^\d+*/.\-]/.test(key) && key !== 'Backspace' && key !== 'Enter' && key !== 'Escape') {
      alert('Invalid input! Only numbers and basic math operators (+, -, *, /) are allowed.');
      return;
    }

    if (key === 'Enter') {
      calculate();
    } else if (key === 'Escape') {
      clear();
    } else if (key === 'Backspace') {
      backspace();
    } else {
      setResult(result.concat(key));
    }
  };

  const clear = () => {
    setResult('');
  };

  const calculate = () => {
  if (result === '') {
    alert('Input cannot be empty!');
    return;
  }

  try {
    const calculatedResult = math.evaluate(result);

    if (!Number.isFinite(calculatedResult)) {
      alert('Zero division : value=undefined');
      setResult('');
    } else {
      setResult(calculatedResult.toString());
    }
  } catch (error) {
    setResult('Error');
  }
};


  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [result]);

  return (
    <>
      <center>
        <div className="calculator">
          <h1>Calculator App</h1>
          <div className="result">
            <input type="text" value={result} readOnly />
          </div>
          <div className="keypad">
            <button className="highlight" onClick={clear}>
              Clear
            </button>
            <button name="1" onClick={handleClick}>
              1
            </button>
            <button name="2" onClick={handleClick}>
              2
            </button>
            <button name="3" onClick={handleClick}>
              3
            </button>
            <button name="+" onClick={handleClick}>
              +
            </button>
            <button name="4" onClick={handleClick}>
              4
            </button>
            <button name="5" onClick={handleClick}>
              5
            </button>
            <button name="6" onClick={handleClick}>
              6
            </button>
            <button name="-" onClick={handleClick}>
              -
            </button>
            <button name="7" onClick={handleClick}>
              7
            </button>
            <button name="8" onClick={handleClick}>
              8
            </button>
            <button name="9" onClick={handleClick}>
              9
            </button>
            <button name="*" onClick={handleClick}>
              &times;
            </button>
            <button name="." onClick={handleClick}>
              .
            </button>
            <button name="0" onClick={handleClick}>
              0
            </button>
            <button onClick={calculate}>=</button>
            <button name="/" onClick={handleClick}>
              &divide;
            </button>
            <button name="Backspace" onClick={backspace}>
              Delete
            </button>
          </div>
        </div>
      </center>
    </>
  );
}

export default Calculator;
