class Player {
    constructor(username, nickname, email, password,phonenumber) {
        this.userName = username;
        this.nickName = nickname;
        this.emailAddress = email;
        this.phoneNumber = phonenumber;
        this.password = password;
        this.playerGoal1 = 0;
        this.playerGoal2 = 0;
        this.newState2 = 1;
        this.newState = 1;
        this.status1 = null;
        this.status2 = null;
        this.stages = 1;
        this.coin = 100;
        this.cash = 0;
        this.state = 1;
        this.bar = 0;
        this.record = [];
        this.cashRecord = [];
        this.count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.wlcount = [0,0];
        this.online = false;
        this.banned = false;
    }
}
