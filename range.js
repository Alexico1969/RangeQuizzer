function generateRandomRange() {
    let x = Math.floor(Math.random() * 11); // 0 to 10
    let y = Math.floor(Math.random() * 21) + 15; // 15 to 35
    let z = Math.floor(Math.random() * 4) + 2; // 2 to 5
    return [x, y, z];
}

function displayRange() {
    let [x, y, z] = generateRandomRange();
    document.getElementById('rangeDisplay').innerText = `range(${x}, ${y}, ${z})`;
    return [x, y, z];
}

let correctRange = displayRange();

function calculateLastNumber([x, y, z]) {

    let rangeArray = [];
    let lastNumber = 0;
    for (let i = x; i <= y; i += z) {
        rangeArray.push(i);
    }
    lastNumber = rangeArray[rangeArray.length - 1];
    if (lastNumber == y) {
        lastNumber = rangeArray[rangeArray.length - 2];
    } 
    return lastNumber;
}




function checkAnswer() {
    console.log("numbersArray: " + numbersArray);
    let userAnswer = parseInt(document.getElementById('userInput').value);
    let correctAnswer = calculateLastNumber(numbersArray);
    document.getElementById('submit').style.display = 'none';
    if (userAnswer === correctAnswer) {
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
    numbersArray = displayRange();
}
