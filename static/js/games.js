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
                result = "player 1";
            }
        }

        if(playerAHand == "paper"){
            if(playerBHand == "rock"){
                result = "player 1";
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
                result = "player 1";
            }
        }

        return result;
    }

    showPlayer1Win(element) {
        if(element.className == 'versus-wrapper'){
            element.classList.replace('versus-wrapper', 'player-1-result');
            removeAllChild(element);
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
    
        element.appendChild(player1Text);
        element.appendChild(player1WinText);
    }

    showComWin(element) {
        if(element.className == 'versus-wrapper'){
            element.classList.replace('versus-wrapper', 'com-result');
            removeAllChild(element);
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
    
        element.appendChild(comText);
        element.appendChild(comWinText);
    }
    
    showDraw(element) {
        if(element.className == 'versus-wrapper'){
            element.classList.replace('versus-wrapper', 'draw-result');
            removeAllChild(element);
        }
    
        const drawText = document.createElement('h2');
        
        drawText.classList.add('text-uppercase');
        drawText.classList.add('p-0');
        drawText.classList.add('m-0');
        drawText.innerHTML = 'draw';
    
        element.appendChild(drawText);
    }

    showResult(result){
        if(result == "player 1"){
            this.showPlayer1Win(resultBody);
        }
    
        if(result == "com"){
            this.showComWin(resultBody);
        }
    
        if(result == "draw"){
            this.showDraw(resultBody);
        }
    }
}

let player1Hand;
let comHand;
const resultBody = document.getElementById('result-body');

function removeAllChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function action(event) {
    const eventButton = event.target || event.srcElement;

    if(resultBody.classList.contains('versus-wrapper')){
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
    if(comHand && player1Hand && !resultBody.classList.contains('versus-wrapper')){
        document.querySelector(`.com-choice-box#${comHand}`).classList.remove('active');
        document.querySelector(`.player-choice-box#${player1Hand}`).classList.remove('active');
    }

    removeAllChild(resultBody);

    resultBody.className = '';
    resultBody.classList.add('versus-wrapper');
    const versusText = document.createElement('h2');

    versusText.classList.add('text-uppercase');
    versusText.classList.add('font-weight-bold');
    versusText.classList.add('versus-text');
    versusText.innerHTML = 'vs';

    resultBody.appendChild(versusText);
}