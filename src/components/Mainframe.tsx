import { useState, useEffect } from "react";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";
import { EqualsButton } from "./EqualsButton";
import { useCalculator } from "./useCalculator";
import "./Mainframe.css";

export const Mainframe = () => {
  const [preview, setPreview] = useState(0);
  const {
    handleOperations,
    handleClear,
    handleCalculation,
    handleDecimal,
    handleEquals,
    handleNumbers,
    input,
  } = useCalculator();

  const buttonValues = [
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "C"],
    ["÷", "="],
  ];

  const operators = ["=", "C", "+", "-", "x", "÷", "."];

  useEffect(() => {
    localStorage.setItem("input", input.join(" "));
  });

  const handleClick = (value:string|number) => {
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
        handleNumbers(Number(value));
        break;
    }
  };

  useEffect(() => {
    console.log("entering preview use effect function");

    if (input.length === 0) {
      setPreview(0);
    }

    //identifies if any operators are present in input
    const containsOperator = (input:any, operators:string[]) => {
      return input.some((element:string) => operators.includes(element));
    };

    if (containsOperator(input, operators)) {
      setPreview(handleCalculation(input) as number);
    }
  }, [input]);

  return (
      <section className="calculator-body">
        <label className="full-width-span" htmlFor="input">Enter Calculation:</label>
        <input
          className="full-width-span"
          type="text"
          id="input"
          name="input"
          value={input.length > 0 ? input.map((item) => String(item)).join(" ") : ""}
        ></input>
        <div className="full-width-span">Preview: {preview}</div>
          {buttonValues.flat().map((btn, i) => {
            if (btn === "=") {
              return (
                <EqualsButton
                  value={btn}
                  onClick={() => handleClick(btn)}
                />
              );
            } else if (operators.includes(btn.toString()) && btn !== '=') {
              return (
                <OperationButton
                  value={btn.toString()}
                  onClick={() => handleClick(btn)}
                />
              );
            } else if (!isNaN(Number(btn)))
              return (
                <DigitButton
                  value={Number(btn)}
                  onClick={() => handleClick(btn)}
                />
              );
          })}
      </section>
  );
};
