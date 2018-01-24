import ROT from "rot-js";
export let STAT_NAMES = ["Str", "Con", "Wis", "Dex", "Int", "Chr"];
export class Stats {
  constructor() {
    for (var i = 0; i < STAT_NAMES.length; i++) {
      this[STAT_NAMES[i]] = 10;
    }
  }

  randomize(level) {
    var level = level || 0;
    for (var i = 0; i < STAT_NAMES.length; i++) {
      this[STAT_NAMES[i]] = ROT.RNG.getUniformInt(7, 13 + level);
    }
  }

  getStat(statName) {
    return this[statName];
  }

  getModifier(statName) {
    var raw = this[statName];
    return Math.floor((raw - 10) / 2);
  }

  increaseStat(statName) {
    this[statName] += 1;
  }

  increaseStatBy(statName, amt) {
    this[statName] += amt;
  }

  decreaseStatBy(statName, amt) {
    this[statName] -= amt;
  }
}
