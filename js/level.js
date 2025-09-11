const high = 200;
const low = 50;
const defaultValue = 100;
game.limitGoal = function (input) {
    const errorhigh = `Goal can't be greater than ${high}`
    const errorlow = `Goal can't be less than ${low}`
    const inputLen = input.length
    const haveR = input.includes(`r`)
    const haveL = input.includes(`s`)

    if (input === "") {
        input = low
    }

    if (input > high || !Number(input)) {
        if (input !== errorhigh && Number(input)) {
            input = errorhigh;
        }
    } else if (input < low || !Number(input)) {
        if (input !== errorlow && Number(input)) {
            input = errorlow;
        }
    };

    if (isNaN(input)) {
        if (haveR) {
            if (errorhigh.length > inputLen || errorhigh.length < inputLen) {
                input = high;
            }
        } else if (haveL) {
            if (errorlow.length > inputLen || errorlow.length < inputLen) {
                input = low;
            }

        }
    }
    return input;
}


$(document).ready(function () {
    let input = $('.goalpoint')
    input.on('input', function () {
        const container = $(this).closest('.bbt')
        const button = $(this).closest('.bbt').find('.textp')
        const inputed = $(this)
        const inputValue = $(this).val().trim()
        $(this).val(game.limitGoal(inputValue))
        let value = game.limitGoal(inputValue)
        if (value < low || value > high || !Number(value)) {
            inputed
                .css('color', 'red')
                .css('font-size', '1.7vmin')
                .css('padding', '0.5vmin 1vmin')
                .css('max-width', '103%')
                .css('width', '200%')
            button
                .prop('disabled', true)
                .css('background-color', '#ff00003f')
                .css('color', '#ffffff86')
            container
                .css('border', '9px solid #ff00003f')

        } else {
            [inputed, button, container].forEach(elm => {
                elm.removeAttr('style');
                if (elm === button) {
                    elm.prop('disabled', false)
                }

            })
        }



    });

    $(".bbtn").click(function () {
        const index = $(".bbtn").index(this);
        console.log(index)
        let inputValue = $(this).closest('.bbt').find('.goalpoint').val()
        game.goal = inputValue



        game.playerVSai = 1;
        clearInterval(game.timerInterval);
        game.timeLeft = game.initialTime;
        const see = game.stages
        game.there = false;
        game.back = true;
         $(".input-cont").show()
        $(".nextlv, .cashin, .coinwin").show();
        game.level = " ";
        $(".main-cont").hide();
        $(".level").show();
        $(".inputimg").html('<img src="img/bot p.png">');


        setTimeout(function () {
            $(".paced").slideUp();
            if (game.back) {
                $(".go2").slideDown()
                game.back = false
            } else {
                $(".input-cont").hide()
            }
            game.playerVSai = 1;
            if (index === 0) {

                game.level = "Easy";
                setTimeout(() => {
                    $(".main-cont").show();
                    console.log('in');

                    $(".level").hide();
                }, game.time);
                game.goalThreshold = 6;
                game.dontRoll1 = 4;
                game.stages = 1;
                game.newState2 = 2;


                $(".nextlv").show();
            } else if (index === 1) {
                game.level = "Medium";
                game.goalThreshold = 12;
                game.dontRoll1 = 8;
                game.stages = 2;
                game.newState2 = 3;
                setTimeout(() => {
                    $(".main-cont").show();
                    $(".level").hide();
                }, game.time);

                if (game.state === 2) {
                    $(".gold").text(game.playerObj.coin);
                }
                $(".hidecoin1").hide();
                $(".nextlv").show();
                $(".display1").html(` <div class="coinimg imgcn mid">
                                        <img src="img/bot p.png" alt="">
                                      </div>
                                      <p class="display1"><span>Medium</span></p>
                                   `);
            } else if (index === 2) {
                game.level = "Hard";
                setTimeout(() => {
                    $(".main-cont").show();
                    $(".level").hide();
                }, game.time);
                game.goalThreshold = 16;
                game.dontRoll1 = 12;
                game.stages = 3;
                game.newState2 = 4;
                if (game.state === 3) {
                    $(".gold").text(game.playerObj.coin);
                }
                $(".hidecoin2").hide();
                $(".nextlv").show();
                $(".display2").html(` <div class="coinimg imgcn had">
                                        <img src="img/bot p.png" alt="">
                                      </div>
                                      <p class="display1"><span>Hard</span></p>
                                   `);
            } else if (index === 3) {
                game.level = "Master";
                setTimeout(() => {
                    $(".main-cont").show();
                    $(".level").hide();
                }, game.time);
                game.goalThreshold = 25;
                game.dontRoll1 = 18;
                game.stages = 4;
                if (game.state === 4) {
                    $(".gold").text(game.playerObj.coin);
                }
                $(".hidecoin3").hide();
                $(".nextlv").hide();
                $(".display3").html(` <div class="coinimg imgcn mas">
                                        <img src="img/bot p.png" alt="">
                                      </div>
                                      <p class="display1"><span>Master</span></p>
                                   `);
            } else if (index === 4) {
                game.playerVSai = 2;
                $(".level").hide();
                $(".main-cont").show();
                $(".input-cont").show();
                $(".go2").show();
                clearInterval(game.timerInterval);
                game.stages = 0;
                $(".cashin, .nextlv, .coinwin").hide();
                game.level = " ";
                game.there = false;
                $(".inputimg").html('<img src="img/useer.png">');
                $("#player2").val("PLAYER😇").prop("readonly", false);
            } else if (index === 5) {
                $(".main-cont").hide();
                $(".input-cont").hide();
                $(".go2").hide();
                game.there = true;
                game.level = " ";
                console.log('why');
                
            }

            $(".levelmes").text(game.level);
            if (game.playerVSai === 1) {
                $("#player2").prop("readonly", true).val("MarticAM.AI💻 " + game.level.charAt(0));
            }
           
            // if (see !== game.stages) {
            //     resetGame(game)
            //     clearInterval(game.timerInterval)
            //     game.timeLeft = game.initialTime
            //     game.startTimer()
            //     $(".input-cont").show()
            // } else {
            //     clearInterval(game.timerInterval)
            //     game.startTimer()
            // };

            if (game.gameEnded) {
                resetGame(game)
                clearInterval(game.timerInterval)
                game.timeLeft = game.initialTime
                game.startTimer()
            }
        }, 50)
    });
});