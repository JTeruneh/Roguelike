import {Color} from './color.js';

// ==========

export class DisplaySymbol {
  constructor(chr, fg, bg) {
    this.chr = chr || ' ';
    this.fg = fg || '#fff';
    this.bg = bg || '#000';
  }

  render(display,console_x,console_y) {
    display.draw(console_x, console_y, this.char, this.fg, this.bg);
  }
}
