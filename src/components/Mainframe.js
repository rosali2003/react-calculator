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
        localStorage.setItem('input', input)
    })

    const handleNumbers = (value) => {
        setInput((prevInput) => {
            if (typeof prevInput[prevInput.length - 1] !== "number") {
                return prevInput.concat(value);
            }

            const updatedInput = prevInput.slice(0, -1);

            // if(!Number.isInteger(prevInput[prevInput.length-1])) {
            //     updatedInput.push(prevInput[prevInput.length-1] + value);
            // }

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
        while (inputArrCopy.includes('x') || inputArrCopy.includes('÷'))  {
            if (inputArrCopy.includes('x')) {
                index = inputArrCopy.indexOf('x');
                result = Number(inputArrCopy[index-1]) * Number(inputArrCopy[index+1]);
                inputArrCopy[index-1] = result;
                console.log('inputArrCopy', inputArrCopy)
                let rem1 = inputArrCopy.splice(index,2)
                console.log('rem1', rem1)
                console.log('inputArrCopy[index-1]', inputArrCopy)
            } else if (inputArrCopy.includes('÷')) {
                index = inputArrCopy.indexOf('÷');
                result = Number(inputArrCopy[index-1]) / Number(inputArrCopy[index+1]);
                inputArrCopy[index-1] = result;
                inputArrCopy.splice(index, 2);
            }
        }

        console.log('before +- inputArrCopy', inputArrCopy);

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

        console.log('after +- inputArrCopy', inputArrCopy);

        return inputArrCopy[0];

    }

    const handleEquals = () => {
        const result = handleCalculation(input);
        setInput(result);
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
                handleEquals(input);
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
                handleNumbers();
                break;
        }
    }

    useEffect(() => {
        setPreview(handleCalculation(input))
        const operators = ['=', 'C', '+', '-', 'x', '÷'];
        let contains;

        const containsOperator = (input, operators) => {
            return input.some((element) => operators.includes(element));
          };

        if (containsOperator(input, operators)) {
            setPreview(handleCalculation(input));
        }
    }, [input])


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
