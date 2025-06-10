document.addEventListener("DOMContentLoaded", () => {
    const game = window.game;
    const minutesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");

    game.startTimer = function () {
        game.timerInterval = setInterval(updateTimer, 1000);
    };

    function updateTimer() {
        const minutes = Math.floor(game.timeLeft / 60);
        const seconds = game.timeLeft % 60;

        const minutesStr = String(minutes).padStart(2, "0");
        const secondsStr = String(seconds).padStart(2, "0");

        updateDigits(minutesElement, minutesStr);
        updateDigits(secondsElement, secondsStr);

        game.timeLeft--;

        if (game.timeLeft < 0) {
            clearInterval(game.timerInterval);
            if (game.gameEnded) {
                setTimeout(() => game.restartTimer(), 1500);
            }
            $(".save").trigger("click");
        }
    }

    function updateDigits(container, newValue) {
        const digits = container.querySelectorAll(".digit");
        const digit2 = container.querySelectorAll(".digit2");

        digits.forEach((digit, index) => {
            const currentDigit = digit.textContent;
            const newDigit = newValue[index];

            if (currentDigit !== newDigit) {
                digit.textContent = newDigit;
                digit.classList.add("write");

                if (game.timeLeft <= 5) {
                    digit.classList.add("glow-red");
                    if (game.rolled) {
                        $("#roll").trigger("click");
                    }
                } else if (game.timeLeft <= 20) {
                    digit2.forEach((e) => {
                        e.classList.add("glow-yellow");
                    });
                } else {
                    digit.classList.add("glow");
                }

                setTimeout(() => {
                    digit.classList.remove("write", "glow", "glow-yellow", "glow-red");
                }, 500);
            }
        });
    }

    restartTimer = function (game) {
        clearInterval(game.timerInterval);
        game.timeLeft = game.initialTime;
        updateTimer();
        game.startTimer();
    };
});