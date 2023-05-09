var hasOpp = false;
var rpsVersion = true;

async function play() {
    var winner = document.getElementById("winner");
    var rand_move = document.getElementById("rand_move")
    var player = document.getElementById("playerMove");
    var opp = document.getElementById("opponentMove");
    var oppGame = document.getElementById("opponentGame")
    if (rpsVersion && hasOpp) {
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
        opp.innerHTML = `Opponent move: ${data.opp}`;
        winner.innerHTML = `Result: ${data.result}`;
        oppGame.className = "active";
        rand_move.className = "inactive";
    }
    else if (rpsVersion) {
        const response = await fetch(`/app/rps/play`);
        const data = await response.json();
        rand_move.innerHTML = `Move: ${data.player}`;
        oppGame.className = "inactive"
        rand_move.className = "active";
    }
    else if (hasOpp) {
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
        opp.innerHTML = `Opponent move: ${data.opp}`;
        winner.innerHTML = `Result: ${data.result}`;
        oppGame.className = "active"
        rand_move.className = "inactive";
    }
    else {
        const response = await fetch(`/app/rpsls/play`);
        const data = await response.json();
        rand_move.innerHTML = `Move: ${data.player}`;
        oppGame.className = "inactive"
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
    oppChange();
    console.log(rpsVersion);
}

async function rpsSelected() {
    rpsVersion = true;
    oppChange();
    console.log(rpsVersion);
}

async function oppChange() {
    const oppCheck = document.querySelector('#opponent');
    const rpsSect = document.getElementById("rps");
    const rpslsSect = document.getElementById("rpsls")
    console.log(oppCheck.checked)
    rpsSect.className = "active";
    if (oppCheck.checked && rpsVersion) {
        rpsSect.className = "active";
        rpslsSect.className = "inactive";
        hasOpp = true;
    }
    else if (oppCheck.checked && !rpsVersion) {
        rpsSect.className = "active";
        rpslsSect.className = "active";
        hasOpp = true;
    }
    else {
        rpsSect.className = "inactive";
        rpslsSect.className = "inactive";
        hasOpp = false;
    }

}