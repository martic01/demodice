const generateId = () => Math.floor(10000000 + Math.random() * 90000000);

class Game {
    constructor() {
        this.players = {};
        this.level = "Easy";
        this.account = 1;
        this.playerVSai = false;
        this.timeTurn = null;
        this.timeOut = null;
        this.rollOne = false;
        this.active = false;
        this.goal = 0;
        this.startTimer = null;
        this.timerInterval = null;
        this.initialTime = 30;
        this.timeLeft = this.initialTime;
        this.restartTimer = null;
        this.keyturn = null;
        this.there = true;
        this.limitGoal;
        this.gameEnded = false;
        this.rolled = true;
        this.back = false;
        this.showTurn = true;
        this.aiRolling = true;
        this.off = true;
        this.SC1 = true;
        this.SC2 = true;
        this.SC3 = true;
        this.SC4 = true;
        this.lead1 = 0;
        this.lead2 = 0;
        this.goalThreshold = 10;
        this.playerResult = 0;
        this.bL = [5, 15, 20, 25];
        this.gA = [10, 20, 30, 120, 200, 80, 400];
        this.time = 400;
        this.dontRoll1 = 6;
        this.playerSw = null;
        this.playerObj = null;
        this.playId = null;
        this.firstId = null;
        this.currentPlayer = null;
        this.otherPlayer = null;
        this.defaultPlayer1 = null;
        this.defaultPlayer2 = null;
        this.createPlayer = null;
    }

    async addPlayer(player) {
        do {
            player.id = generateId();
        } while (this.players[player.id]);
        this.players[player.id] = player;
    }

    addPlaying(player1, player2) {
        const onGoing = [player1, player2]
        return onGoing
    }

    findPlayer(id) {
        return this.players[id] || false;
    }

    switchPlayer() {
        const playerIds = Object.keys(this.players);
        const currentIndex = playerIds.indexOf(this.playerSw.toString());
        const nextIndex = (currentIndex + 1) % playerIds.length;
        this.playerSw = playerIds[nextIndex];
    }
}

