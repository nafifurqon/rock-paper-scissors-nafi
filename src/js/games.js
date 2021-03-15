const playerChoice = document.getElementsByClassName('player-choice-box');
let comChoice;
const resultBody = document.getElementById('result-body');

function comChooses() {
    const arrayComChoice = ["rock", "paper", "scissors"];
    const choice = arrayComChoice[Math.floor(Math.random()*3)];
    document.querySelector(`.com-choice-box#${choice}`).classList.add('active');

    return choice;
}

function chooseTheWinner(playerChoice, comChoice) {
    let result;
    
    if(playerChoice == comChoice){
        result = "draw";
    } 

    if(playerChoice == "rock"){
        if(comChoice == "paper"){
            result = "com";
        }

        if(comChoice == "scissors"){
            result = "player 1";
        }
    }

    if(playerChoice == "paper"){
        if(comChoice == "rock"){
            result = "player 1";
        }

        if(comChoice == "scissors"){
            result = "com";
        }
    }

    if(playerChoice == "scissors"){
        if(comChoice == "rock"){
            result = "com";
        }

        if(comChoice == "paper"){
            result = "player 1";
        }
    }

    return result;
}

const action = (e) => {
    const event = e.target || e.srcElement;
    const playerChoice = event.id;

    comChoice = comChooses();
    const result = chooseTheWinner(playerChoice, comChoice);

    console.log("Player 1:", playerChoice);
    console.log("Com:", comChoice);
    console.log("Result:", result);

    if(result == "player 1"){
        if(resultBody.className == 'versus-wrapper'){
            resultBody.classList.replace('versus-wrapper', 'player-1-result');
            while (resultBody.firstChild) {
                resultBody.removeChild(resultBody.firstChild);
            }
        }

        const player1Text = document.createElement('h2');
        const player1WinText = document.createElement('h2');
        
        player1Text.classList.add('text-uppercase');
        player1Text.classList.add('p-0');
        player1Text.classList.add('m-0');
        player1Text.innerHTML = 'player 1';
        
        player1WinText.classList.add('text-uppercase');
        player1WinText.classList.add('p-0');
        player1WinText.classList.add('m-0');
        player1WinText.innerHTML = 'win';

        resultBody.appendChild(player1Text);
        resultBody.appendChild(player1WinText);
    }

    if(result == "com"){
        if(resultBody.className == 'versus-wrapper'){
            resultBody.classList.replace('versus-wrapper', 'com-result');
            
            while (resultBody.firstChild) {
                resultBody.removeChild(resultBody.firstChild);
            }
        }

        const comText = document.createElement('h2');
        const comWinText = document.createElement('h2');
        
        comText.classList.add('text-uppercase');
        comText.classList.add('p-0');
        comText.classList.add('m-0');
        comText.innerHTML = 'com';
        
        comWinText.classList.add('text-uppercase');
        comWinText.classList.add('p-0');
        comWinText.classList.add('m-0');
        comWinText.innerHTML = 'win';

        resultBody.appendChild(comText);
        resultBody.appendChild(comWinText);
    }

    if(result == "draw"){
        if(resultBody.className == 'versus-wrapper'){
            resultBody.classList.replace('versus-wrapper', 'draw-result');
            while (resultBody.firstChild) {
                resultBody.removeChild(resultBody.firstChild);
            }
        }

        const drawText = document.createElement('h2');
        
        drawText.classList.add('text-uppercase');
        drawText.classList.add('p-0');
        drawText.classList.add('m-0');
        drawText.innerHTML = 'draw';

        resultBody.appendChild(drawText);
    }
}

for(let i=0; i < playerChoice.length; i++){
    const playerItem = playerChoice[i];
    playerItem.onclick = action;
}


function refresh() {
    if(comChoice){
        document.querySelector(`.com-choice-box#${comChoice}`).classList.remove('active');
    }

    while (resultBody.firstChild) {
        resultBody.removeChild(resultBody.firstChild);
    }

    resultBody.className = '';
    resultBody.classList.add('versus-wrapper')
    const versusText = document.createElement('h2');

    versusText.classList.add('text-uppercase');
    versusText.classList.add('font-weight-bold');
    versusText.classList.add('versus-text');
    versusText.innerHTML = 'vs';

    resultBody.appendChild(versusText);
}