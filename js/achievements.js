addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#FFFF00",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tooltip:"Achievements",
    resource: "joemama", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
tabFormat: [
    ["display-text", () => `You have ${player.a.achievements.length} achievements<br><br>`],
    //(${format(new Decimal(player.a.achievements.length).div(45).mul(100))}%)
    "achievements"
],
    layerShown(){return true},
  achievements: {
    11: {
        name: "All that progress is gone!",
      done(){return player.p.points.gte(1)},
      tooltip:"Perform a Prestige reset."
    },
    12: {
        name: "Point Hog",
      done(){return player.points.gte(100)},
      tooltip:"Reach 100 points."
    },
    13: {
        name: "Max All when?",
      done(){return hasUpgrade("p",13)},
      tooltip:"Unlock a buyable."
    },
    14: {
        name: "Yeah, science!",
      done(){return hasUpgrade("p",14) && hasUpgrade("p",15)},
      tooltip:"Buy 5 Prestige Upgrades."
    },
    15: {
        name: "Time and Time Again",
      done(){return player.p.prestiges.gte(100)},
      tooltip:"Prestige 100 times."
    },
    16: {
        name: "Prestige^2",
      done(){return player.p.points.gte(1e6)},
      tooltip:"Reach 1,000,000 prestige points."
    },
    21: {
        name: "The Second Layer",
      done(){return player.i.points.gte(1)},
      tooltip:"Perform an Infinity reset."
    },
    22: {
        name: "That's a lot!",
      done(){return player.points.gte(1e50)},
      tooltip:"Reach over 1e50 points. Reward: Gain 1.5x more points."
    },
    23: {
        name: "Perfectly Balanced",
      done(){return getBuyableAmount("p",13) >= 1},
      tooltip:"Buy one of each buyable."
    },
    24: {
        name: "Spiky currency",
      done(){return player.pp.points.gte(1)},
      tooltip:"Obtain a Pointy Point."
    },
    25: {
        name: "Blood for the blood god",
      done(){return player.p.sacMult.gt(1)},
      tooltip:"Sacrifice at least once."
    },
    26: {
        name: "Do you enjoy pain?",
      done(){return player.points.gte(1e150) && getBuyableAmount("p",12) == 0 && player.p.sacMult.eq(1)},
      tooltip:"Reach 1e150 points without having Triplers and without sacrificing."
    },
    31: {
        name: "GAS GAS GAS",
      done(){return getPointGen().gte(1e30)},
      tooltip:"Get over 1e30 points per second."
    },
    32: {
        name: "The Gods are pleased",
      done(){return player.p.sacMult.gte(1e9)},
      tooltip:"Have at least a 1e9x sacrifice multiplier."
    },
    33: {
        name: "That's a lot of infinities",
      done(){return player.i.infinities.gte(10)},
      tooltip:"Infinity 10 times. Reward: Double infinity point gain."
    },
    34: {
        name: "You didn't need them anyway",
      done(){return player.points.eq(1.797e308) && getBuyableAmount("p",11) == 0},
      tooltip:"Reach 1.797e308 points without having Doublers."
    },
    35: {
        name: "That's fast!",
      done(){return player.points.eq(1.797e308) && player.i.infinityTime.lt(1800)},
      tooltip:"Reach 1.797e308 points in under 30 minutes."
    },
    36: {
        name: "Atheist",
      done(){return player.points.gte(1e200) && player.p.sacMult.eq(1)},
      tooltip:"Reach 1e200 points without sacrificing. Reward: Sacrifice no longer resets prestige buyables."
    },
  },
})

addLayer("st", {
    name: "statistics", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ST", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#FFFFFF",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tooltip:"Statistics",
    resource: "joemama2", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
tabFormat: [
    // ["display-text", () => `You have ${player.a.achievements.length}/45 achievements (${format(new Decimal(player.a.achievements.length).div(45).mul(100))}%)<br>`],
    ["display-text", () => `You have prestiged ${player.p.prestiges} times.<br>You have bought ${player.p.upgrades.length} Prestige Upgrades.<br>You have played this game for ${format(player.timePlayed)} seconds.`],
    () => player.i.infinities.gte(1) ? ["display-text", `<br><br>You have ${player.i.infinities} infinities.<br>You have spent ${format(player.i.infinityTime)} seconds in this infinity.`] : "",
],
    layerShown(){return true},
})