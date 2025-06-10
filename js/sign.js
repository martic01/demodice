

$(document).ready(function () {

    $(".btn").click(function () {
        let index = $(".btn").index(this)
        $(".container,.playon").hide()
        if (index === 0 || index === 5) {
            $(".warn").fadeIn()
            game.account = 1
        } else if (index === 1) {
            $(".signed,.playon").fadeIn()
            game.account = 2
        } else if (index === 2) {
            $(".shct").fadeIn()
        } else if (index === 3) {
            $(".must").fadeIn()
        } else {
            closeUp(".body", "leave", 1100)
        }
    });
    $(".read").click(function () {
        if (game.account === 1) {
            game.createPlayer(game)
        }
    })
    $(".logout").click(function () {
        game.account = 0
        $(".must").fadeIn()
        $(".body").fadeIn()
    })
})