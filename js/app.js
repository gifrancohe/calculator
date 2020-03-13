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
}