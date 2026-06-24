
const dotBall = document.querySelector("#dot-ball");
const oneRuns = document.querySelector("#one-runs");
const twoRuns = document.querySelector("#two-runs");
const threeRuns = document.querySelector("#three-runs");
const fourRuns = document.querySelector("#four-runs");
const sixRuns = document.querySelector("#six-runs");
const fivePlusRuns = document.querySelector("#five-plus-runs");
const homeName = document.querySelector("#home-name");
const awayName = document.querySelector("#away-name");

const teamModal = document.querySelector("#team-modal");
const homeTeamNameBtn = document.querySelector("#home-team-name");
const awayTeamNameBtn = document.querySelector("#away-team-name");
const closeTeamModalBtn = document.querySelector("#close-team-modal");
const submitTeamModalBtn = document.querySelector("#submit-team-modal");


const overModal = document.querySelector("#over-modal");
const overLimitBtn = document.querySelector("#over-limit-btn");
const closeOverModalBtn = document.querySelector("#close-over-modal");
const submitOverModalBtn = document.querySelector("#submit-over-modal");

//SWITCH TAB MODAL
const teamTabBtn = document.querySelector("#team-modal-tab");
const playersTabBtn = document.querySelector("#players-modal-tab");
const teamTabContent = document.querySelector("#team-tab-content");
const playersTabContent = document.querySelector("#players-tab-content");


function setActiveTeamOrPlayerTab(tab) {
    if (tab === "team") {
        teamTabContent.classList.add("tab-active");
        teamTabContent.classList.remove("tab-inactive");
        playersTabContent.classList.add("tab-inactive");
        playersTabContent.classList.remove("tab-active");

        teamTabBtn.classList.add("btn-primary");
        teamTabBtn.classList.remove("btn-secondary");
        playersTabBtn.classList.add("btn-secondary");
        playersTabBtn.classList.remove("btn-primary");
    } else if (tab === "players") {
        playersTabContent.classList.remove("tab-inactive");
        playersTabContent.classList.add("tab-active");
        teamTabContent.classList.remove("tab-active");
        teamTabContent.classList.add("tab-inactive");

        playersTabBtn.classList.remove("btn-secondary");
        playersTabBtn.classList.add("btn-primary");
        teamTabBtn.classList.remove("btn-primary");
        teamTabBtn.classList.add("btn-secondary");
    }
}

teamTabBtn.addEventListener("click", ()=> {
    setActiveTeamOrPlayerTab("team");
})

playersTabBtn.addEventListener("click", ()=> {
    setActiveTeamOrPlayerTab("players");
})

//END

//TEAMS MODAL
const enterTeamName = document.querySelector("#enter-team-name");
let teamName = document.querySelector("#input-team-name");
let activeModalTeam = null;

homeTeamNameBtn.addEventListener("click", function() {
    openTeamModal("home");
})

awayTeamNameBtn.addEventListener("click", function() {
    openTeamModal("away");
})

function openTeamModal(team) {
    teamModal.style.display = "block";
    activeModalTeam = team;
    teamName.value = "";
    setActiveTeamOrPlayerTab("team");
    if (team === "home") {
        enterTeamName.innerText = "Home Team Name:";
    } else {
        enterTeamName.innerText = "Away Team Name:";   
    }
}

function closeTeamModal() {
    teamModal.style.display = "none";
}

function updateTeamModal(team) {
    activeModalTeam = team;
    if (team === "home") {
        homeName.innerText = teamName.value;
        
    } else {
        awayName.innerText = teamName.value;
    }
    closeTeamModal();
}



closeTeamModalBtn.addEventListener("click", closeTeamModal);
submitTeamModalBtn.addEventListener("click", function() {
    updateTeamModal(activeModalTeam);
    submitPlayers();
    updateBatters();
    updateBowler();
});

//END

//OVERS MODAL
function openOverModal() {
    overModal.style.display = "block";
    document.querySelector("#over-limit").value = document.querySelector("#over-limit-view").innerText;
}

function closeOverModal() {
    overModal.style.display = "none";
}

function updateOverModal() {
    let overLimit = Number(document.querySelector("#over-limit").value);
    document.querySelector("#over-limit-view").innerText = overLimit;
    closeOverModal();
    return overLimit;
}

overLimitBtn.onclick = openOverModal;
closeOverModalBtn.addEventListener("click", closeOverModal);
submitOverModalBtn.addEventListener("click", updateOverModal);
//END

