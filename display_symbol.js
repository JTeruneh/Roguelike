  // Where the symbols for entities are held

import {Color} from './colors.js'

  // ==========

export class DisplaySymbol {
   constructor(chr, fg, bg) {
     this.chr = chr || ' ';
     this.fg = fg || Color.FG;
     this.bg = bg || Color.BG;
   }

     // ==========

  render(display, console_x, console_y){
    display.draw(console_x, console_y, this.chr, this.fg, this.bg);
  }
}
