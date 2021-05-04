import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentOperand, setcurrentOperand] = useState('0');
  const [prevOperand, setprevOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [prevPressedBtn, setPrevPressedBtn] = useState('');

  const allClear = () => {
    setcurrentOperand('0');
    setprevOperand('');
    setPrevPressedBtn('');
  };

  const deleteLastNum = () => {
    if (currentOperand.length === 1 && currentOperand !== '0') {
      setcurrentOperand('0');
    } else if (currentOperand !== '0' && currentOperand !== '')
      setcurrentOperand(currentOperand.slice(0, -1));
  };

  const calculate = () => {
    if (prevOperand === '') {
      return;
    }
    let prevNum = parseFloat(prevOperand);
    let currentNum = parseFloat(currentOperand);
    let answer;
    switch (operation) {
      case '+':
        answer = (prevNum + currentNum).toString();
        setcurrentOperand(answer);
        setprevOperand('');
        break;
      case '-':
        answer = (prevNum - currentNum).toString();
        setcurrentOperand(answer);
        setprevOperand('');
        break;
      case 'x':
        answer = (prevNum * currentNum).toString();
        setcurrentOperand(answer);
        setprevOperand('');
        break;
      case '÷':
        answer = (prevNum / currentNum).toString();
        setcurrentOperand(answer);
        setprevOperand('');
        break;
      default:
        break;
    }

    if (answer.length >= 18) {
      let roundedAnswer = parseFloat(answer).toPrecision(13);
      setcurrentOperand(roundedAnswer);
    }

    setPrevPressedBtn('equals');
  };

  const saveOperation = (e) => {
    let prevOps = operation;
    setOperation(e.target.innerText);

    if (prevPressedBtn === 'operation' && e.target.innerText === '-') {
      setcurrentOperand(
        currentOperand.includes('-')
          ? currentOperand.slice(1)
          : `-${currentOperand}`
      );
      setOperation(prevOps);
    } else if (prevPressedBtn === 'operation' && e.target.innerText === '+') {
      setcurrentOperand(
        currentOperand.includes('-')
          ? currentOperand.slice(1)
          : `${currentOperand}`
      );
    } else if (prevOperand === '') {
      setprevOperand(currentOperand);
      setcurrentOperand('0');
    } else {
      calculate();
    }

    setPrevPressedBtn('operation');
  };

  const appendNumber = (e) => {
    let num = e.target.innerText.toString();
    setPrevPressedBtn(num);
      if (currentOperand.length === 1 && currentOperand === '0') {
      setcurrentOperand('');
      setcurrentOperand(`${num}`);
    } else if (prevPressedBtn === 'operation' && prevOperand === '') {
      setprevOperand(currentOperand);
      setcurrentOperand(`${num}`);
    } else if (prevPressedBtn === 'operation' && currentOperand.includes('-')) {
      setcurrentOperand(`-${num}`);
    } else if (currentOperand.length >= 12) {
        return '';
    } else {
      setcurrentOperand(`${currentOperand}${num}`);
    }
  };

  const appendDecimal = () => {
    if (currentOperand.length >= 18) {
      return;
    }
    if (currentOperand.includes('.')) {
      return;
    } else {
      setcurrentOperand(`${currentOperand}${'.'}`);
    }
  };


  return (
    <div className="App">
      <div className="calc-container">
        <div id="display">
          <span id="prevOperand">{prevOperand}</span>
          <span id="currentOperand">{currentOperand}</span>
        </div>

        <div className="buttons-container">
          <div className="button-row">
            <button id="clear" onClick={allClear}>
              AC
            </button>
            <button id="del" onClick={deleteLastNum}>
              del
            </button>
            <button id="divide" onClick={saveOperation}>
              ÷
            </button>
          </div>
          <div className="button-row">
            <button id="seven" onClick={appendNumber}>
              7
            </button>
            <button id="eight" onClick={appendNumber}>
              8
            </button>
            <button id="nine" onClick={appendNumber}>
              9
            </button>
            <button id="multiply" onClick={saveOperation}>
              x
            </button>
          </div>
          <div className="button-row">
            <button id="four" onClick={appendNumber}>
              4
            </button>
            <button id="five" onClick={appendNumber}>
              5
            </button>
            <button id="six" onClick={appendNumber}>
              6
            </button>
            <button id="subtract" onClick={saveOperation}>
              -
            </button>
          </div>
          <div className="button-row">
            <button id="one" onClick={appendNumber}>
              1
            </button>
            <button id="two" onClick={appendNumber}>
              2
            </button>
            <button id="three" onClick={appendNumber}>
              3
            </button>
            <button id="add" onClick={saveOperation}>
              +
            </button>
          </div>
          <div className="button-row" id="bottom-row">
            <button id="zero" onClick={appendNumber}>
              0
            </button>
            <button id="decimal" onClick={appendDecimal}>
              .
            </button>
            <button id="equals" onClick={calculate}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