//EVENT MODAL
const eventModal = document.querySelector("#event-modal");
const closeEventModalBtn = document.querySelector("#close-event-modal");
const submitEventModalBtn = document.querySelector("#submit-event-modal");
const eventActionHeader = document.querySelector("#event-action-header");
const noBallBtn = document.querySelector("#nb-btn");
const wideBtn = document.querySelector("#wd-btn");
const byesBtn = document.querySelector("#b-btn");
const legByesBtn = document.querySelector("#lb-btn");
const eventActionInput = document.querySelector("#event-action");
const nbExtraType = document.querySelector("#nb-extra-type");
let activeModalEvent = null;

noBallBtn.addEventListener("click", function() {
    openEventModal("nb");
})
wideBtn.addEventListener("click", function() {
    openEventModal("wd");
})
byesBtn.addEventListener("click", function() {
    openEventModal("b");
})
legByesBtn.addEventListener("click", function() {
    openEventModal("lb");
})

function openEventModal(event) {
    eventModal.style.display = "block";
    activeModalEvent = event;

    if(event === "nb") {
        eventActionHeader.innerText = "Total No Balls:"; 
        nbExtraType.style.display = "flex";   
        const nbRadios = document.querySelectorAll('input[name="nb-extra"]');
        nbRadios.forEach(radio => radio.checked = false);
    } else if(event === "wd") {
        eventActionHeader.innerText = "Total Wides:";        
    } else if(event === "b") {
        eventActionHeader.innerText = "Total Byes:";
    } else if(event === "lb") {
        eventActionHeader.innerText = "Total Leg Byes:";
    }
}

function getNbExtraType() {
    const selectedNbType = document.querySelector('input[name="nb-extra"]:checked');
    return selectedNbType ? selectedNbType.value : "runs";
}

function closeEventModal() {
    eventModal.style.display = "none";
    nbExtraType.style.display = "none";
}

function updateEventModal(event) {
    activeModalEvent = event;
    if(event === "nb") {
        
    } else if(event === "wd") {
               
    } else if(event === "b") {
        
    } else if(event === "lb") {
        
    }
    closeEventModal();
}

closeEventModalBtn.addEventListener("click", closeEventModal);
submitEventModalBtn.addEventListener("click", updateEventModal);

//END
//RUN BUTTONS
const homeRuns = document.querySelector("#home-runs");
let runsCount = 0;
const numOfRunButtons = document.querySelectorAll(".run-btn").length;

for (let i = 0; i < numOfRunButtons; i++) {
    document.querySelectorAll(".run-btn")[i].addEventListener("click", function() {
        let buttonInnerHTML = this.innerHTML;
        switch (buttonInnerHTML) {
            case "1":
                runsCount++;
                addRun();
                break;
            case "2":
                runsCount += 2;
                addRun();
                break;
            case "3":
                runsCount += 3;
                addRun();
                break;
            case "4":
                runsCount += 4;
                addRun();
                break;
            case "6":
                runsCount += 6;
                addRun();
                break;
            case "5+":
                runsCount += 5;
                addRun();
                break;
            default:
        }
    });
}

//current batter
const batter1Balls = document.querySelector("#batter1-balls");
let batter1BallsCount = 0;


//current bowler
const currentBowlerOvers = document.querySelector("#cbo");
let currentBowlerOversCount = 0;

function addRun() {
        homeRuns.innerText = runsCount;
        batter1BallsCount++;
        batter1Balls.innerText = batter1BallsCount;
}

function updateBowler() {
    const bowlerName = document.querySelector("#current-bowler-name");
    if (teams.away.length > 0) {
        bowlerName.innerText = teams.away[0].name;
    }
}
//END

//INNINGS OBJECT
const innings = {
    balls: 0,

    addBalls() {
        this.balls++;
    },

    getOvers() {
        const overs = Math.floor(this.balls / 6);
        const balls = this.balls % 6;
        return overs + "." + balls;
    }
};

//END

//PLAYER CLASS
const teams = {
    home: [],
    away: []
}

class Player {
    constructor(team, name, battingPosition) {
        this.team = team;
        this.name = name;
        this.battingPosition = battingPosition;
    }
}

const playerInputs = document.querySelectorAll(".player-name-input");

function submitPlayers() {
    teams[activeModalTeam] = [];
    playerInputs.forEach((input, index) => {
        const name = input.value.trim();
        if (name !== "") {
            const player = new Player(
                activeModalTeam,
                name,
                index + 1
            );
            teams[activeModalTeam].push(player);
        }
    });
    console.log(teams);
}

function updateBatters() {
    const firstBatterName = document.querySelector("#batter1-name");
    const secondBatterName = document.querySelector("#batter2-name");
    if (teams.home.length > 0) {
        firstBatterName.innerText = teams.home[0].name;
        secondBatterName.innerText = teams.home[1].name;
    }
}
