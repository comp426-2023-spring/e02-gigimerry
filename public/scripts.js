
var hasOpponent = false;
var rpsVersion = true;


async function play() {
    var winner = document.getElementById("winner");
    var rand_move = document.getElementById("rand_move")
    var player = document.getElementById("playerMove");
    var opponent = document.getElementById("opponentMove");
    var opponentGame = document.getElementById("opponentGame")
    if (rpsVersion && hasOpponent) {
        var move;
        var radios = document.getElementsByName("move");
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                move = radios[i].value;
                break;
            }
        }
        const response = await fetch(`/app/rps/play/${move}`);
        const data = await response.json();
        player.innerHTML = `Player move: ${data.player}`;
        opponent.innerHTML = `Opponent move: ${data.opponent}`;
        winner.innerHTML = `Result: ${data.result}`;
        opponentGame.className = "active";
        rand_move.className = "inactive";
    }
    else if (rpsVersion) {
        const response = await fetch(`/app/rps/play`);
        const data = await response.json();
        rand_move.innerHTML = `Move: ${data.player}`;
        opponentGame.className = "inactive"
        rand_move.className = "active";
    }
    else if (hasOpponent) {
        var move;
        var radios = document.getElementsByName("move");
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                move = radios[i].value;
                break;
            }
        }
        const response = await fetch(`/app/rpsls/play/${move}`);
        const data = await response.json();
        player.innerHTML = `Player move: ${data.player}`;
        opponent.innerHTML = `Opponent move: ${data.opponent}`;
        winner.innerHTML = `Result: ${data.result}`;
        opponentGame.className = "active"
        rand_move.className = "inactive";
    }
    else {
        const response = await fetch(`/app/rpsls/play`);
        const data = await response.json();
        rand_move.innerHTML = `Move: ${data.player}`;
        opponentGame.className = "inactive"
        rand_move.className = "active"
    }
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

async function reset() {
    location.reload();
}

async function rpslsSelected() {
    rpsVersion = false;
    opponentChange();
    console.log(rpsVersion);
}

async function rpsSelected() {
    rpsVersion = true;
    opponentChange();
    console.log(rpsVersion);
}

async function opponentChange() {
    const opponentCheck = document.querySelector('#opponent');
    const rpsSect = document.getElementById("rps");
    const rpslsSect = document.getElementById("rpsls")
    console.log(opponentCheck.checked)
    rpsSect.className = "active";
    if (opponentCheck.checked && rpsVersion) {
        rpsSect.className = "active";
        rpslsSect.className = "inactive";
        hasOpponent = true;
    }
    else if (opponentCheck.checked && !rpsVersion) {
        rpsSect.className = "active";
        rpslsSect.className = "active";
        hasOpponent = true;
    }
    else {
        rpsSect.className = "inactive";
        rpslsSect.className = "inactive";
        hasOpponent = false;
    }

}