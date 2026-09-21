
const display = document.getElementById("display");


// Add number
function addNumber(number) {

    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0" && number !== ".") {
        display.value = number;
    } 
    else {
        display.value += number;
    }
}


// Add operator
function addOperator(operator) {

    const lastCharacter =
        display.value.slice(-1);

    // Prevent two operators together
    if ("+-*/%".includes(lastCharacter)) {
        return;
    }

    display.value += operator;
}


// Clear calculator
function clearDisplay() {

    display.value = "0";
}


// Delete last character
function deleteNumber() {

    if (
        display.value.length === 1 ||
        display.value === "Error"
    ) {
        display.value = "0";
    } 
    else {
        display.value =
            display.value.slice(0, -1);
    }
}


// Calculate using backend
async function calculate() {

    try {

        const expression = display.value;

        const response = await fetch(
            "http://localhost:5000/api/calculate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    expression: expression
                })
            }
        );

        const data = await response.json();

        if (data.success) {
            display.value = data.result;
        } 
        else {
            display.value = "Error";
        }

    } catch (error) {

        console.error(error);

        display.value = "Server Error";
    }
}
