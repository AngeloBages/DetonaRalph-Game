
let state = {

    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        score: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left")
    },
    values: {
        //gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        contDownTimerId: setInterval(countDown, 1000),  
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.play();
    audio.volume = 0.2;
}

function randomSquare(){
    state.views.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);

    let randomSquare = state.views.squares[randomNumber]
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

function countDown(){
    state.values.currentTime--;
    state.views.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.contDownTimerId);
        clearInterval(state.actions.timerId);
        alert(`Game Over! Seu resultado foi: ${state.values.result}`);
    }
}

/*function moveEnemy(){
    state.values.timerId = 
}*/

function addEventListenerHitBox(){
    state.views.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id == state.values.hitPosition){
                state.values.result++;
                state.views.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

(function main(){
    addEventListenerHitBox();
})();