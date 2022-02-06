addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    prestiges: new Decimal(0),
    sacMult: new Decimal(1),
    sacFormula: new Decimal(0),
    }},
    tabFormat: [
    "main-display",
    "prestige-button",
    ["display-text", () => `You have ${format(player.points)} points<br><br>`],
    "clickables",
    () => hasUpgrade("p",24) ? ["display-text", `Sacrificing resets your buyables and does a prestige reset, but you will gain a sacrifice multiplier that boosts point production.<br>You have a total sacrifice multiplier of ${format(player.p.sacMult)}x`] : "",
    "buyables",
    ["display-text", () => `<br><br>`],
    "upgrades",
    ],
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("p",15)) mult = mult.mul(upgradeEffect("p",15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    onPrestige() {
      player.p.prestiges = player.p.prestiges.add(1)
    },
    layerShown(){return true},
    upgrades: {
      11: {
        title: "Start",
        description: "Produce 1 point per second.",
        cost: new Decimal(1),
      },
      12: {
        title: "Prestige Boost",
        description: "Gain more points based on total prestige points.",
        cost: new Decimal(1),
        unlocked(){return hasUpgrade("p",11)},
        effect(){return player.p.total.pow(0.5).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      13: {
        title: "Buyable!",
        description: "Unlock a buyable.",
        cost: new Decimal(5),
        unlocked(){return hasUpgrade("p",11)},
      },
      14: {
        title: "Self-Synergy",
        description: "Gain more points based on points.",
        cost: new Decimal(20),
        unlocked(){return hasUpgrade("p",13)},
        effect(){return player.points.pow(0.1).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      15: {
        title: "Reverse Boost",
        description: "Gain more prestige points based on points.",
        cost: new Decimal(75),
        unlocked(){return hasUpgrade("p",13)},
        effect(){return player.points.pow(0.2).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      21: {
        title: "Another Buyable",
        description: "Unlock a second buyable.",
        cost: new Decimal(100000),
        unlocked(){return hasUpgrade("p",15)},
      },
      22: {
        title: "Yet Another Buyable",
        description: "Unlock a third buyable.",
        cost: new Decimal(1e28),
        unlocked(){return getBuyableAmount("p",12) >= 20},
      },
      23: {
        title: "Flat Multiplier",
        description: "Gain 1,000x more points.",
        cost: new Decimal(1e31),
        unlocked(){return hasUpgrade("p",22)},
      },
      24: {
        title: "Sacrifice",
        description: "Unlock Sacrifice.",
        cost: new Decimal(3.4028e38),
        unlocked(){return hasUpgrade("p",22)},
      },
      25: {
        title: "Improved Sacrifice",
        description: "Sacrifice is more powerful (the formula is improved).",
        cost: new Decimal(6.2771e57),
        unlocked(){return hasUpgrade("p",24)},
      },
      31: {
        title: "A New Beginning",
        description: "Unlock Pointy Points.",
        cost: new Decimal(1.158e77),
        unlocked(){return hasUpgrade("p",25)},
      },
    },
    buyables: {
    11: {
        title: "Doubler",
        cost(x) { return getBuyableAmount(this.layer, this.id) >= 20 ? new Decimal(10).mul(new Decimal(3).pow(20)).mul(new Decimal(3).pow(new Decimal(x).sub(20)).pow(2.5)) : new Decimal(10).mul(new Decimal(3).pow(x)) },
        display() {return `Doubles point gain every time bought.\nTimes Bought: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())}\nEffect: ${format(this.effect())}x points`},
        canAfford() {return player.p.points.gte(this.cost())},
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasUpgrade("p",13)},
        effect(x) {
          mult2 = new Decimal(2).pow(x)
          return mult2
        },
    },
    12: {
        title: "Tripler",
        cost(x) { return getBuyableAmount(this.layer, this.id) >= 20 ? new Decimal(10000).mul(new Decimal(12).pow(20)).mul(new Decimal(12).pow(new Decimal(x).sub(20)).pow(2.5)) : new Decimal(10000).mul(new Decimal(12).pow(x)) },
        display() {return `Triples point gain every time bought.\nTimes Bought: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())}\nEffect: ${format(this.effect())}x points`},
        canAfford() {return player.p.points.gte(this.cost())},
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasUpgrade("p",21)},
        effect(x) {
          mult2 = new Decimal(3).pow(x)
          return mult2
        },
    },
    13: {
        title: "Quadrupler",
        cost(x) { return getBuyableAmount(this.layer, this.id) >= 20 ? new Decimal(1e25).mul(new Decimal(1e5).pow(20)).mul(new Decimal(1e5).pow(new Decimal(x).sub(20)).pow(2.5)) : new Decimal(1e25).mul(new Decimal(1e5).pow(x)) },
        display() {return `Quadruples point gain every time bought.\nTimes Bought: ${format(getBuyableAmount(this.layer, this.id))}\nCost: ${format(this.cost())}\nEffect: ${format(this.effect())}x points`},
        canAfford() {return player.p.points.gte(this.cost())},
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasUpgrade("p",22)},
        effect(x) {
          mult2 = new Decimal(4).pow(x)
          return mult2
        },
    },
},
    clickables: {
    11: {
        display() {return `Sacrifice for ${format(player.p.sacFormula)}x sacrifice multiplier`},
        onClick() {return sacrifice()},
        canClick() {return player.p.sacFormula.gte(1)},
        unlocked() {return hasUpgrade("p",24)}
    },
  },
    update(diff) {
      player.p.sacFormula = hasUpgrade("p",25) ? player.points.add(1).log(2).mul(16).mul(player.p.sacMult.root(1.75)).div(player.p.sacMult) : player.points.add(1).log(2).mul(16).mul(player.p.sacMult.cbrt()).div(player.p.sacMult);
      player.points = player.points.min(1.797e308)
    },
})

function sacrifice() {
  if(!hasAchievement("a",36)) {
    player.p.buyables[11] = new Decimal(0)
    player.p.buyables[12] = new Decimal(0)
    player.p.buyables[13] = new Decimal(0)
  }
  player.p.sacMult = player.p.sacMult.mul(player.p.sacFormula)
  player.points = new Decimal(0)
  doReset("p")
}

addLayer("pp", {
    name: "pointy points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: [
    "main-display",
    ["display-text", () => `By default, pointy points give a multiplier to point gain based on their amount.<br><br>`],
    "prestige-button",
    "upgrades",
    ],
    color: "#FFFF00",
    requires: new Decimal(1.158e77), // Can be a function that takes requirement increases into account
    resource: "pointy points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for pointy points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("p",31) || player.pp.total.gte(1) || player.i.total.gte(1)},
    branches: ["p"],
    upgrades: {
      11: {
        title: "Pointier Pointy Points!",
        description: "The pointy point effect is exponentiated by 1.2.",
        cost: new Decimal(1e9),
        unlocked(){return player.pp.total.gte(1e7)},
      },
    },
})

addLayer("i", {
    name: "infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    infinities: new Decimal(0),
    infinityTime: new Decimal(0),
    }},
    color: "#C46C00",
    requires: new Decimal(1.797e308), // Can be a function that takes requirement increases into account
    resource: "infinity points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for infinity points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    onPrestige() {
      player.i.infinities = player.i.infinities.add(1)
      player.i.infinityTime = new Decimal(0)
    },
    layerShown(){return player.points.eq(Infinity) || player.i.total.gte(1)},
    branches: ["pp"],
    update(diff) {
      player.i.infinityTime = player.i.infinityTime.add(diff)
    },
    upgrades: {
      11: {
        title: "Infinity Upgrade 11",
        description: "Gain a multiplier on points based on time played.",
        cost: new Decimal(1),
        effect(){return new Decimal(player.timePlayed).add(1).log10().add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      12: {
        title: "Infinity Upgrade 12",
        description: "Increase all individual multipliers by 0.2.",
        cost: new Decimal(1),
      },
      13: {
        title: "Infinity Upgrade 13",
        description: "Gain a multiplier on points based on time spent in the current infinity.",
        cost: new Decimal(3),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
        effect(){return player.i.infinityTime.pow(1.5).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      14: {
        title: "Infinity Upgrade 14",
        description: "Keep all pre-infinity upgrades on reset.",
        cost: new Decimal(10),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      21: {
        title: "Infinity Upgrade 21",
        description: "Add 0.3 to the mult per doubler.",
        cost: new Decimal(1),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      22: {
        title: "Infinity Upgrade 22",
        description: "Add 0.3 to the mult per tripler.",
        cost: new Decimal(1),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      23: {
        title: "Infinity Upgrade 23",
        description: "Gain a multiplier on points based on unspent Infinity Points.",
        cost: new Decimal(5),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
        effect(){return player.i.points.pow(5).add(1)},
        effectDisplay(){return `x${format(this.effect())}`}
      },
      24: {
        title: "Infinity Upgrade 24",
        description: "Keep the sacrifice multiplier when resetting for Pointy Points.",
        cost: new Decimal(10),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      31: {
        title: "Infinity Upgrade 31",
        description: "Add 0.3 to the mult per quadrupler.",
        cost: new Decimal(1),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      32: {
        title: "Infinity Upgrade 32",
        description: "Add an additional 0.1 to all individual multipliers.",
        cost: new Decimal(1),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      33: {
        title: "Infinity Upgrade 33",
        description: "Pointy Points are stronger.",
        cost: new Decimal(7),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      34: {
        title: "Infinity Upgrade 34",
        description: "Gain 100% of prestige point gain per second.",
        cost: new Decimal(15),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      41: {
        title: "Infinity Upgrade 41",
        description: "Gain 20x more pointy points.",
        cost: new Decimal(2),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      42: {
        title: "Infinity Upgrade 42",
        description: "<b>Self-Synergy</b> is more effective.",
        cost: new Decimal(2),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      43: {
        title: "Infinity Upgrade 43",
        description: "Generate infinity points based on your fastest infinity.",
        cost: new Decimal(10),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
      44: {
        title: "Infinity Upgrade 44",
        description: "Gain 100% of pointy point gain per second.",
        cost: new Decimal(20),
        unlocked(){return hasUpgrade("i",11) || hasUpgrade("i",12)},
      },
    },
})