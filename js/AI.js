function rollAI(game) {
    const rollResult = dieNumber();
    const button = document.querySelectorAll(".offses");
  

    const winSave = game.goal - game.otherPlayer.playerGoal2;
    const catch1 = game.currentPlayer.playerGoal1 <= game.goal;
    const catch2 = game.otherPlayer.playerGoal2 <= game.goal;

    game.rollOne = rollResult;
    const cube = document.getElementById("cube");

    game.timeOut = setTimeout(() => {
        if (game.rollOne !== 1 || game.playerResult >= game.dontRoll1) {
            let xRotation = 0;
            let yRotation = 0;

            switch (game.rollOne) {
                case 1: xRotation = 0; yRotation = 0; break;
                case 2: xRotation = 0; yRotation = 180; break;
                case 3: xRotation = 0; yRotation = -90; break;
                case 4: xRotation = 0; yRotation = 90; break;
                case 5: xRotation = -90; yRotation = 0; break;
                case 6: xRotation = 90; yRotation = 0; break;
            }

            cube.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotateZ(360deg)`;
        }

        if (game.rollOne === 1 && game.playerResult >= game.dontRoll1) {
            game.rolled = true;
            game.playerResult = 0;
            $("#count").text(game.playerResult);
            game.playerSw = game.currentPlayer.id;; // Switch to the other player
            $(".nm1").addClass("active");
            $(".nm2").removeClass("active");
            $(".mn").addClass("active2");
            $(".mn1").removeClass("active2");
            $(".offses").removeClass("offed");
            if (catch1 && catch2) {
                button.forEach(el => el.style.pointerEvents = "auto");
            }
            game.keyturn = true;
            game.aiRolling = false;
            turnOneMessage(game);
            restartTimer(game);
        } else {
            if (game.rollOne !== 1) {
                game.playerResult += game.rollOne;
            }
            $("#count").text(game.playerResult);

            if (game.playerResult >= game.goalThreshold || game.playerResult >= winSave) {
                setTimeout(() => {
                    $(".save").trigger("click");
                    const playing1 = $("#player1").val();
                    const playing2 = $("#player2").val();

                    if (!game.aiRolling) {
                        clearTimeout(game.timeOut);
                        $(".turn").html(`<s>${playing2} 456</s>`).css("color", "red");
                        $(".word").text("Saved is record");
                        game.timeTurn = setTimeout(() => {
                            $(".turn").html(`${playing1} 001`).css("color", "green");
                            $(".word").text("turn");
                        }, 3500);
                    }
                }, 2500);
                game.aiRolling = false;
            }
        }

        if (game.aiRolling) {
            setTimeout(() => rollAI(game), 1600);
        }
    }, 3500);
}

function rollOneSwitchAi(game) {
    const rollResult = dieNumber();

    const lead = game.currentPlayer.playerGoal1 >= game.otherPlayer.playerGoal2;
    const gap = game.otherPlayer.playerGoal2 - game.currentPlayer.playerGoal1;
    const catch1 = game.currentPlayer.playerGoal1 <= game.goal;
    const catch2 = game.otherPlayer.playerGoal2 <= game.goal;
    game.rollOne = rollResult;

    const cube = document.getElementById("cube");

    if (game.stages === 1 && game.playerResult <= 25 && game.currentPlayer.playerGoal1 === 0) {
        if (game.rollOne === 1) {
            game.rollOne += 1;
        }
    } else if (game.stages === 1 && !lead) {
        if (game.rollOne === 1 && game.playerResult <= gap + 5) {
            game.rollOne += 1;
        }
    } else if (game.stages === 2 && game.playerResult <= 15 && game.currentPlayer.playerGoal1 === 0) {
        if (game.rollOne === 1) {
            game.rollOne += 1;
        }
    } else if (game.stages === 2 && !lead) {
        if (game.rollOne === 1 && game.playerResult <= gap + 1) {
            game.rollOne += 1;
        }
    }

    let xRotation = 0;
    let yRotation = 0;

    switch (game.rollOne) {
        case 1: xRotation = 0; yRotation = 0; break;
        case 2: xRotation = 0; yRotation = 180; break;
        case 3: xRotation = 0; yRotation = -90; break;
        case 4: xRotation = 0; yRotation = 90; break;
        case 5: xRotation = -90; yRotation = 0; break;
        case 6: xRotation = 90; yRotation = 0; break;
    }

    cube.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotateZ(360deg)`;

    const button = document.querySelectorAll(".offses");

    if (game.rollOne === 1) {
        game.playerResult = 0;
        game.rolled = true;
        $("#count").text(game.playerResult);
        if (game.currentPlayer.id === game.playerSw) {
            game.playerSw = game.otherPlayer.id; // Switch to the other player
            game.currentPlayer.playerGoal1 += 0;
            $(".score1").text(game.currentPlayer.playerGoal1);
            $(".nm2").addClass("active");
            $(".nm1").removeClass("active");
            $(".mn1").addClass("active2");
            $(".mn").removeClass("active2");
            $(".offses").addClass("offed");
            if (catch1 && catch2) {
                button.forEach(el => el.style.pointerEvents = "none");
            }
            game.keyturn = false;
            game.aiRolling = true;
            turnOneMessage(game);
            rollAI(game);
            restartTimer(game);
        }
    } else {
        game.aiRolling = false;
        game.playerResult += game.rollOne;
        $("#count").text(game.playerResult);
    }
}

function saveSwitchPlayerAi(game) {


    const button = document.querySelectorAll(".offses");
    const catch1 = game.currentPlayer.playerGoal1 <= game.goal;
    const catch2 = game.otherPlayer.playerGoal2 <= game.goal;

    if (game.currentPlayer.id === game.playerSw) {
        // Saving current player's score
        
        game.aiRolling = true;
        game.keyturn = false;
        game.currentPlayer.playerGoal1 += game.playerResult;
        $(".score1").text(game.currentPlayer.playerGoal1);

        // Switch to the other player
        game.playerSw = game.otherPlayer.id;
        $(".nm2").addClass("active");
        $(".nm1").removeClass("active");
        $(".mn1").addClass("active2");
        $(".mn").removeClass("active2");
        $(".offses").addClass("offed");
        if (catch1 && catch2) {
            button.forEach(el => el.style.pointerEvents = "none");
        }

        const lowCheck = game.currentPlayer.playerGoal1 - game.otherPlayer.playerGoal2;
        const over = 30;
        const checkedLow = lowCheck >= over;

        if (checkedLow && game.stages === 1) {
            game.goalThreshold = 7;
            game.dontRoll1 = 7;
        } else if (!checkedLow && game.stages === 1) {
            game.goalThreshold = 6;
            game.dontRoll1 = 4;
        } else if (checkedLow && game.stages === 2) {
            game.goalThreshold = 12;
            game.dontRoll1 = 12;
        } else if (!checkedLow && game.stages === 2) {
            game.goalThreshold = 12;
            game.dontRoll1 = 8;
        } else if (checkedLow && game.stages === 3) {
            game.goalThreshold = 24;
            game.dontRoll1 = 24;
        } else if (!checkedLow && game.stages === 3) {
            game.goalThreshold = 16;
            game.dontRoll1 = 12;
        } else if (checkedLow && game.stages === 4) {
            game.goalThreshold = 29;
            game.dontRoll1 = 29;
        } else if (!checkedLow && game.stages === 4) {
            game.goalThreshold = 25;
            game.dontRoll1 = 18;
        }

        turnSavedMessage(game); // Show the message for saving
        rollAI(game); // Trigger AI's roll
        restartTimer(game);
        game.playerResult = 0;
    } else{
        // Saving other player's (AI's) score
        game.aiRolling = false;
        game.keyturn = true;
        game.otherPlayer.playerGoal2 += game.playerResult;
        $(".score2").text(game.otherPlayer.playerGoal2);

        // Switch to the current player
        game.playerSw = game.currentPlayer.id;
        $(".nm1").addClass("active");
        $(".nm2").removeClass("active");
        $(".mn").addClass("active2");
        $(".mn1").removeClass("active2");
        $(".offses").removeClass("offed");
        turnSavedMessage(game)
        if (catch1 && catch2) {
            button.forEach(el => el.style.pointerEvents = "auto");
        }

        restartTimer(game);
        game.playerResult = 0;
    }
    $("#count").text(game.playerResult);
}