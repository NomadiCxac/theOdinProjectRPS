function getComputerEndBoss() {
    let rVal;
    
    rVal = Math.floor(Math.random() * 100);
    
    if (rVal >= 0 && rVal <= 33) {
        return("robot1.png");
    } else if (rVal >= 34 && rVal <= 66) {
        return("robot2.png");
    } else {
        return("robot3.png");
    }
}

function getPlayerChampion() {
    let rVal;
    
    rVal = Math.floor(Math.random() * 100);
    
    if (rVal >= 0 && rVal <= 50) {
        return("champion1.png");
    } else {
        return("champion2.png");
    }
}

function currentScoreBoard(userScore, computerScore, currentRound) {

    document.getElementById("roundSB").innerText = `Round ${currentRound}`;
    document.getElementById("playerSB").innerText = `Score of User: ${userScore} `;
    document.getElementById("computerSB").innerText = `Score of Computer: ${computerScore} `;

}


function winnerScreen(userScore, computerScore, tieCount, currentRound) {

    const winnerPage = document.querySelector('#backgroundWS');

    const winner = document.createElement('div');
    winner.classList.add('winner');

    const tieGame = document.createElement('div');
    tieGame.classList.add('tieGame');

    const roundCount = document.createElement('div');
    roundCount.classList.add('roundCount');

    const computerAvatar = document.createElement('img');
    computerAvatar.src = getComputerEndBoss();
    computerAvatar.style.width = "100px";

    const playerAvatar = document.createElement('img');
    playerAvatar.src = getPlayerChampion();
    playerAvatar.style.width = "100px";

    const lineBreak = document.createElement('br');


    if (userScore == 5) {

        winner.textContent = "Player Wins";
        tieGame.textContent = `There were: ${tieCount} ties this game!`;
        roundCount.textContent = `There were: ${currentRound} rounds this game!`;

        winnerPage.appendChild(winner);
        winnerPage.appendChild(playerAvatar);
        winnerPage.appendChild(lineBreak);
        winnerPage.appendChild(tieGame);
        winnerPage.appendChild(roundCount);

    }
    
    if (computerScore == 5) {

        winner.textContent = "Computer Wins";
        tieGame.textContent = `There were: ${tieCount} ties this game!`;
        roundCount.textContent = `There were: ${currentRound} rounds this game!`;

        winnerPage.appendChild(winner);
        winnerPage.appendChild(computerAvatar);
        winnerPage.appendChild(lineBreak);
        winnerPage.appendChild(tieGame);
        winnerPage.appendChild(roundCount);

    }

    // if (userScore == 6) {
    //     winnerPage.removeChild(winner);
    //     winnerPage.removeChild(playerAvatar);
    //     winnerPage.removeChild(lineBreak);
    //     winnerPage.removeChild(tieGame);
    //     winnerPage.removeChild(roundCount);
    // }

    // if (computerScore == 6) {
    //     winnerPage.removeChild(winner);
    //     winnerPage.removeChild(computerAvatar);
    //     winnerPage.removeChild(lineBreak);
    //     winnerPage.removeChild(tieGame);
    //     winnerPage.removeChild(roundCount);
    // }
}

function getComputerChoice() {
    let rVal;
    
    rVal = Math.floor(Math.random() * 100);
    
    if (rVal >= 0 && rVal <= 33) {
        return("rock");
    } else if (rVal >= 34 && rVal <= 66) {
        return("paper");
    } else {
        return("scissors");
    }
}


function clash (playerChoice, computerChoice) {


    while (playerChoice == "rock") {

        if (computerChoice == "rock") {
            console.log("Tie!")
        } else if (computerChoice == "paper") {
            console.log("You Lose!")
            return false;
        } else {
            console.log("You Win!")
            return true;
        }
        playerChoice = null;
    }

    while (playerChoice == "paper") {

        if (computerChoice == "rock") {
            console.log("You Win!")
            return true;
        } else if (computerChoice == "paper") {
            console.log("Tie!")
        } else {
            console.log("You Lose!")
            return false;
        }
        playerChoice = null;
    }

    while (playerChoice == "scissors") {

        if (computerChoice == "rock") {
            console.log("You Lose!")
            return false;
        } else if (computerChoice == "paper") {
            console.log("You Win!")
            return true;
        } else {
            console.log("Tie!")
        }
        playerChoice = null;
    }
}

let playerChoice;
let userScore = 0;
let computerScore = 0;
let tieCount = 0;
let currentRound = 0;

function playRound (e) {

    let event;

    const roundResult = document.getElementById("roundResult");
    // const displayPlayerRound = document.querySelector("playerRoundSelection");
    // const displayComputerRound = document.querySelector("computerRoundSelection");

    // this captures the players choice after clicking one of three button selections
    playerChoice = e.target.id;
    console.log(e);
    console.log(e.target.id);

    // this variable rep. a function that generates the computers choice
    computerChoice = getComputerChoice();

    // execute a confirm prompt to start the game
    event = confirm(`Confirm Selection: ${e.target.id}?`)
    
    if (event == false) {
        currentRound--;
    }

    while (event) {
        playGame = clash(playerChoice, computerChoice);
        console.log(playGame);

        if (playGame === true) {
            userScore++;
            roundResult.innerText = ("Player wins this round!")
        }

        if (playGame === false) {
            computerScore++;
            roundResult.innerText = ("Computer wins this round!")
        }

        if (playGame === undefined) {
            tieCount++;
            roundResult.innerText = ("Tie!")
        }
        event = false;

    }
    
    document.getElementById("playerRoundSelection").innerText = (`Player Selection: ${playerChoice}`);
    document.getElementById("computerRoundSelection").innerText = (`Computer Selection: ${computerChoice}`);

    currentRound++;
    currentScoreBoard(userScore, computerScore, currentRound);

    if (userScore == 5 || computerScore == 5) {
        winnerScreen(userScore, computerScore, tieCount, currentRound);
    }

    if (userScore >= 5 || computerScore >= 5) {
        userScore = 0;
        computerScore = 0;
        tieCount = 0;
        currentRound = 0;
    }



}

const weapons = document.querySelectorAll("button.weapon");
weapons.forEach(weapon => weapon.addEventListener("click", playRound,));
