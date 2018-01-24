import ROT from "rot-js";
import { DATA } from "./data.js";
import { mapFactory } from "./map.js";

export class Dungeon {
  constructor(size) {
    this.state = {};
    this.state.maps = [];
    this.state.size = size;

    for (var i = 0; i < size; i++) {
      this.state.maps.push(null);
    }
  }

  setSeed(seed) {
    this.state.seed = seed;
  }

  getSeed() {
    return this.state.seed;
  }

  toJSON() {
    return this.state;
  }
  /**
   * Gets a map object if it exists
   * Or generates it if it doesn't exist
   */
  getMap(n) {
    if (this.state.maps[n] != null) {
      return DATA.maps[this.state.maps[n]];
    }

    var map = mapFactory({});
    this.state.maps[n] = map.getId();
    map.populate(n);
    return map;
  }

  getSize() {
    return this.state.size;
  }
}
