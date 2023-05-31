import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState(() => {
    const retrieved = localStorage.getItem("input");

    if (retrieved !== null) {
      return retrieved
        .split(" ")
        .map((value) => (isNaN(Number(value)) ? value : Number(value)));
    }

    return [];
  });

  const handleOperations = (operation) => {
    console.log("handle operations pressed");

    if (typeof input[input.length - 1] === "string") {
      alert(
        "error, cannot input another operator. An operator must be followed by a number."
      );
    } else {
      setInput((prevInput) => prevInput.concat(operation));
    }
  };

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
    console.log(inputArrCopy)

    //convert numbers to decimals
    while (inputArrCopy.includes(".")) {
      index = inputArrCopy.indexOf(".");
      console.log("inputArrCopy", inputArrCopy)
      if(index + 1 >= inputArrCopy.length) {
        return
      }
      const numDecimals = 0.1 ** inputArrCopy[index + 1].toString().length;
      result = inputArrCopy[index - 1] + inputArrCopy[index + 1] * numDecimals;
      //if nothing after '.', it will crash, handle this case
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



  return { handleOperations, handleClear, handleCalculation, handleDecimal, handleEquals, handleNumbers, input};
};

// const Calculator = () => {
//   const { handleDecimal, addDigit, handleOperations, clear, calculate, output } =
//     useCalculator();
// };
