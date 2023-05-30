import { useState } from 'react';
import { Button } from './Button';


export const Mainframe = () => {
    const [input, setInput] = useState([])
    const buttonValues = [
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],]

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

    const handleEquals = () => {
        console.log("handle equals pressed")
        let result = 0;
        let index;
        while (input.includes('x') || input.includes('÷'))  {
            if (input.includes('x')) {
                index = input.indexOf('x');
                //should be number already, don't need to convert
                result = Number(input[index-1]) * Number(input[index+1]);
                input[index-1] = result;
                console.log('input', input)
                let rem1 = input.splice(index,2)
                // let rem2 = input.splice(index+1,1)
                console.log('rem1', rem1)
                console.log('input[index-1]', input)
            } else if (input.includes('÷')) {
                index = input.indexOf('÷');
                result = Number(input[index-1]) / Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 2);
            }
        }

        console.log('before +- input', input);

        while (input.includes('+') || input.includes('-')) {
            if(input.includes('+')) {
                index = input.indexOf('+');
                result = Number(input[index-1]) + Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 2);
            } else if (input.includes('-')) {
                index = input.indexOf('-');
                result = Number(input[index-1]) - Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 2);
            }
        }

        for (let i =1; i<input.length; i++) {
            input.splice(i,1);
        }

        console.log('after +- input', input);

        setInput(input[0]);

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


    return(
        <section className="calculator-body">
            <label htmlFor="input">Enter Calculation:</label>
            <input type="text" id="input" name="input" value={input.length > 0 ? input.join('') : input}></input>
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
