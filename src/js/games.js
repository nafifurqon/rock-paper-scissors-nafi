const playerChoice = document.getElementsByClassName('player-choice-box');
// console.log(playerChoice)
// console.log(playerChoice[0].childNodes[1]);

function comChooses() {
    const arrayComChoice = ["rock", "paper", "scissors"];
    const choice = arrayComChoice[Math.floor(Math.random()*3)];
    document.querySelector(`.com-choice-box#${choice}`).classList.add('active');

    return choice;
}

// console.log(document.querySelector(`.com-choice-box#${comChoice}`))

const action = (e) => {
    const event = e.target || e.srcElement;
    const playerChoice = event.id;

    const comChoice = comChooses();
    console.log("Player 1:", playerChoice);
    console.log("Com:", comChoice);

    if(playerChoice == comChoice){
        console.log("DRAW");
    } 

    if(playerChoice == "rock"){
        if(comChoice == "paper"){
            console.log("COM WIN");
        }

        if(comChoice == "scissors"){
            console.log("PLAYER 1 WIN")
        }
    }

    if(playerChoice == "paper"){
        if(comChoice == "rock"){
            console.log("PLAYER 1 WIN");
        }

        if(comChoice == "scissors"){
            console.log("COM WIN")
        }
    }

    if(playerChoice == "scissors"){
        if(comChoice == "rock"){
            console.log("COM WIN");
        }

        if(comChoice == "paper"){
            console.log("PLAYER 1 WIN")
        }
    }
}

for(let i=0; i < playerChoice.length; i++){
    const playerItem = playerChoice[i];
    playerItem.onclick = action;
}
