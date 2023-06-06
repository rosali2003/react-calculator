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
        <label className="full-width-span" htmlFor="input">Enter Calculation:</label>
        <input
          className="full-width-span"
          type="text"
          id="input"
          name="input"
          value={input.length > 0 ? input.join(" ") : input}
        ></input>
        <div className="full-width-span">Preview: {preview}</div>
        {/* <div className="button-body"> */}
          {buttonValues.flat().map((btn, i) => {
            if (btn === "=") {
              return (
                <EqualsButton
                  className={"equals-button button"}
                  value={btn}
                  onClick={() => handleClick(btn)}
                />
              );
            } else if (operators.includes(btn) && btn !== '=') {
              return (
                <OperationButton
                  className={"operator-button button"}
                  value={btn}
                  onClick={() => handleClick(btn)}
                />
              );
            } else if (!isNaN(Number(btn)))
              return (
                <DigitButton
                  className={"digit-button button"}
                  value={btn}
                  onClick={() => handleClick(btn)}
                />
              );
          })}
        {/* </div> */}
      </section>
  );
};
