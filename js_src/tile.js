import { Symbol } from "./symbol.js";

export class Tile {
  constructor(template) {
    this.name = template.name || " ";
    this.passable = template.passable || false;
    this.symbol = template.symbol || new Symbol(" ");
  }

  drawOn(display, x, y) {
    this.symbol.drawOn(display, x, y);
  }

  isPassable() {
    return this.passable;
  }
}

export let TILES = {
  EMPTY: new Tile({ name: "EMPTY", symbol: new Symbol("."), passable: true }),
  WALLS: new Tile({ name: "WALLS", symbol: new Symbol("█"), passable: false }),
  STAIRS: new Tile({
    name: "STAIRS",
    symbol: new Symbol("\u220F"),
    passable: true
  }),
  NULL: new Tile({ name: "NULL", symbol: new Symbol(" "), passable: false })
};
