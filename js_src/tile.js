// Provides class for individual map tiles

import {DisplaySymbol} from './display_symbol.js';

// ==========

class Tile extends DisplaySymbol{
  constructor(name,chr,fg,bg) {
    super(chr,fg,bg);
    this.name = name;
  }
}


export let TILES = {
  WALL: new Tile('wall', '#'),
  FLOOR: new Tile('floor', '.'),
  NULLTILE: new Tile('nulltile', 'M'),
}
