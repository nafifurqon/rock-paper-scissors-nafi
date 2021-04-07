class Player {
    constructor(hand, name){
        if(this.constuctor === Player){
            throw new Error("Cannot instantiate Player Class");
        }
        
        this.hand = hand;
        this.name = name;
    }

    getHand(){
        return this.hand;
    }
}

class Human extends Player {
    constructor(hand, name){
        super(hand, name);
    }

    getHand(){
        document.querySelector(`.player-choice-box#${this.hand}`).classList.add('active');

        return this.hand;
    }
}

class Computer extends Player {
    constructor(){
        super("", "Computer");
    }

    getHand(){
        const arrayHand = ["rock", "paper", "scissors"];
        const hand = arrayHand[Math.floor(Math.random() * arrayHand.length)];
        document.querySelector(`.com-choice-box#${hand}`).classList.add('active');

        this.hand = hand;

        return this.hand;
    }
}

class Match {
    constructor(playerA, playerB){
        this.playerA = playerA;
        this.playerB = playerB;
    }

    getResult(playerA, playerB){
        let result;
        const playerAHand = playerA.getHand().toLowerCase();
        const playerBHand = playerB.getHand().toLowerCase();
        const playerAName = playerA.name;
        const playerBName = playerB.name;
    
        if(playerAHand == playerBHand){
            result = "draw";
        } 

        if(playerAHand == "rock"){
            if(playerBHand == "paper"){
                result = "com";
            }

            if(playerBHand == "scissors"){
                result = "player-1";
            }
        }

        if(playerAHand == "paper"){
            if(playerBHand == "rock"){
                result = "player-1";
            }

            if(playerBHand == "scissors"){
                result = "com";
            }
        }

        if(playerAHand == "scissors"){
            if(playerBHand == "rock"){
                result = "com";
            }

            if(playerBHand == "paper"){
                result = "player-1";
            }
        }

        return result;
    }

    showResult(result){
        versusWrapper.classList.replace('d-block', 'd-none');
        document.getElementById(`${result}-result`).classList.replace('d-none', 'd-block');
    }
}

let player1Hand;
let comHand;
const resultBody = document.getElementsByClassName('result-body');
const versusWrapper = document.getElementById('versus-wrapper');

function action(event) {
    const eventButton = event.target || event.srcElement;

    if(versusWrapper.classList.contains('d-block')){
        let Player1 = new Human(eventButton.id, "Player 1")
        let Com = new Computer();
        let Games = new Match(Player1, Com);
        
        const result = Games.getResult(Player1, Com);
        comHand = Com.hand;
        player1Hand = Player1.hand;
        Games.showResult(result);
        
        console.log(`${Player1.name}: ${player1Hand}. ${Com.name}: ${comHand}. Result: ${result == "draw" ? result : result+' win'}`);
    }
}

function refresh() {
    if(comHand && player1Hand && versusWrapper.classList.contains('d-none')){
        document.querySelector(`.com-choice-box#${comHand}`).classList.remove('active');
        document.querySelector(`.player-choice-box#${player1Hand}`).classList.remove('active');
    }

    versusWrapper.classList.replace('d-none', 'd-block');

    for (let i = 0; i < resultBody.length; i++) {
        const element = resultBody[i];
        if(element.classList.contains('d-block')){
            element.classList.replace('d-block', 'd-none')
        }
    }
}