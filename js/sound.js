$(document).ready(function () {
    $(".soundch").click(function () {
        const index = $(".soundch").index(this);
        $(".soundch").removeClass("coll");
        $(".soundch").find("p span").text("🔈");

        $(".audio").empty();
        $(".sdsw").text(game.off ? "OFF" : "ON");
        if (index === 0) {
            if (game.SC1) {
                $(".audio").html(`<audio class="aud" src="audio/favorite.mp3" autoplay loop>`);
                game.active = 1;
                $(this).addClass("coll").find("p span").text("🔊");
                game.off = game.SC1 = !game.SC1
            }
            game.SC2 = game.SC3 = game.SC4 = true;
        } else if (index === 1) {
            if (game.SC2) {
                $(".audio").html(`<audio class="aud" src="audio/drill.mp3" autoplay loop>`);
                game.active = 2;
                $(this).addClass("coll").find("p span").text("🔊");
                game.off = game.SC2 = !game.SC2;
            }
            game.SC1 = game.SC3 = game.SC4 = true;
        } else if (index === 2) {
            if (game.SC3) {
                $(".audio").html(`<audio class="aud" src="audio/squid amapiano.mp3" autoplay loop>`);
                game.active = 3;
                $(this).addClass("coll").find("p span").text("🔊");
                game.off = game.SC3 = !game.SC3;
            }
            game.SC1 = game.SC2 = game.SC4 = true;
        } else if (index === 3) {
            if (game.SC4) {
                $(".audio").html(`<audio class="aud" src="audio/mingle squid.mp3" autoplay loop>`);
                game.active = 4;
                $(this).addClass("coll").find("p span").text("🔊");
                game.off = game.SC4 = !game.SC4;
            }
            game.SC1 = game.SC2 = game.SC3 = true;
        }


      
    });

    $(".off").click(function () {
        if (game.off) {
            game.off = false
            game.active = Math.floor(Math.random() * 4);
            $(`.soundch`).eq(game.active).trigger("click");
        } else {
            game.off = true
            game.SC1 = game.SC2 = game.SC3 = game.sc4 = true
            $(".audio").empty();
        };
        
        $(".sdsw").text(!game.off ? "OFF" : "ON");
    });


    $(".sdsw").text(game.off ? "OFF" : "ON");
    $(".sd3").trigger("click");
});