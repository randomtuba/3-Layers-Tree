let modInfo = {
	name: "The 3 Layers Tree",
	id: "3layerstree",
	author: "randomtuba",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Initial Release",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v0.1: Initial Release</h3><br>
		- Added points, prestige, and pointy points.<br>
		- Added 11 Prestige Upgrades (and one special upgrade!).<br>
    - Added 3 buyables.<br>
    - Added a definitely-not-unoriginal mechanic (Sacrifice).<br>
    - Added 3 rows of achievements (18 total, some not possible yet).<br>
    - Added a Statistics tab!<br>
    `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
  if(hasUpgrade("p",11)) gain = gain.add(1)
  if(hasUpgrade("p",12)) gain = gain.mul(upgradeEffect("p",12))
  gain = gain.mul(buyableEffect("p",11)).mul(buyableEffect("p",12)).mul(buyableEffect("p",13))
  if(hasUpgrade("p",14)) gain = gain.mul(upgradeEffect("p",14))
  if(hasUpgrade("p",23)) gain = gain.mul(1000)
  gain = gain.mul(player.p.sacMult)
  if(hasAchievement("a",22)) gain = gain.mul(1.5)
  gain = gain.mul(hasUpgrade("pp",11) ? player.pp.points.pow(1.1).add(1) : player.pp.points.add(1))
  if(hasUpgrade("i",11)) gain = gain.mul(upgradeEffect("i",11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1.797e308"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}