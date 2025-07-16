import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performScientificOperation = (func) => {
    const inputValue = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case 'x²':
        result = Math.pow(inputValue, 2);
        break;
      case 'x³':
        result = Math.pow(inputValue, 3);
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'exp':
        result = Math.exp(inputValue);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '60px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const numberButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
    color: isDarkMode ? '#ffffff' : '#111827',
  };

  const operatorButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white',
  };

  const scientificButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#8b5cf6',
    color: 'white',
    fontSize: '14px',
  };

  const equalsButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#10b981',
    color: 'white',
    gridColumn: 'span 2',
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444',
    color: 'white',
  };

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

const containerStyle = {
  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
  borderRadius: '20px',
  padding: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  width: '100%',
  maxWidth: isScientific ? '600px' : '400px',
  border: '2px solid rgba(255, 255, 255, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};


  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#111827',
  };

  const toggleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const toggleLabelStyle = {
    fontSize: '14px',
    color: isDarkMode ? '#d1d5db' : '#6b7280',
  };

  const toggleSwitchStyle = {
    position: 'relative',
    width: '50px',
    height: '24px',
    backgroundColor: isScientific ? '#3b82f6' : '#d1d5db',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const toggleKnobStyle = {
    position: 'absolute',
    top: '2px',
    left: isScientific ? '28px' : '2px',
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'left 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

 const displayStyle = {
  width: '100%',
  maxWidth: '100%',
  height: '80px',
  backgroundColor: isDarkMode ? '#374151' : '#f8fafc',
  border: `2px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'}`,
  borderRadius: '12px',
  padding: '20px',
  fontSize: '32px',
  fontWeight: '700',
  fontFamily: 'monospace',
  color: isDarkMode ? '#ffffff' : '#1e293b',
  marginBottom: '20px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'flex',              
  alignItems: 'center',         
  justifyContent: 'flex-end',  
  boxSizing: 'border-box',     
};

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: isScientific ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)',
    gap: '12px',
  };

  const darkModeToggleStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
    color: isDarkMode ? '#ffffff' : '#111827',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    transition: 'all 0.2s ease',
  };

  return (
    <div style={appStyle}>
      <button
        style={darkModeToggleStyle}
        onClick={() => setIsDarkMode(!isDarkMode)}
        title="Toggle Dark Mode"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Calculator</h1>
          <div style={toggleContainerStyle}>
            <span style={toggleLabelStyle}>Basic</span>
            <div
              style={toggleSwitchStyle}
              onClick={() => setIsScientific(!isScientific)}
            >
              <div style={toggleKnobStyle}></div>
            </div>
            <span style={toggleLabelStyle}>Scientific</span>
          </div>
        </div>

        <div style={displayStyle}>
          {display}
        </div>

        <div style={buttonGridStyle}>
          {isScientific && (
            <>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('sin')}>sin</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('cos')}>cos</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('tan')}>tan</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('ln')}>ln</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('log')}>log</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('sqrt')}>√</button>
              
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('x²')}>x²</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('x³')}>x³</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('1/x')}>1/x</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('exp')}>eˣ</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('π')}>π</button>
              <button style={scientificButtonStyle} onClick={() => performScientificOperation('e')}>e</button>
            </>
          )}

          <button style={clearButtonStyle} onClick={clear}>C</button>
          <button style={operatorButtonStyle} onClick={toggleSign}>±</button>
          <button style={operatorButtonStyle} onClick={percentage}>%</button>
          <button style={operatorButtonStyle} onClick={() => performOperation('/')}>÷</button>

          <button style={numberButtonStyle} onClick={() => inputNumber(7)}>7</button>
          <button style={numberButtonStyle} onClick={() => inputNumber(8)}>8</button>
          <button style={numberButtonStyle} onClick={() => inputNumber(9)}>9</button>
          <button style={operatorButtonStyle} onClick={() => performOperation('*')}>×</button>

          <button style={numberButtonStyle} onClick={() => inputNumber(4)}>4</button>
          <button style={numberButtonStyle} onClick={() => inputNumber(5)}>5</button>
          <button style={numberButtonStyle} onClick={() => inputNumber(6)}>6</button>
          <button style={operatorButtonStyle} onClick={() => performOperation('-')}>−</button>

          <button style={numberButtonStyle} onClick={() => inputNumber(1)}>1</button>
          <button style={numberButtonStyle} onClick={() => inputNumber(2)}>2</button>
          <button style={numberButtonStyle} onClick={() => inputNumber(3)}>3</button>
          <button style={operatorButtonStyle} onClick={() => performOperation('+')}>+</button>

          <button style={{...numberButtonStyle, gridColumn: 'span 2'}} onClick={() => inputNumber(0)}>0</button>
          <button style={numberButtonStyle} onClick={inputDecimal}>.</button>
          <button style={equalsButtonStyle} onClick={() => performOperation('=')}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;