import { useState, useEffect } from "react";
import { Button } from "./Button";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";
import { EqualsButton } from "./EqualsButton";

export const Mainframe = () => {
  const [input, setInput] = useState(() => {
    const retrieved = localStorage.getItem("input");

    if (retrieved !== null) {
      return retrieved
        .split(" ")
        .map((value) => (isNaN(Number(value)) ? value : Number(value)));
    }

    return [];
  });

  const [preview, setPreview] = useState(0);

  const buttonValues = [
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const operators = ["=", "C", "+", "-", "x", "÷"];

  useEffect(() => {
    localStorage.setItem("input", input.join(" "));
  });

  const handleNumbers = (value) => {
    console.log("handle numbers pressed");
    setInput((prevInput) => {
      if (typeof prevInput[prevInput.length - 1] !== "number") {
        return prevInput.concat(value);
      }

      const updatedInput = prevInput.slice(0, -1);

      updatedInput.push(prevInput[prevInput.length - 1] * 10 + value);
      return updatedInput;
    });
  };

  const handleClear = () => {
    console.log("clear pressed\n");
    setInput([]);
  };

  const handleCalculation = (inputArr) => {
    console.log("handle equals pressed");
    let result = 0;
    let index;
    let inputArrCopy = [...inputArr];

    //convert numbers to decimals
    while (inputArrCopy.includes(".")) {
      index = inputArrCopy.indexOf(".");
      const numDecimals = 0.1 ** inputArrCopy[index + 1].toString().length;
      result = inputArrCopy[index - 1] + inputArrCopy[index + 1] * numDecimals;
      inputArrCopy[index - 1] = result;
      inputArrCopy.splice(index, 2);
    }

    while (inputArrCopy.includes("x") || inputArrCopy.includes("÷")) {
      if (inputArrCopy.includes("x")) {
        index = inputArrCopy.indexOf("x");
        result =
          Number(inputArrCopy[index - 1]) * Number(inputArrCopy[index + 1]);
        inputArrCopy[index - 1] = result;
        inputArrCopy.splice(index, 2);
      } else if (inputArrCopy.includes("÷")) {
        index = inputArrCopy.indexOf("÷");
        result =
          Number(inputArrCopy[index - 1]) / Number(inputArrCopy[index + 1]);
        inputArrCopy[index - 1] = result;
        inputArrCopy.splice(index, 2);
      }
    }

    while (inputArrCopy.includes("+") || inputArrCopy.includes("-")) {
      if (inputArrCopy.includes("+")) {
        index = inputArrCopy.indexOf("+");
        result =
          Number(inputArrCopy[index - 1]) + Number(inputArrCopy[index + 1]);
        inputArrCopy[index - 1] = result;
        inputArrCopy.splice(index, 2);
      } else if (inputArrCopy.includes("-")) {
        index = inputArrCopy.indexOf("-");
        result =
          Number(inputArrCopy[index - 1]) - Number(inputArrCopy[index + 1]);
        inputArrCopy[index - 1] = result;
        inputArrCopy.splice(index, 2);
      }
    }

    for (let i = 1; i < inputArrCopy.length; i++) {
      inputArrCopy.splice(i, 1);
    }

    return inputArrCopy[0];
  };

  const handleEquals = () => {
    const result = handleCalculation(input);
    setInput([result]);
  };

  const handleDecimal = () => {
    console.log("handle decimal pressed");
    if (typeof input[input.length - 1] === "number") {
      setInput((prevInput) => prevInput.concat("."));
    } else {
      alert("Error, can only add decimal points to numbers");
    }
  };

  const handleOperations = (value) => {
    console.log("handle operations pressed");

    if (typeof input[input.length - 1] === "string") {
      alert(
        "error, cannot input another operator. An operator must be followed by a number."
      );
    } else {
      setInput((prevInput) => prevInput.concat(value));
    }
  };

  const handleClick = (value) => {
    switch (value) {
      case "=":
        handleEquals();
        break;
      case "C":
        handleClear();
        break;
      case ".":
        handleDecimal();
        break;
      case "+":
      case "-":
      case "x":
      case "÷":
        handleOperations(value);
        break;
      default:
        handleNumbers(value);
        break;
    }
  };

  useEffect(() => {
    console.log("entering preview use effect function");

    if (input.length === 0) {
      setPreview(0);
    }

    // console.log("preview", preview)
    // console.log("isNaN(preview)", isNaN(preview))
    // if(isNaN(preview)) {
    //     console.log("entering preview is NaN function in useEffect")
    //     setPreview(input[input.length-2])
    // }

    //identifies if any operators are present in input
    const containsOperator = (input, operators) => {
      return input.some((element) => operators.includes(element));
    };

    if (containsOperator(input, operators)) {
      setPreview(handleCalculation(input));
    }
  }, [input]);

  return (
    <section className="calculator-body">
      <label htmlFor="input">Enter Calculation:</label>
      <input
        type="text"
        id="input"
        name="input"
        value={input.length > 0 ? input.join(" ") : input}
      ></input>
      <div>preview: {preview}</div>
      <div className="button-body">
        <button onClick={() => handleClick("C")}>C</button>
        <button onClick={() => handleClick("÷")}>÷</button>
        {buttonValues.flat().map((btn, i) => {
          if (operators.includes(btn)) {
            return (
              <OperationButton
                key={btn}
                value={btn}
                onClick={() => handleClick(btn)}
              />
            );
          } else if (btn === "=") {
            return <EqualsButton key={btn} onClick={() => handleClick(btn)} />;
          } else if (!isNaN(Number(btn)))
            return (
              <DigitButton
                key={btn}
                value={btn}
                onClick={() => handleClick(btn)}
              />
            );
        })}
      </div>
    </section>
  );
};
