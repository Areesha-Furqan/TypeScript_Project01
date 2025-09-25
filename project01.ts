import * as readline from 'readline-sync';

function calculator() {
    console.log('Welcome to the calculator!\n');

    const num1: number = parseFloat(readline.question('Enter the first number: ')); //parseFloat is used to convert the input (i.e in string inside the console) to a number
    const operator: string = readline.question('Enter the operator: '); //readline.question is used to get the input from the user
    const num2: number = parseFloat(readline.question('Enter the second number: '));
    let result; //will use in switch casee

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                console.log('Error: Division by zero');
                return; //this return will ask the numbers again
            }
            result = num1 / num2;
            break;
        default:
            console.log('Invalid operator');
            return; //this will ask opertor again
    }
    console.log(`The result is: ${num1} ${operator} ${num2} = ${result}`);

}

calculator()