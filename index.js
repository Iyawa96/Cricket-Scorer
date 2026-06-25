
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
    teamName.value = team === "home" ? homeName.innerText : awayName.innerText;
    setActiveTeamOrPlayerTab("team");
    if (team === "home") {
        enterTeamName.innerText = "Home Team Name:";
    } else {
        enterTeamName.innerText = "Away Team Name:";   
    }
    populatePlayerInputs(team);
}

function populatePlayerInputs(team) {
    const existingPlayers = teams[team];
    playerInputs.forEach((input, index) => {
        const player = existingPlayers[index];
        input.value = player ? player.name : "";
    });
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
const nbExtraTypeGroup = document.querySelector("#nb-extra-type");
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
    eventActionInput.value = eventActionInput.defaultValue;

    if(event === "nb") {
        eventActionHeader.innerText = "Total No Balls:"; 
        nbExtraTypeGroup.style.display = "flex";   
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
    nbExtraTypeGroup.style.display = "none";
}

function updateEventModal(event) {
    const extrasAmount = Number(eventActionInput.value);
    const nbExtraType = activeModalEvent === "nb" ? getNbExtraType() : null;
    closeEventModal();
    return { event: activeModalEvent, extrasAmount, nbExtraType };
}

closeEventModalBtn.addEventListener("click", closeEventModal);
submitEventModalBtn.addEventListener("click", updateEventModal);

//END

//WICKET MODAL
const wicketModal = document.querySelector("#wicket-modal");
const wicketBtn = document.querySelector("#wicket-btn");
const closeWicketModalBtn = document.querySelector("#close-wicket-modal");
const submitWicketModalBtn = document.querySelector("#submit-wicket-modal");
const dismissalMethodSelect = document.querySelector("#dismissal-method");
const fielderSelectWrap = document.querySelector("#fielder-select-wrap");
const fielderSelect = document.querySelector("#fielder-select");
const strikerOutLabel = document.querySelector("#striker-out-label");
const nonstrikerOutLabel = document.querySelector("#nonstriker-out-label");
const DISMISSALS_NEEDING_FIELDER = ["caught", "runout", "stumped"];
const DISMISSALS_CREDITING_BOWLER = ["bowled", "caught", "lbw", "stumped", "hitwicket"];

function getBattingTeam() {
    return teams.home.length > 0 ? "home" : "away";
}

function getFieldingTeam() {
    return getBattingTeam() === "home" ? "away" : "home";
}

function populateFielderSelect() {
    const fieldingTeam = getFieldingTeam();
    fielderSelect.innerHTML = "";
    teams[fieldingTeam].forEach((player) => {
        const option = document.createElement("option");
        option.value = player.name;
        option.innerText = player.name;
        fielderSelect.appendChild(option);
    });
}

function updateFielderVisibility() {
    const method = dismissalMethodSelect.value;
    if (DISMISSALS_NEEDING_FIELDER.includes(method)) {
        fielderSelectWrap.classList.remove("conditional-field-hidden");
        populateFielderSelect();
    } else {
        fielderSelectWrap.classList.add("conditional-field-hidden");
    }
}

dismissalMethodSelect.addEventListener("change", updateFielderVisibility);

function openWicketModal() {
    wicketModal.style.display = "block";
    dismissalMethodSelect.value = "bowled";
    strikerOutLabel.innerText = document.querySelector("#batter1-name").innerText;
    nonstrikerOutLabel.innerText = document.querySelector("#batter2-name").innerText;
    document.querySelector("#batsman-out-striker").checked = true;
    updateFielderVisibility();
}

function closeWicketModal() {
    wicketModal.style.display = "none";
}

function getBatsmanOut() {
    const selected = document.querySelector('input[name="batsman-out"]:checked');
    return selected ? selected.value : "striker";
}

function updateWicketModal() {
    const method = dismissalMethodSelect.value;
    const batsmanOut = getBatsmanOut();
    const needsFielder = DISMISSALS_NEEDING_FIELDER.includes(method);
    const fielder = needsFielder ? fielderSelect.value : null;
    const creditBowler = DISMISSALS_CREDITING_BOWLER.includes(method);
    closeWicketModal();
    return { method, batsmanOut, fielder, creditBowler };
}

wicketBtn.addEventListener("click", openWicketModal);
closeWicketModalBtn.addEventListener("click", closeWicketModal);
submitWicketModalBtn.addEventListener("click", updateWicketModal);

//END
//RUN BUTTONS
const homeRuns = document.querySelector("#home-runs");
let runsCount = 0;
const numOfRunButtons = document.querySelectorAll(".run-btn").length;

const fiveRunsModal = document.querySelector("#five-runs-modal");
const closeFiveRunsBtn = document.querySelector("#close-five-runs-modal");
const submitFiveRunsBtn = document.querySelector("#submit-five-runs-modal");
const fiveRunsValue = document.querySelector("#five-runs-value");

function openFiveRunsModal() {
    fiveRunsModal.style.display = "block";
    fiveRunsValue.value = fiveRunsValue.defaultValue;
}

function closeFiveRunsModal() {
    fiveRunsModal.style.display = "none";
}

function updateFiveRunsModal() {
    runsCount += Number(fiveRunsValue.value);
    closeFiveRunsModal();
    addRun();
}

fivePlusRuns.addEventListener("click", openFiveRunsModal);
closeFiveRunsBtn.addEventListener("click", closeFiveRunsModal);
submitFiveRunsBtn.addEventListener("click", updateFiveRunsModal);

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
