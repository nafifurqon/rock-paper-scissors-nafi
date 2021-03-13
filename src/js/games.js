const playerChoice = document.getElementsByClassName('player-choice-box');
// console.log(playerChoice)
// console.log(playerChoice[0].childNodes[1]);

const action = (e) => {
    const event = e.target || e.srcElement;
    const choice = event.id;    
}

for(let i=0; i < playerChoice.length; i++){
    const playerItem = playerChoice[i];
    playerItem.onclick = action;
}
