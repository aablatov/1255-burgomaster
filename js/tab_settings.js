function setupMobileUI() {
	if (game.isMobile === 1) {
		document.getElementById("cbMobileUI").checked = true;
	} else {
		document.getElementById("cbMobileUI").checked = false;
	}
}
	function setupEventLogSizeUI () {
		document.getElementById("inpStnEventLogSize").value    = game.log_size;
		document.getElementById("log").style.height = game.log_size * 20;
	}
	function setupNickname() {
		document.getElementById("inp_nickname").innerHTML = game.nickname;
	}
	function setupAutosave() {
		game.userASaveAck = 0;
		if (game.o_autosave===0) {
			if (typeof autosaveObject !== 'undefined') {
				clearInterval(autosaveObject);
			}
			document.getElementById("autosaveImg").setAttribute("src","resources/button_red.png");
		} else {
			autosaveObject = setInterval(autosaveGame, 40000);
			document.getElementById("autosaveImg").setAttribute("src","resources/button_green.png");
		}
	}
	function changeAutosave() {
		if (game.o_autosave===0) {
			game.o_autosave = 1;
			postEventLog(locObj.autosaveTurnedOn.txt);
			setupAutosave();
		} else {
			game.o_autosave = 0;
			postEventLog(locObj.autosaveTurnedOff.txt);
			setupAutosave();
		}
	}
	function changeColorMode() {
		if (game.nightMode === false) {
			nightMode = 1;
			game.nightMode = true;
			enforceColorMode();
		} else {
			nightMode = 0;
			game.nightMode = false;
			enforceColorMode();
		}
	}
	function enforceColorMode() {
		if (game.nightMode === true) {
			//darktheme
			var treasury_guard_darkmode = new Image;
			treasury_guard_darkmode.src = 'resources/treasury_guard_night_mode.png'
			document.getElementById("treasury_guard_div").innerHTML = "";
			document.getElementById("treasury_guard_div").appendChild(treasury_guard_darkmode);
			var b = document.getElementsByTagName("body");
			b[0].style.backgroundColor = "black";
			var divs = document.getElementsByTagName("div");
			for (var i = 0; i < divs.length; i++){
				divs[i].style.color = "#404040";
			}
			var labels = document.getElementsByTagName("label");
			for (var i = 0; i < labels.length; i++){
				labels[i].style.color = "#404040";
			}
			var spans = document.getElementsByTagName("span");
			for (var i = 0; i < spans.length; i++){
				spans[i].style.color = "#ededed";
			}
			var textAreas = document.getElementsByTagName("textarea");
			for (var i = 0; i < textAreas.length; i++){
				textAreas[i].style.color = "#404040";
				textAreas[i].style.backgroundColor = "black";
			}
			var buttons = document.getElementsByTagName("button");
			for (var i = 0; i < buttons.length; i++){
				buttons[i].style.color = "#606060";
				buttons[i].style.backgroundColor = "#202020";
			}
			var tab = document.getElementsByClassName("tab");
			tab[0].style.backgroundColor = "#202020";
			var inputs = document.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++){
				inputs[i].style.color = "#606060";
				inputs[i].style.backgroundColor = "#202020";
			}

			document.querySelector(".resource-panel").style.backgroundColor = "black";
			document.querySelector("#pop_img").setAttribute("src", "resources/pop_light.png");


			dynamicCellsSetStyle();
		} else {
			var treasury_guard_darkmode = new Image;
			treasury_guard_darkmode.src = 'resources/knight6.png'
			document.getElementById("treasury_guard_div").innerHTML = "";
			document.getElementById("treasury_guard_div").appendChild(treasury_guard_darkmode);
			var b = document.getElementsByTagName("body");
			b[0].style.backgroundColor = "white";
			var divs = document.getElementsByTagName("div");
			for (var i = 0; i < divs.length; i++){
				divs[i].style.color = "black";
			}
			var labels = document.getElementsByTagName("label");
			for (var i = 0; i < labels.length; i++){
				labels[i].style.color = "black";
			}
			var spans = document.getElementsByTagName("span");
			for (var i = 0; i < spans.length; i++){
				spans[i].style.color = "black";
			}
			var textAreas = document.getElementsByTagName("textarea");
			for (var i = 0; i < textAreas.length; i++){
				textAreas[i].style.color = "black";
				textAreas[i].style.backgroundColor = "white";
			}
			var buttons = document.getElementsByTagName("button");
			for (var i = 0; i < buttons.length; i++){
				buttons[i].style.color = "black";
				buttons[i].style.backgroundColor = "#f1f1f1";
			}
			var tab = document.getElementsByClassName("tab");
			tab[0].style.backgroundColor = "#f1f1f1";
			var inputs = document.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++){
				inputs[i].style.color = "black";
				inputs[i].style.backgroundColor = "white";
			}

			document.querySelector(".resource-panel").style.backgroundColor = "#f1f1f1";
			document.querySelector("#pop_img").setAttribute("src", "resources/pop.png");

			dynamicCellsSetStyle();
		}
	}
function exportGame() {
	const tmpExportGame = JSON.parse(JSON.stringify(game)); // Some dummy copy of object;
	//prepareInventoryWriteSave(tmpExportGame);
	tmpExportGame.pops = [];
	tmpExportGame.budgets = [];
	tmpExportGame.years = [];
	const stringSavegame = JSON.stringify(tmpExportGame);
	document.getElementById("savestring").value = btoa(stringSavegame);
}
function exportGameDebug(){
	tmpExportGame = game;
	tmpExportGame.pops = [];
	tmpExportGame.budgets = [];
	tmpExportGame.years = [];
	stringSavegame = JSON.stringify(tmpExportGame);
	document.getElementById("savestring").value = (stringSavegame);
}
function importGame() {
	save64 = document.getElementById("savestring").value;
	if (save64 !== "" ) {
		try {
			console.log("we try to load the imported save");
			saveLine  = atob(save64);
			saveArray = saveLine.split(delimiter);
			const gameTemp  = JSON.parse(saveArray[0]);
			overrideGame(gameTemp);
		}
		catch(err) {
			postEventLog(locObj.loadGameFromStringError.txt,"bold,red");
			console.log(err);
		}
	} else {
		postEventLog(locObj.loadGameFromStringEmpty.txt,"bold");
	}
}
function cloudQuickSave(){
	const tmpExportGame = JSON.parse(JSON.stringify(game)); // Some dummy copy of object
	//prepareInventoryWriteSave(tmpExportGame);
	tmpExportGame.pops = [];
	tmpExportGame.budgets = [];
	tmpExportGame.years = [];
	const stringSavegame = JSON.stringify(tmpExportGame);
	save_to_cloud(btoa(stringSavegame));
}
