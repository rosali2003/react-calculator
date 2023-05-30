import { useState, useEffect } from 'react';
import { Button } from './Button';


export const Mainframe = () => {
    const [input, setInput] = useState(() => {
        const retrieved = localStorage.getItem('input');

        if (retrieved !== null) {
          return retrieved.split(" ").map((value) => (isNaN(Number(value)) ? value : Number(value)));
        }

        return [];
      });

    const [preview, setPreview] = useState(0);

    const buttonValues = [
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],]

    useEffect(() => {
        localStorage.setItem('input', input.join(" "))
    })

    const handleNumbers = (value) => {
        console.log("handle numbers pressed")
        setInput((prevInput) => {
            console.log("previnput", prevInput)
            if(typeof prevInput[prevInput.length - 1] === "string" && prevInput[prevInput.length - 1].includes(".")) {
                console.log("entering handle numbers decimal")

                const updatedInput = prevInput.slice(0, -1);
                const newValue = Number(prevInput[prevInput.length - 1]) + value * 0.1;
                updatedInput.push(newValue);
                return updatedInput;
            } else if (prevInput[prevInput.length-1] !== Math.floor(prevInput[prevInput.length-1])) {
                console.log("entering prevInput flooring statement")
                //convert last element of prevInput into string
                //determine index of '.'
                //determine length of string
                //numDecimal = length of string - index of '.'
                //0.1^numDecimal
                // const decimalPlaces = () => {
                //     const newValue = prevInput[prevInput.length-1].toString()
                //     return (0.1)^(newValue.length - newValue.indexOf('.'))

                // }
                return prevInput[prevInput.length-1] * 0.1 + value;

                console.log("prevInput[prevInput.length-1] * 0.1", prevInput[prevInput.length-1] * 0.1);
            }
            if (typeof prevInput[prevInput.length - 1] !== "number") {
                return prevInput.concat(value);
            }

            const updatedInput = prevInput.slice(0, -1);

            updatedInput.push(prevInput[prevInput.length - 1] * 10 + value);
            return updatedInput;
        });

    }

    const handleClear = () => {
        console.log('clear pressed\n')
        setInput([]);
    }

    const handleCalculation = (inputArr) => {
        console.log("handle equals pressed")
        let result = 0;
        let index;
        let inputArrCopy = [...inputArr];

        // while (inputArrCopy.includes('.')) {
        //     index = inputArrCopy.indexOf('.');
        //     const numDigits = inputArrCopy.toString().length
        //     for(let i = 0; i < numDigits;i++) {
        //         inputArrCopy[index+1] = inputArrCopy[index+1]
        //     }
        //     result = inputArrCopy[index-1] + inputArrCopy[index+1];
        //     inputArrCopy[index-1] = result;
        //     inputArrCopy.splice(index,2)
        // }

        while (inputArrCopy.includes('x') || inputArrCopy.includes('÷'))  {
            if (inputArrCopy.includes('x')) {
                index = inputArrCopy.indexOf('x');
                result = Number(inputArrCopy[index-1]) * Number(inputArrCopy[index+1]);
                inputArrCopy[index-1] = result;
                inputArrCopy.splice(index,2)
            } else if (inputArrCopy.includes('÷')) {
                index = inputArrCopy.indexOf('÷');
                result = Number(inputArrCopy[index-1]) / Number(inputArrCopy[index+1]);
                inputArrCopy[index-1] = result;
                inputArrCopy.splice(index, 2);
            }
        }

        while (inputArrCopy.includes('+') || inputArrCopy.includes('-')) {
            if(inputArrCopy.includes('+')) {
                index = inputArrCopy.indexOf('+');
                result = Number(inputArrCopy[index-1]) + Number(inputArrCopy[index+1]);
                inputArrCopy[index-1] = result;
                inputArrCopy.splice(index, 2);
            } else if (inputArrCopy.includes('-')) {
                index = inputArrCopy.indexOf('-');
                result = Number(inputArrCopy[index-1]) - Number(inputArrCopy[index+1]);
                inputArrCopy[index-1] = result;
                inputArrCopy.splice(index, 2);
            }
        }

        for (let i =1; i<inputArrCopy.length; i++) {
            inputArrCopy.splice(i,1);
        }

        return inputArrCopy[0];

    }

    const handleEquals = () => {
        const result = handleCalculation(input);
        setInput([result]);
    }

    const handleDecimal = () => {
        console.log('handle decimal pressed')
        if (typeof input[input.length-1] === 'number') {
            setInput((prevInput) => {
                const updatedInput = prevInput.slice(0,-1);
                updatedInput.push(prevInput[prevInput.length-1] + '.')
                return updatedInput
            })
        } else {
            alert('Error, can only add decimal points to numbers');
        }

    }

    const handleOperations = (value) => {
        console.log("handle operations pressed");

        if(typeof input[input.length-1] === 'string') {
            alert('error, cannot input another operator. An operator must be followed by a number.')
        } else {
            setInput(prevInput => prevInput.concat(value));
        }
    }

    const handleClick = (value) => {
        switch (value) {
            case '=':
                handleEquals();
                break;
            case 'C':
                handleClear();
                break;
            case '.':
                handleDecimal();
                break;
            case '+':
            case '-':
            case 'x':
            case '÷':
                handleOperations(value);
                break;
            default:
                handleNumbers(value);
                break;
        }
    }

    // useEffect(() => {
    //     console.log("entering preview use effect function");

    //     const operators = ['=', 'C', '+', '-', 'x', '÷'];


    //     const containsOperator = (input, operators) => {
    //         return input.some((element) => operators.includes(element));
    //       };

    //     if (containsOperator(input, operators)) {
    //         setPreview(handleCalculation(input));
    //     }
    // }, [input])


    return(
        <section className="calculator-body">
            <label htmlFor="input">Enter Calculation:</label>
            <input type="text" id="input" name="input" value={input.length > 0 ? input.join(" ") : input}></input>
            <div>preview: {preview}</div>
          <div className='button-body'>
            <button onClick={() => handleClick('C')}>C</button>
                {
                    //remove the flatten since no longer 2d array
                buttonValues.flat().map((btn, i) => {
                    return (
                    <Button
                        key={i}
                        className={btn === "=" ? "equals" : "button"}
                        value={btn}
                        onClick={() => handleClick(btn)}
                    />
                    );
                })
                }
            </div>
        </section>
    )

}
