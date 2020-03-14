var Calculator = {

    /**
     * Variables
     */
    displayValue: 0,
    operator: null,
    value1: 0,
    value2: 0,
    result: 0,
    lastValue: 0,
    equalFlag: true,

    /**
     * Basic Operations
     */

    addition: (a, b) => {
        return (parseFloat(a) + parseFloat(b));
    },
    subtraction: (a, b) => {
        return (parseFloat(a) - parseFloat(b));
    },
    multiplication: (a, b) => {
        return (parseFloat(a) * parseFloat(b));
    },
    division: (a , b) => {
        if(b == 0)
            return "ERROR";
        return (parseFloat(a) / parseFloat(b));
    },

    /**
     * Validate point and cero on screen
     */
    validateZero: (key, display) => {
        if(key == 0 && display == "0")
            return true;
        return false;
    },
    validatePoint: display => {
        if(/([.])/.test(display)){
            return; 
        }else {
            if(display == "0") {
                Calculator.displayValue = "0.";
            }else {
                Calculator.displayValue = Calculator.displayValue + ".";
            }
        }
    },
    /**
     * Function to reset calculator
     */
    onCFunction: () => {
        Calculator.displayValue = 0;
        Calculator.operator = null;
        Calculator.value1 = 0;
        Calculator.value2 = 0;
        Calculator.result = 0;
        Calculator.lastValue = 0;
    },
    /**
     * Function to change the sign number
     */
    changeSign: () => {
        Calculator.displayValue = (Calculator.displayValue * -1);
    },
    /**
     * Function to update the screen
     */
    updateScreen: () => {
        var screen = document.getElementById('display'); //screen value
        screen.textContent = Calculator.displayValue;
    },
    /**
     * Function to determine the operation to perform
     */
    operations: (key, value1, value2) => {
        switch (key) {
            case "mas":
                Calculator.result = Calculator.addition( value1, value2);
                break;
            case "menos":
                Calculator.result = Calculator.subtraction( value1, value2);
                break;
            case "por":
                Calculator.result = Calculator.multiplication( value1, value2);
                break;
            default:
                Calculator.result = Calculator.division( value1, value2);
                break;
        }
    },
    /**
     * Function to determine the result of the operation
     */
    equal: () => {
        if(Calculator.equalFlag) {
            Calculator.value2 = Calculator.displayValue;
            Calculator.lastValue = Calculator.displayValue;
            Calculator.operations(Calculator.operator, Calculator.value1, Calculator.value2);
        }else {
            Calculator.operations(Calculator.operator, Calculator.value1, Calculator.lastValue);
        }

        Calculator.value1 = Calculator.result;
        Calculator.equalFlag = false;
        Calculator.displayValue = Calculator.result;
        Calculator.updateScreen();
    },
    /**
     * Function to determine the event occurred in the calculator
     */
    functions: (key) => {
        switch (key) {
            case "On":
                Calculator.onCFunction();
                break;
            case "signo":
                Calculator.changeSign();
                break;
            case "punto":
                Calculator.validatePoint(Calculator.displayValue);
                break;
            case "igual":
                Calculator.equal();
                break;
            default:
                Calculator.value1 = Calculator.displayValue;
                Calculator.operator = key;
                Calculator.displayValue = "";
                Calculator.equalFlag = true;
                break;
        }
        Calculator.updateScreen();
    },
    /**
     * Function that executes  any button  on the calculator is pressed
     * and validates if the button is a number or a special key
     */
    execute: (element) => {
        let key = element.alt;
        element.classList.add("small"); //Add class to small button
        if(/^([0-9])*$/.test(key)) { //Validate if the key pressed is a number
            if(Calculator.validateZero(key, Calculator.displayValue)) {
                return;
            }else {
                if(Calculator.displayValue.toString().length <= 8) {
                    if(Calculator.displayValue != "0")
                        Calculator.displayValue = Calculator.displayValue + key;
                    else
                        Calculator.displayValue = key;
                }
            }
            Calculator.updateScreen();
        }else {
            Calculator.functions(key);
        }
        setTimeout(function(){element.classList.remove("small")}, 100)//Delete style to small button after waiting 100 milliseconds
    },
    /**
     * Funtion that initializes and assigns the execute function to all the calculator buttons
     */
    init: (function() {
		var teclas = document.getElementsByClassName('tecla');
        for (var i = 0; i < teclas.length; i++) {
            teclas[i].addEventListener('click', function() {
                Calculator.execute(this);
            });
        }
	})
}
//The init method is executed
Calculator.init();