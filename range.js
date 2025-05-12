function generateRandomRange() {
    const allowNegative = document.getElementById('toggleNegative').checked;
    const allowNegativeSteps = document.getElementById('toggleNegativeSteps').checked;
    const oneParam = document.getElementById('toggle1Param').checked;
    const twoParams = document.getElementById('toggle2Params').checked;
    const threeParams = document.getElementById('toggle3Params').checked;

    let x = Math.floor(Math.random() * 11); // Default: 0 to 10
    let y = Math.floor(Math.random() * 21) + 15; // Default: 15 to 35
    let z = Math.floor(Math.random() * 4) + 2; // Default: 2 to 5

    if (allowNegative) {
        x = Math.floor(Math.random() * 21) - 10; // -10 to 10
        y = Math.floor(Math.random() * 41) - 20; // -20 to 20
    }

    if (oneParam) {
        // Generate a range with 1 parameter
        do {
            x = Math.floor(Math.random() * 21); // Ensure x is not 0
        } while (x === 0);
        return [x];
    } else if (twoParams) {
        // Generate a range with 2 parameters
        do {
            y = Math.floor(Math.random() * 31) + x; // Ensure y > x
        } while (y <= x); // Retry if y is not greater than x
        return [x, y];
    } else if (threeParams) {
        // Generate a range with 3 parameters
        if (allowNegativeSteps) {
            // Handle negative steps
            do {
                x = Math.floor(Math.random() * 21) + 10; // Ensure x > y
                y = Math.floor(Math.random() * 21); // Ensure y < x
                z = -(Math.floor(Math.random() * 4) + 2); // Negative step size between -2 and -5
            } while (x - y <= Math.abs(z)); // Ensure the difference is greater than the step
        } else {
            // Handle positive steps
            do {
                y = Math.floor(Math.random() * 21) + x; // Ensure y > x
            } while (y <= x); // Retry if y is not greater than x
            z = Math.floor(Math.random() * 4) + 2; // Step size between 2 and 5
        }
        return [x, y, z];
    }

    // Default to 3 parameters if no toggle is selected
    return [x, y, z];
}

function displayRange() {
    let range = generateRandomRange();
    let rangeText;

    if (range.length === 1) {
        rangeText = `range(${range[0]})`;
    } else if (range.length === 2) {
        rangeText = `range(${range[0]}, ${range[1]})`;
    } else if (range.length === 3) {
        rangeText = `range(${range[0]}, ${range[1]}, ${range[2]})`;
    }

    document.getElementById('rangeDisplay').innerText = rangeText;
    return range;
}

let correctRange = displayRange();

function calculateLastNumber(range) {
    if (range.length === 1) {
        // If the range has only one parameter, the range is [0, x), so the last number is x - 1
        return range[0] - 1;
    }

    let [x, y, z] = range; // Destructure the range array
    z = z || 1; // Default step size to 1 if not provided

    let lastNumber = x;

    // Calculate the last number in the range
    if (z > 0) {
        // Positive step: iterate while i < y
        for (let i = x; i < y; i += z) {
            lastNumber = i;
        }
    } else {
        // Negative step: iterate while i > y
        for (let i = x; i > y; i += z) {
            lastNumber = i;
        }
    }

    return lastNumber;
}

function checkAnswer() {
    console.log("numbersArray: " + numbersArray);
    let userAnswer = parseInt(document.getElementById('userInput').value);
    let correctAnswer = calculateLastNumber(numbersArray);
    document.getElementById('submit').style.display = 'none';
    if (userAnswer === correctAnswer) {
        document.getElementById('feedback').style.color = '#00FF00'; // Bright green
        document.getElementById('feedback').innerText = 'Correct!';
    } else {
        document.getElementById('feedback').style.color = 'red';
        document.getElementById('feedback').innerText = 'Incorrect, answer is ' + correctAnswer + '.';
    }
    document.getElementById('next').style.display = 'inline';
}


function nextQuestion(){
    document.getElementById('feedback').innerText = '';
    document.getElementById('userInput').value = '';
    document.getElementById('next').style.display = 'none';
    document.getElementById('submit').style.display = 'inline';
    numbersArray = displayRange();
}

// Call displayRange on page load
let numbersArray = [];
// Hide the next button
document.getElementById('next').style.display = 'none';



window.onload = function () {
    // Restore toggle states from localStorage
    const paramToggles = ['toggle1Param', 'toggle2Params', 'toggle3Params', 'toggleNegative', 'toggleNegativeSteps'];
    paramToggles.forEach((id) => {
        const savedState = localStorage.getItem(id);
        if (savedState !== null) {
            document.getElementById(id).checked = savedState === 'true';
        }
    });

    numbersArray = displayRange();

    // Ensure only one toggle for parameters is selected at a time
    paramToggles.forEach((id) => {
        document.getElementById(id).addEventListener('change', function () {
            // Save the state of the toggles to localStorage
            paramToggles.forEach((otherId) => {
                localStorage.setItem(otherId, document.getElementById(otherId).checked);
            });

            // Ensure mutual exclusivity for parameter toggles (except toggleNegative and toggleNegativeSteps)
            if (id !== 'toggleNegative' && id !== 'toggleNegativeSteps') {
                paramToggles.forEach((otherId) => {
                    if (otherId !== id && otherId !== 'toggleNegative' && otherId !== 'toggleNegativeSteps') {
                        document.getElementById(otherId).checked = false;
                        localStorage.setItem(otherId, false);
                    }
                });
            }

            // Refresh the page to generate a new assignment
            location.reload();
        });
    });
};
