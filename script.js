import { letters, solutions, wordsObject } from "./database.js";

//Alert
const alertDiv = document.getElementById("alert");
function alert(text){
    alertDiv.style.height = "30px";
    setTimeout(() => {
        alertDiv.innerText = text;
    }, 1000);
    setTimeout(() => {
        alertDiv.innerText = "";
        alertDiv.style.height = "0px";
    }, 5000);
}


//Alphabet
const lettersContainer = document.getElementById("letters");

letters.forEach((letter) => {
    lettersContainer.innerHTML += `<button id="${letter.toUpperCase()}" class="letter">${letter.toUpperCase()}</div>`;
})

//Solution
const solution = solutions[Math.trunc(Math.random() * (solutions.length - 1))];

//Input
const gray = "#787C7F";
const green = "#6CA965";
const yellow ="#C8B653";

let input = "";
let column = 0;
let colorsArray = [gray, gray, gray, gray, gray];

document.addEventListener("keydown", (event) => {
    let key = event.key;
    let isLetter = false;
    letters.forEach((letter) => {
        if(key === letter){
            isLetter = true;
        }
    })

    if(key === "Enter"){
        if(input.length < 5){
            alert("La palabra tiene que tener 5 letras");
        }else if(wordsObject[input] != true){
            alert("La palabra no está en el diccionario");
        }else{
            let numberLettersSolution = {};
            let numberLettersInput = {};

            for(let i = 0; i < solution.length; i++){
                if(numberLettersSolution[solution[i]] === undefined){
                    numberLettersSolution[solution[i]] = 1;
                }else{
                    numberLettersSolution[solution[i]] += 1;
                }
            }

            for(let i = 0; i < input.length; i++){
                if(numberLettersInput[input[i]] === undefined){
                    numberLettersInput[input[i]] = 0;
                }
            }

            let greenI = [];
            for(let i = 0; i < 5; i++){
                if(input[i] === solution[i]){
                    colorsArray[i] = green;
                    numberLettersInput[input[i]] += 1;
                    greenI.push(i);
                    document.getElementById(input[i].toUpperCase()).style.backgroundColor = green;
                    document.getElementById(input[i].toUpperCase()).style.borderColor = green;
                    document.getElementById(input[i].toUpperCase()).style.color = "white";
                }
            }

            for(let i = 0; i < 5; i++){
                let iIncluded = false;
                greenI.forEach((e) => {
                    if(e === i){
                        iIncluded = true;
                    }
                })

                if(!iIncluded){
                    if(solution.includes(input[i]) && numberLettersInput[input[i]] < numberLettersSolution[input[i]]){
                        numberLettersInput[input[i]] += 1;
                        colorsArray[i] = yellow;
                        if(document.getElementById(input[i].toUpperCase()).style.backgroundColor != green){
                            document.getElementById(input[i].toUpperCase()).style.backgroundColor = yellow;
                            document.getElementById(input[i].toUpperCase()).style.borderColor = yellow;
                            document.getElementById(input[i].toUpperCase()).style.color = "white";
                        } 
                    }
                }
            }
            
            for(let i = 0; i < 5; i++){
                if(colorsArray[i] === gray && document.getElementById(input[i].toUpperCase()).style.backgroundColor != green && document.getElementById(input[i].toUpperCase()).style.backgroundColor != yellow){
                    document.getElementById(input[i].toUpperCase()).style.backgroundColor = gray;
                    document.getElementById(input[i].toUpperCase()).style.borderColor = gray;
                    document.getElementById(input[i].toUpperCase()).style.color = "white";
                }
            }

            for(let i = 0; i < 5; i++){
                let actualSquare = document.getElementById(`square${(column * 5) + i + 1}`);
                actualSquare.style.backgroundColor = colorsArray[i];
                actualSquare.style.color = "white";
                actualSquare.style.borderColor = colorsArray[i];
            }
            
            let greens = 0;
            for(let i = 0; i < 5; i++){
                if(colorsArray[i] === green){
                    greens++;
                }
            }

            if(greens === 5){
                alert("¡Muy bien!");
                document.getElementById("restart").style.display = "block";
            }

            if(column >= 5 && greens < 5){
                alert("¡Perdiste! La palabra era: " + solution);
                document.getElementById("restart").style.display = "block";
            }

            column++;
            input = "";
            colorsArray = [gray, gray, gray, gray, gray];
        }
    }else{
        if(key === "Backspace"){
            let oldInput = input;
            input = "";
            for(let i = 0; i < (oldInput.length - 1); i++){
                input += oldInput[i];
            }
        }else if(isLetter && input.length < 5){
            input += key;
        }

        for(let i = 1; i <= 5; i++){
            document.getElementById(`square${(5 * column) + i}`).innerText = "";
        }
    
        for(let i = 0; i < input.length; i++){
            document.getElementById(`square${(5 * column) + i + 1}`).innerText = input[i].toUpperCase();
        }
    }
})

document.getElementById("restart").addEventListener("click", () => {
    location.reload();
})