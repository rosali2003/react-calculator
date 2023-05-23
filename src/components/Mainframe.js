import { useState, useEffect } from 'react';
import { Button } from './Button';


export const Mainframe = () => {
    const [currentValue, setCurrentValue] = useState(0);
    const [input, setInput] = useState([]);

    const buttonValues = [
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],]

    const handleNumbers = (input) => {
        console.log('input',input)
        setInput(prevInput => prevInput.concat(input));
    }

    const handleClear = () => {
        console.log('clear pressed\n')
        console.log('input', input);
        setInput([]);
    }

    const handleEquals = () => {
        console.log("handle equals pressed")
        //only place where value is set
        let result = 0;
        let index;
        while (input.includes('x') || input.includes('÷'))  {
            if (input.includes('x')) {
                index = input.indexOf('x');
                result = Number(input[index-1]) * Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 1);
                input.splice(index+1, 1);
            } else if (input.includes('÷')) {
                index = input.indexOf('÷');
                result = Number(input[index-1]) / Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 1);
                input.splice(index+1, 1);
            }
        }

        while (input.includes('+') || input.includes('-')) {
            if(input.includes('+')) {
                index = input.indexOf('+');
                result = Number(input[index-1]) + Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 1);
                input.splice(index+1, 1);
                console.log('input',input)
            } else if (input.includes('-')) {
                index = input.indexOf('-');
                result = Number(input[index-1]) - Number(input[index+1]);
                input[index-1] = result;
                input.splice(index, 1);
                input.splice(index+1, 1);
                console.log('input',input)
            }
        }

        for (let i =1; i<input.length; i++) {
            input.splice(i,1);
        }

        setCurrentValue(prevValue => input[0]);
        setInput(prevValue => input[0]);
        
    }

    const handleDecimal = () => {
        setInput(prevInput => prevInput.concat('.'));
    }

    const handleOperations = (input) => {
        console.log("handle operations pressed");
        setInput(prevInput => prevInput.concat(input));
       
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
            <label htmlFor="input">Enter:</label>
            <input type="text" id="input" name="input" value={input.length > 0 ? input.join('') : input}></input>
          <div className='button-body'>
            <button onClick={() => handleClick('clear')}>C</button>
                {
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
