const game = new Game()
window.game = game

game.createPlayer = createDummyPlayers = (game) => {
    game.defaultPlayer1 = new Player("default1", "Player 1", "p1@example.com", "pass1");
    game.defaultPlayer2 = new Player("default2", "Player 2", "p2@example.com", "pass2");


    game.defaultPlayer1.id = 12345;
    game.defaultPlayer2.id = 56789;

    game.playId = game.addPlaying(game.defaultPlayer1, game.defaultPlayer2);
    game.playerSw = game.playId[0].id;
    game.playerObj = game.playId[0];
    game.firstId = game.playId[0].id;

    game.currentPlayer = game.playId[0];
    game.otherPlayer = game.playId[1];
}

if (game.account === 1) {
    game.createPlayer(game);
}
function convertCoin(coin) {
    return coin.toLocaleString()
}
function closeUp(x, y, t) {
    $(x).addClass(y).show();
    setTimeout(() => $(x).removeClass(y).hide(), t);
}

$(document).ready(function () {
    $(".level").show();
    $(".main-cont,.input-cont,.effect").hide();
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        const loginPage = document.getElementById('login-page');
        const signupPage = document.getElementById('signup-page');

        // Hide login page with slide-out animation
        loginPage.classList.add('hide');
        loginPage.classList.remove('show');

        // Show signup page with slide-in animation after a delay
        setTimeout(() => {
            loginPage.style.display = 'none';
            signupPage.style.display = 'block';
            signupPage.classList.add('show');
            signupPage.classList.remove('hide');
        }, 500); // Match the duration of the CSS transition
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        const loginPage = document.getElementById('login-page');
        const signupPage = document.getElementById('signup-page');

        // Hide signup page with slide-out animation
        signupPage.classList.add('hide');
        signupPage.classList.remove('show');

        // Show login page with slide-in animation after a delay
        setTimeout(() => {
            signupPage.style.display = 'none';
            loginPage.style.display = 'block';
            loginPage.classList.add('show');
            loginPage.classList.remove('hide');
        }, 500); // Match the duration of the CSS transition
    });

    if (game.currentPlayer.state === 4) {
        game.currentPlayer.state = 5;
        $(".disabled").prop("disabled", false).removeClass("locked");
        $(".imgcn").hide();
        $(".display1").html(`<span>Medium</span>`);
        $(".display2").html(`<span>Hard</span>`);
        $(".display3").html(`<span>Master</span>`);
    }
    const stringed = game.playerObj.coin
   
        const converted = convertCoin(stringed);
        $(".gold").text(converted);
      

    $(".pack").hide();
    $(".cont").hide();

    learn();

    $(".ler").click(function () {
        $(".learn").slideUp();
    });

    $(".about").click(function () {
        $(".learn").slideToggle();
    });


    $(".arrw").click(function () {
        game.there = true;
        $(".level").show();
        $(".main-cont").hide();
    });

    $(".start").click(function () {

        $(".levelmes").text(game.level);
        const inputtedUsername1 = $("#player1").val().trim();
        const inputtedUsername2 = $("#player2").val().trim();
        game.lead1 = 0;
        game.lead2 = 0;
        $(".lead1").text(game.lead1);
        $(".lead2").text(game.lead2);

        if (inputtedUsername1 !== "" && inputtedUsername2 !== "") {
            startGame(game);
            const playerOne = new Player(`${inputtedUsername1} 001`);
            const playerTwo = new Player(`${inputtedUsername2} 456`);
            game.addPlayer(playerOne);
            game.addPlayer(playerTwo);
            $(".player1").text(playerOne.userName.toUpperCase());
            $(".player2").text(playerTwo.userName.toUpperCase());
            resetGame(game);
            $(".error").text("You can input your Nick name").css("color", "white");
        } else {
            $(".error").text("Fill the input").css("color", "red");
        }
    });

    document.getElementById("roll").addEventListener("click", function () {
        const button = document.getElementById("roll");
        if (game.timeLeft > 10) {
            game.rolled = false;
        }

        dicAnime(game);
        if (game.playerVSai === 1) {
            rollOneSwitchAi(game);
        } else if (game.playerVSai === 2) {
            rollOneSwitch(game);
            waitTimer(button, game);
            game.playerResult = parseInt($("#count").text());
        }
    });

    $(".save").on("click", function () {
        const button = document.querySelector(".save");
        game.rolled = true;
        saveAnime(game);
        if (game.playerVSai === 1) {
            saveSwitchPlayerAi(game);
            completeGame(game);
            effectTimer(game);
        } else if (game.playerVSai === 2) {
            saveSwitchPlayer(game);
            completeGame(game);
            effectTimer(game);
            waitTimer2(button, game);
            game.aiRolling = false;
        }
    });

    $(".inc").on("input", function () {
        const input = $(this).val();
        $(".error").text("");
        $(this).val(limit(input));
    });

    $(".goalpoint").on("input", function () {
        $(".error").text("");
    });

    $(".resimg").click(function () {
        refresh(game);
        resetGame(game);
    });

    $(".playagain").click(function () {
        clearInterval(game.timerInterval);
        game.timeLeft = game.initialTime;
        game.startTimer()
        resetGame(game);
    });

    $(".backna").click(function () {
        clearInterval(game.timerInterval);
        game.timeLeft = game.timeLeft;
        game.keyturn = false;
        $(".see").hide();
        $(".digit").text("0");
        if (game.playerVSai === 1) {
            $(".main-cont").hide();
            $(".level").show();
            game.there = true;
            game.back = true;
        } else {
            $(".input-cont").show();
            $(".go2").slideDown();
            $(".level").hide();
        }
    });

    let packt;
    $(".setin").click(() => {
        clearTimeout(packt)
        $(".pack").toggle();
        packt = setTimeout(() => $(".pack").slideUp(), 10000);
    });

    // $("#pick").click(() => {
    //     $(".paced").slideToggle();
    //     setTimeout(() => $(".paced").slideUp(), 15000);
    // });

    $(".nextlv").click(function () {
        clearInterval(game.timerInterval);
        game.timeLeft = game.initialTime;
        game.startTimer()
        resetGame(game);
        game.lead1 = 0;
        game.lead2 = 0;
        $(".lead1").text(game.lead1);
        $(".lead2").text(game.lead2);




        if (game.currentPlayer.state <= 4) {
            if (game.currentPlayer.state === 2) {
                $(".open1").trigger("click");
                $(".gold").text(converted);

            } else if (game.currentPlayer.state === 3) {
                $(".open2").trigger("click");
                $(".gold").text(converted);
            } else if (game.currentPlayer.state === 4) {
                $(".open3").trigger("click");
                $(".gold").text(converted);
            } else if (game.currentPlayer.state === 4) {
                $(".nextlv").removeClass("alert");
                $(".cned").text("");
            }
        } else if (game.currentPlayer.state >= 4) {
            if (game.currentPlayer.newstate2 === 2) {
                $(".open1").trigger("click");
            } else if (game.currentPlayer.newstate2 === 3) {
                $(".open2").trigger("click");
            } else if (game.currentPlayer.newState2 === 4) {
                $(".open3").trigger("click");
            }
        }
    });

    window.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "r":
                if (game.keyturn) {
                    $("#roll").trigger("click");
                }
                break;
            case "s":
                if (game.keyturn) {
                    $(".save").trigger("click");
                }
                break;
            case "b":
                if (game.keyturn) {
                    $(".backna").trigger("click");
                }
                break;
            case "k":
                if (game.gameEnded) {
                    $(".learn").slideUp();
                } else {
                    $(".learn").slideToggle();
                }
                break;
            case "p":
                $(".off").trigger("click");
                break;
            case "y":
                // game.currentPlayer = game.playId[0] ;
                // game.otherPlayer = game.playId[1] ;
                // const otherPlayers = game.players[otherPlayerId];
                resta
                // Log for debugging
                // console.log("Current Player ID:", game.currentPlayer.id);
                // console.log("Player obj:", game.playerObj.record.unshift(['hell0']));
                // console.log("Other Player ID:", game.otherPlayer.id);

                // console.log(game.currentPlayer.nickName);
                // console.log(game.currentPlayer.id);
                break;
        }
    });


});