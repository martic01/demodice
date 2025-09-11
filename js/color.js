// Color-related logic
let colin;



$(document).ready(function () {
    window.addEventListener("keydown", (e) => {
        if (e.key === "c") {
            colin = Math.floor(Math.random() * 6);
            $(".colour").eq(colin).trigger("click");
        }
    });

    function applyStyles(className, game) {
        $(`.${className}`).click(function () {
            const index = $(`.${className}`).index(this);
            const c = ["white", "red", "aqua", "blue", "pink", "green", "black"];
            const cA = ["#ffffffbb", "#f5193ebb", "#00ffffd0", "#1c0cf1af", "#ffc0cbbc", "#3afd12bb"];
            const gradients = ["#0000003f", c[index], "#0000003f"];

            $(`.${className}`).removeClass("coll");
            $(`.${className}`).text("");
            $(".pikcol").removeClass("coll");
            $(".pikcol").text("");
            $(this).addClass("coll");
            $(this).text(`✔`);
            $(".pikcol").eq(index).addClass("coll");
            $(".pikcol").eq(index).text(`✔`);

            document.querySelector(".pack").style.backgroundColor = c[index];
            document.querySelector(".setopt").style.textShadow = `2px 4px 7px ${c[index + 1]}`;



            $(".soundch").hover(
                function () {
                    $(this).css('background-color', c[index])
                    setTimeout(() => {
                        $(this).css('background-color', cA[index])
                    }, 450);

                },
                function () {
                    $(this).css('background-color', cA[index])
                    setTimeout(() => {
                        $(this).css('background-color', '')
                    }, 500);
                }

            );


            document.querySelector(".main-cont").style = `background: linear-gradient(90deg, ${gradients});`;

            document.querySelectorAll(".tool, .usernmhum, .his").forEach(el => {
                el.style.backgroundColor = cA[index];
            });

            const elements = [
                { selector: ".butt", style: "backgroundColor", value: cA[index] },
                { selector: ".inputimg", style: "backgroundColor", value: cA[index] },
                { selector: ".diepig", style: "color", value: c[index] },
                { selector: ".tcl", style: "color", value: c[index] },
                { selector: ".pl", style: "textShadow", value: `0 0 10px ${c[index]}` },
                { selector: ".bbt", style: "border", value: `5px solid ${c[index]}` },
            ];

            elements.forEach(({ selector, style, value }) =>
                document.querySelectorAll(selector).forEach(el => el.style[style] = value)
            );

            if (game.there) {
                $(".main-cont").hide();
            } else {
                $(".main-cont").show();
            }

            if (index === 0) {
                document.querySelector(".levelmes").style.color = c[6];
                document.querySelector(".ar").style.color = c[6];
                document.querySelector(".ar2").style.color = "#252323";
                document.querySelector(".his").style.color = "grey";

            } else if (index === 2 || index === 4) {
                document.querySelector(".levelmes").style.color = c[7];
                document.querySelector(".ar").style.color = c[7];
                document.querySelector(".ar2").style.color = "#252323";
                document.querySelector(".his").style.color = "grey";
            } else {
                document.querySelector(".levelmes").style.color = c[index];
                document.querySelector(".ar").style.color = c[index];
                document.querySelector(".ar2").style.color = c[index - 1];
                document.querySelector(".his").style.color = "#fff";
            }
        });
    }



    applyStyles("colour", game);
});