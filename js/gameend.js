function completeGame(game) {
    const barGrow = document.querySelector(".bar");
    const player1nm = $(".player1").text().toUpperCase();
    const player2nm = $(".player2").text().toUpperCase();


    const deduct = game.currentPlayer.playerGoal1 - game.otherPlayer.playerGoal2;
    const catch1 = game.currentPlayer.playerGoal1 >= game.goal;
    const catch2 = game.otherPlayer.playerGoal2 >= game.goal;
    const check1 = game.currentPlayer.playerGoal1 > game.otherPlayer.playerGoal2;
    const check2 = game.otherPlayer.playerGoal2 > game.currentPlayer.playerGoal1;
    const verify = catch1 || catch2

    if (verify && !game.gameEnded) {
        clearTimeout(game.timeOut);
        clearInterval(game.timerInterval);
        clearTimeout(game.timeTurn);
        $(".learn").hide();
        game.keyturn = false;
        game.aiRolling = false;
        $(".see").show();
        document.querySelectorAll("#roll, .save, .resimg").forEach(e => {
            e.style.pointerEvents = "none";
        });
        $("#roll").addClass("offed");
        $(".save").addClass("offed");

        if (check1 && !game.gameEnded) {
            $(".winnm").text(player1nm);
            $(".winsc").text(deduct);
            game.lead1 += 1;
            game.currentPlayer.wlcount[0] += 1;
            game.currentPlayer.status1 = "Won";
            game.otherPlayer.status2 = "Lost";

            if (game.playerVSai === 1) {
                if (game.stages === 1) {
                    game.currentPlayer.coin += game.gA[1];
                    game.currentPlayer.count[0]++;
                    $(".goldw").text(game.gA[1]);
                } else if (game.stages === 2) {
                    game.currentPlayer.coin += game.gA[3];
                    game.currentPlayer.count[2]++;
                    $(".goldw").text(game.gA[3]);
                } else if (game.stages === 3) {
                    game.currentPlayer.coin += game.gA[3] + game.gA[0];
                    game.currentPlayer.count[4]++;
                    $(".goldw").text(game.gA[3] + game.gA[0]);
                } else if (game.stages === 4) {
                    game.currentPlayer.coin += game.gA[5];
                    game.currentPlayer.count[6]++;
                    $(".goldw").text(game.gA[5]);
                }

                if (game.currentPlayer.bar + game.bL[0] < 100 && game.stages === 1) {
                    game.currentPlayer.bar += game.bL[0];
                } else if (game.currentPlayer.bar + game.bL[1] < 100 && game.stages === 2) {
                    game.currentPlayer.bar += game.bL[1];
                } else if (game.currentPlayer.bar + game.bL[2] < 100 && game.stages === 3) {
                    game.currentPlayer.bar += game.bL[2];
                } else if (game.currentPlayer.bar + game.bL[3] < 100 && game.stages === 4) {
                    game.currentPlayer.bar += game.bL[3];
                } else {
                    game.currentPlayer.bar += 100 - game.currentPlayer.bar;
                    $(".mesbar").html(`Task ✔. Got <span class='colgolgin'>100</span>coin`);
                    $(".incree").show();
                    $(".bar").addClass("alert");
                    game.currentPlayer.coin += game.gA[4];
                }

                if (game.currentPlayer.bar < 100) {
                    $(".bar").addClass("alert");
                    $(".incree").show();

                    setTimeout(() => {
                        $(".bar").removeClass("alert");
                        $(".incree").fadeOut();
                    }, 4000);
                }
                barGrow.style = `transition:2s; width:${game.currentPlayer.bar}%;`;
            } else if (game.playerVSai === 2) {
                game.currentPlayer.count[8]++;
            }
            $(".mes").fadeOut();
        } else if (check2 && !game.gameEnded) {
            game.aiRolling = false;
            $(".winnm").text(player2nm);
            $(".winsc").text(deduct * -1);
            $(".mes").fadeOut();
            game.lead2 += 1;
            game.currentPlayer.wlcount[1] += 1;
            game.currentPlayer.status1 = "Lost";
            game.otherPlayer.status2 = "Won";
            if (game.playerVSai === 1) {
                if (game.stages === 1) {
                    game.currentPlayer.count[1]++;
                } else if (game.stages === 2) {
                    game.currentPlayer.count[3]++;
                    game.currentPlayer.coin -= game.gA[1];
                    $(".goldw").text(game.gA[1]);
                } else if (game.stages === 3) {
                    game.currentPlayer.count[5]++;
                    game.currentPlayer.coin -= game.gA[2];
                    $(".goldw").text(game.gA[2]);
                } else if (game.stages === 4) {
                    game.currentPlayer.count[7]++;
                    game.currentPlayer.coin -= game.gA[3] + game.gA[0];
                    $(".goldw").text(game.gA[3] + game.gA[0]);
                }
            } else if (game.playerVSai === 2) {
                game.currentPlayer.count[9]++;
            }
        }

        if (game.currentPlayer.coin < 0) {
            game.currentPlayer.coin = 0;
        }
       

        if (game.playerVSai === 1) {
            if (game.currentPlayer.coin >= game.gA[3] && check1 && game.currentPlayer.state === 1 && game.stages === 1) {
                $(".open1").prop("disabled", false).removeClass("locked");
                $(".nextlv").show();
                $(".nextlv").addClass("alert");
                $(".cned").text(game.gA[3]);
                game.currentPlayer.coin -= game.gA[3];
                game.currentPlayer.state = game.currentPlayer.newState = 2;
            } else if (game.currentPlayer.coin >= game.gA[4] && check1 && game.currentPlayer.state === 2 && game.stages === 2) {
                $(".open2").prop("disabled", false).removeClass("locked");
                $(".nextlv").show();
                $(".nextlv").addClass("alert");
                $(".cned").text(game.gA[4]);
                game.currentPlayer.coin -= game.gA[4];
                game.currentPlayer.state = game.currentPlayer.newState = 3;
            } else if (game.currentPlayer.coin >= game.gA[6] && check1 && game.currentPlayer.state === 3 && game.stages === 3) {
                $(".open3").prop("disabled", false).removeClass("locked");
                $(".nextlv").show();
                $(".nextlv").addClass("alert");
                $(".cned").text(game.gA[6]);
                game.currentPlayer.coin -= game.gA[6];
                game.currentPlayer.state = game.currentPlayer.newState = 4;
            } else if (game.currentPlayer.state === 4) {
                game.currentPlayer.state = game.currentPlayer.newState = 5;
            } else {
                if (game.currentPlayer.state === 1 && $(".open1").prop("disabled") && game.stages === 1) {
                    $(".nextlv").hide();
                    $(".lvmes").text(`You need up to ${game.gA[3]} coin to unlock the next level`);
                } else if (game.currentPlayer.state === 2 && $(".open2").prop("disabled") && game.stages === 2) {
                    $(".nextlv").hide();
                    $(".lvmes").text(`You need up to ${game.gA[4]} coin to unlock the next level`);
                } else if (game.currentPlayer.state === 3 && $(".open3").prop("disabled") && game.stages === 3) {
                    $(".lvmes").text(`You need up to ${game.gA[6]} coin to unlock the next level`);
                    $(".nextlv").hide();
                } else {
                    if (game.stages < 3) {
                        $(".lvmes").text(``);
                        $(".nextlv").show();
                    }
                }
                $(".nextlv").removeClass("alert");
                $(".cned").text("");
            }
        }
    }

    if (verify && !game.gameEnded) {
        console.log("game.playerObj.record before unshift:", game.playerObj.record);
        console.log("Type of game.playerObj.record:", typeof game.playerObj.record);

        game.playerObj.record.unshift([
            game.stages,
            player1nm,
            game.currentPlayer.playerGoal1,
            player2nm,
            game.otherPlayer.playerGoal2,
            game.currentPlayer.status1,
            game.otherPlayer.status2,
            game.level,
            deduct,
        ]);

        game.gameEnded = true;
    } else {
        console.log("game.playerObj.record before unshift: cant do", game.playerObj.record);
        game.playerObj.record
    }

    $(".lead1").text(game.lead1);
    $(".lead2").text(game.lead2);
    const stringed = game.playerObj.coin

    const converted = convertCoin(stringed);
    $(".gold").text(converted);


}