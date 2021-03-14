const playerChoice = document.getElementsByClassName('player-choice-box');
// console.log(playerChoice)
// console.log(playerChoice[0].childNodes[1]);
let comChoice;

function comChooses() {
    const arrayComChoice = ["rock", "paper", "scissors"];
    const choice = arrayComChoice[Math.floor(Math.random()*3)];
    document.querySelector(`.com-choice-box#${choice}`).classList.add('active');

    return choice;
}

// console.log(document.querySelector(`.com-choice-box#${comChoice}`))

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
    console.log("Player 1:", playerChoice);
    console.log("Com:", comChoice);
    console.log("Result:", chooseTheWinner(playerChoice, comChoice));
}

for(let i=0; i < playerChoice.length; i++){
    const playerItem = playerChoice[i];
    playerItem.onclick = action;
}


function refresh() {
    if(comChoice){
        document.querySelector(`.com-choice-box#${comChoice}`).classList.remove('active');
    }
}