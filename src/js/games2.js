class Player {
    constructor(hand, name){
        if(this.constuctor === Player){
            throw new Error("Cannot instantiate Player Class")
            // Because it's abstract
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
        const playerAHand = this.playerA.getHand().toLowerCase();
        const playerBHand = this.playerB.getHand().toLowerCase();
        const playerAName = this.playerA.name;
        const playerBName = this.playerB.name;
    
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
}

class DomHelper {
    constructor(element){
        this.element = element;
    }

    removeAllChild() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    showPlayer1Win() {
        if(this.element.className == 'versus-wrapper'){
            this.element.classList.replace('versus-wrapper', 'player-1-result');
            this.removeAllChild();
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
    
        this.element.appendChild(player1Text);
        this.element.appendChild(player1WinText);
    }

    showComWin() {
        if(this.element.className == 'versus-wrapper'){
            this.element.classList.replace('versus-wrapper', 'com-result');
            this.removeAllChild();
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
    
        this.element.appendChild(comText);
        this.element.appendChild(comWinText);
    }
    
    showDraw() {
        if(this.element.className == 'versus-wrapper'){
            this.element.classList.replace('versus-wrapper', 'draw-result');
            this.removeAllChild();
        }
    
        const drawText = document.createElement('h2');
        
        drawText.classList.add('text-uppercase');
        drawText.classList.add('p-0');
        drawText.classList.add('m-0');
        drawText.innerHTML = 'draw';
    
        this.element.appendChild(drawText);
    }
}

let comHand;
const resultBody = document.getElementById('result-body');

function action(event) {
    const eventButton = event.target || event.srcElement;

    let Player1 = new Human(eventButton.id, "Player 1")
    let Com = new Computer();
    let Games = new Match(Player1, Com);
    let Help = new DomHelper(resultBody);
    
    const result = Games.getResult();
    comHand = Com.hand;
    const player1Hand = Player1.hand;

    if(result == "player 1"){
        Help.showPlayer1Win();
    }

    if(result == "com"){
        Help.showComWin();
    }

    if(result == "draw"){
        Help.showDraw();
    }

    console.log("Player 1:", player1Hand);
    console.log("Com:", comHand);
    console.log("Result:", result);
}

function refresh() {
    if(comHand){
        document.querySelector(`.com-choice-box#${comHand}`).classList.remove('active');
    }

    let refreshHelp = new DomHelper(resultBody);
    refreshHelp.removeAllChild();

    resultBody.className = '';
    resultBody.classList.add('versus-wrapper');
    const versusText = document.createElement('h2');

    versusText.classList.add('text-uppercase');
    versusText.classList.add('font-weight-bold');
    versusText.classList.add('versus-text');
    versusText.innerHTML = 'vs';

    resultBody.appendChild(versusText);
}