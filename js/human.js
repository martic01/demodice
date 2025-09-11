// Utility Functions

function waitTimer(button) {
    button.style.pointerEvents = "none";
    setTimeout(() => button.style.pointerEvents = "auto", 900);
}

function waitTimer2(button) {
    button.style.pointerEvents = "none";
    setTimeout(() => button.style.pointerEvents = "auto", 2000);
}

function learn() {
    $(".learn").hide();
    setTimeout(() => {
        $(".learn").slideDown();
        const videoElement = $(".vid")[0];
        if (videoElement) {
            videoElement.muted = true;
            videoElement.play().catch((error) => console.error("Autoplay failed: ", error));
        }
        ok();
    }, 1500);
}

function ok() {
    $(".ler").hide();
    setTimeout(() => $(".ler").show(), 5000);
}

function effectTimer() {
    const effectFigure = 20
    const deduct = game.currentPlayer.playerGoal1 - game.otherPlayer.playerGoal2;
    const inverseDeduct = deduct * -1;
    const catchin = deduct >= effectFigure;
    const catchin2 = inverseDeduct >= effectFigure;
    const catch1 = game.currentPlayer.playerGoal1 > game.otherPlayer.playerGoal2;

    if (catchin && catch1) {
        $(".effect").fadeIn();
        $(".eff").html(`<img src="img/animated-fire.gif">`);
        $(".effe").html(`<img class="eff1" src="img/img sad gif.gif">`);
        setTimeout(() => $(".effect").fadeOut(), 2000);
    } else if (catchin2 && !catch1) {
        $(".effect").fadeIn();
        $(".eff").html(`<img class="eff1" src="img/img sad gif.gif">`);
        $(".effe").html(`<img src="img/animated-fire.gif">`);
        setTimeout(() => $(".effect").hide(), 2000);
    }
}

function refresh(game) {
    $(".resimg").addClass("fast");
    setTimeout(() => {
        $(".resimg").removeClass("fast")
        clearInterval(game.timerInterval)
        game.timeLeft = game.initialTime
        game.startTimer()
    }, 700 );
}

function dicAnime() {
    $(".dieimg").addClass("fast");
    setTimeout(() => $(".dieimg").removeClass("fast"), 700);
}

function saveAnime() {
    $(".saveimg").addClass("shake");
    setTimeout(() => $(".saveimg").removeClass("shake"), 700);
}

function startGame() {
    $(".go").slideUp();
    $(".input-cont").addClass("animateremove");
    setTimeout(() => {
        $(".input-cont").fadeOut();
        $(".input-cont").removeClass("animateremove");
    }, 2700);
}

function limit(input) {
    const realLength = 12;
    if (input.length > realLength) {
        $(".error").text("Nick name too long 11 letters only").css("color", "red");
        return input.slice(0, realLength);
    }
    $(".error").text("");
    return input.toUpperCase();
}

 
function dieNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

// Business Logic

function turnOneMessage(game) {
    if (game.showTurn) {
        $(".turn").html(`<s>${game.currentPlayer.nickName} 001</s>`).css("color", "red");
        $(".word").text("rolled 1");
        game.timeTurn = setTimeout(() => {
            $(".turn").html(`${game.otherPlayer.nickName} 456`).css("color", "green");
            $(".word").text("turn");
        }, 3000);
    } else if (!game.showTurn) {
        $(".turn").html(`<s>${game.otherPlayer.nickName} 456</s>`).css("color", "red");
        $(".word").text("rolled 1");
        game.timeTurn = setTimeout(() => {
            $(".turn").html(`${game.currentPlayer.nickName} 001`).css("color", "green");
            $(".word").text("turn");
        }, 3500);
    }
}

function turnSavedMessage(game) {
    if (game.showTurn) {
        $(".turn").html(`<s>${game.currentPlayer.nickName} 001</s>`).css("color", "red");
        $(".word").text("Saved is record");
        game.timeTurn = setTimeout(() => {
            $(".turn").html(`${game.otherPlayer.nickName} 456`).css("color", "green");
            $(".word").text("turn");
        }, 3000);
    } else if (!game.showTurn) {
        $(".turn").html(`<s>${game.otherPlayer.nickName} 456</s>`).css("color", "red");
        $(".word").text("Saved is record");
        game.timeTurn = setTimeout(() => {
            $(".turn").html(`${game.currentPlayer.nickName} 001`).css("color", "green");
            $(".word").text("turn");
        }, 3500);
    }
}

