$(document).ready(function () {
    const game = window.game;

    function updateChart(elm1, elm2, elm3, count1, count2) {
        let cal1 = parseInt((count1 / (count1 + count2)) * 100);
        let cal2 = parseInt((count2 / (count1 + count2)) * 100);
        let win = cal1;
        let lose = cal2;

        if (isNaN(win || lose)) {
            win = 0;
            lose = 0;
            $(elm1).css("background-color", "grey");
        } else {
            let gradient = `conic-gradient(
                #093d09 0% ${win}%, 
                #3a0505 ${win}% 100%
            )`;
            $(elm1).css("background", gradient);
        }

        if (win > lose) {
            $(elm1).css("border", "3px solid green");
        } else if (win < lose) {
            $(elm1).css("border", "3px solid red");
        } else {
            $(elm1).css("border", "3px solid grey");
        }
        $(elm2).text(`${win}%`);
        $(elm3).text(`${lose}%`);
    }

    function generateHTML(r) {
        return `<div class="flex2 wondiv gm">
            <p class="flex tp"><b>${r[5]}</b> <span>Title</span> ${r[6]}</p>
            <p class="flex">${r[1]} <span>VS</span> ${r[3]}</p>
            <p class="flex tp">${r[2]} <span>point</span> ${r[4]}</p>
        </div>`;
    }

    $(".his").click(() => {
        $(".cont").hide();
        $(".history, .playhis, .resulthis, .pies").show();
        $(".humrec").hide();

        const displays = { 1: [], 2: [], 3: [], 4: [], 0: [] };

        game.currentPlayer.record.forEach((r) => {
            const stage = r[0];
            displays[stage].push(generateHTML(r));

            if (displays[stage].length > 60) {
                displays[stage] = displays[stage].slice(0, 60);
            }
        });

        game.currentPlayer.record = game.currentPlayer.record.filter((r) => {
            const stage = r[0];
            const html = generateHTML(r);
            return displays[stage].includes(html);
        });

        for (const key in displays) {
            displays[key] = displays[key].join("");
        }

        [1, 2, 3, 4, 0].forEach((stage, i) =>
            updateChart(
                `.pieChart${stage === 0 ? "hum" : stage}`,
                `.win${stage === 0 ? "hum" : stage}`,
                `.lose${stage === 0 ? "hum" : stage}`,
                game.currentPlayer.count[i * 2],
                game.currentPlayer.count[i * 2 + 1]
            )
        );

        const results = game.currentPlayer.record.map((match) => {
            const [stages, player1nm, playerGoal1, player2nm, playerGoal2, status1, status2, level] = match;
            const deduct = playerGoal1 - playerGoal2;

            let winner;
            if (deduct > 0) {
                winner = player1nm;
            } else {
                winner = player2nm;
            }

            return {
                winner: winner,
                goalDifference: Math.abs(deduct),
            };
        });

        results.sort((a, b) => b.goalDifference - a.goalDifference);

        const resultsHTML = results
            .map(
                (result) => `
            <div class="flex">
                <p class="flex tp name">${result.winner}</p>
                <p class="goaldiffrence">${result.goalDifference}</p>
            </div>
        `
            )
            .join("");

        const layer = {
            ".stage1": displays[1],
            ".stage2": displays[2],
            ".stage3": displays[3],
            ".stage4": displays[4],
            ".humstage": displays[0],
            ".scorebd": resultsHTML,
        };

        Object.entries(layer).forEach(([selector, content]) => $(selector).html(content));

        $("b").each((index, el) => {
            if ($(el).text() === "Lost") $(".gm").eq(index).removeClass("wondiv").addClass("losediv");
        });
    });
   

    $(".closehis").click(function () {
        closeUp(".history","leave",1100)
        $(".disstatus").empty();
       
    });


    $(".wl").click(() => {
        $(".cont").hide();
        $(".playhis").show();
        $(".resulthis,.pies").show();
        $(".humrec").hide();
    });

    $(".sb").click(() => {
        $(".cont").hide();
        $(".scorebd").show();
    });

    $(".cb").click(() => {
        $(".cont").hide();
        $(".cashbd").show();
    });

    $(".hmairec").click(() => {
        $(".humrec").hide();
        $(".resulthis,.pies").show();
    });

    $(".hmrec").click(() => {
        $(".humrec").show();
        $(".resulthis,.pies").hide();
    });
});