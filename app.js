let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "pink", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highScore = 0;
let currScore = 0;

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    currScore++;
    document.getElementById("current-score").innerHTML = `<h3>Current Score: ${level}</h3>`;

    let randColor = btns[Math.floor(Math.random()*3)];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
};

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b></br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "#121212";      
        }, 150);
        if(level > highScore) {
            highScore = level;
            document.getElementById("high-score").innerHTML = `<h3>High Score: ${level}</h3>`;
        }
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    currScore = 0;
    document.getElementById("current-score").innerHTML = `<h3>Current Score: 0</h3>`;
}