function saveSwitchPlayer(game) {
    // Get the current player and the other player's ID    // Log for debugging
    console.log("Current Player ID:", game.currentPlayer.id);
    console.log("Current Player sw:", game.playerSw);
    console.log("Other Player ID:", game.otherPlayer.id);


    // Switch the player
    if (game.currentPlayer.id === game.playerSw) {

        game.currentPlayer.playerGoal1 += game.playerResult;
        $(".score1").text(game.currentPlayer.playerGoal1);

        game.playerSw = game.otherPlayer.id;
        turnSavedMessage(game)
        // Update UI classes
        $(".nm2").addClass("active");
        $(".nm1").removeClass("active");
        $(".mn1").addClass("active2");
        $(".mn").removeClass("active2");
        turnSavedMessage(game)
    } else if (game.playerSw === game.otherPlayer.id) {
        // Update the other player's score
        game.otherPlayer.playerGoal2 += game.playerResult;
        $(".score2").text(game.otherPlayer.playerGoal2);


        game.playerSw = game.currentPlayer.id;


        $(".nm1").addClass("active");
        $(".nm2").removeClass("active");
        $(".mn").addClass("active2");
        $(".mn1").removeClass("active2");
        turnSavedMessage(game)
    }

    game.playerResult = 0;
    game.showTurn = !game.showTurn;
    $("#count").text(game.playerResult);

    restartTimer(game);
}
function rollOneSwitch(game) {
    const rollResult = dieNumber();
    $("#rollone").val(rollResult);
    const cube = document.getElementById("cube");
    let xRotation = 0;
    let yRotation = 0;

    switch (rollResult) {
        case 1: xRotation = 0; yRotation = 0; break;
        case 2: xRotation = 0; yRotation = 180; break;
        case 3: xRotation = 0; yRotation = -90; break;
        case 4: xRotation = 0; yRotation = 90; break;
        case 5: xRotation = -90; yRotation = 0; break;
        case 6: xRotation = 90; yRotation = 0; break;
    }

    cube.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotateZ(360deg)`; 

    if (rollResult === 1) {
        if (game.currentPlayer.id === game.playerSw) {
            game.playerResult = 0
            game.currentPlayer.playerGoal1 += game.playerResult;
            game.playerObj = game.otherPlayer
            $(".score1").text(game.currentPlayer.playerGoal1);

            game.playerSw = game.otherPlayer.id;
           
            // Update UI classes
            $(".nm2").addClass("active");
            $(".nm1").removeClass("active");
            $(".mn1").addClass("active2");
            $(".mn").removeClass("active2");
            turnOneMessage(game);
        } else {
            // Update the other player's score
            game.playerResult = 0
            game.otherPlayer.playerGoal2 += game.playerResult;
            $(".score2").text(game.otherPlayer.playerGoal2);

            game.playerSw = game.currentPlayer.id;
            game.playerObj = game.currentPlayer

            $(".nm1").addClass("active");
            $(".nm2").removeClass("active");
            $(".mn").addClass("active2");
            $(".mn1").removeClass("active2");
            turnOneMessage(game);
        }

        game.playerResult = 0;
        game.showTurn = !game.showTurn;
        $("#count").text(game.playerResult);


        
        restartTimer(game);
    } else {
        game.playerResult += rollResult;
        $("#count").text(game.playerResult);
    }
}

function resetGame(game) {
    game.aiRolling = false;
    game.gameEnded = false;
    game.keyturn = true;
    clearTimeout(game.timeTurn);
    clearTimeout(game.timeOut);
    clearInterval(game.timerInterval);
    game.showTurn = true;
    game.currentPlayer.playerGoal1 = 0;
    game.otherPlayer.playerGoal2 = 0;

    game.playerResult = 0;
    // game.playerSw = Object.keys(game.players)[0]; // Reset to the first player
const countingwins = game.currentPlayer.wlcount[0]
    const countinglost = game.currentPlayer.wlcount[1]
    $(".wins").text(countingwins)
    $(".lostin").text(countinglost)
    $(".bar").removeClass("alert");
    $(".lvmes").text("");
    $(".error").text("You can input your Nick name").css("color", "white");
    $(".levelmes").text(game.level);
    $(".mes").fadeIn();
    $(".incree").fadeOut();
    $(".see").slideUp();
    $(".mission").text(game.goal);


    $(".score1").text(game.currentPlayer.playerGoal1);
    $(".score2").text(game.currentPlayer.playerGoal2);
    $("#count").text(game.playerResult);
    $(".offses").removeClass("offed");

    const buttons = document.querySelectorAll(".offses");
    buttons.forEach(el => el.style.pointerEvents = "auto");

    const barGrow = document.querySelector(".bar");
    if (game.currentPlayer.bar >= 100) {
            $(".bar").removeClass("alert");
            $(".incree").fadeOut();
            $(".mesbar").html(`Full bar is 100 coin`);
            game.currentPlayer.bar = 0;
    }
    barGrow.style = `transition:2s; width:${game.currentPlayer.bar}%;`;
    

    $(".turn").text(`${game.currentPlayer.nickName} 001`);

    $(".word").text("rolls first");

    $("#rollone").val("");

    $(".nm1").addClass("active");
    $(".nm2").removeClass("active");
    $(".mn").removeClass("active2");
    $(".mn1").removeClass("active2");
    game.playerSw = game.firstId
    // game.playerObj = game.currentPlayer
    const cube = document.getElementById("cube");
    cube.style.transform = `rotateX(0) rotateY(0) rotateZ(360deg)`;
    game.timeLeft = game.initialTime;
    game.startTimer(game)
}