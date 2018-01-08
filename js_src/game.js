import * as U from './util.js';
import ROT from 'rot-js';
import {Message} from './message.js';

export let Game = {
  DISPLAY_SPACING: 1.1,
  display: {
    main: {
      W: 80,
      H: 24,
      O: null
    }
  }
init: function() {
  this._randomSeed = 5 + Math.floor(Math.random()*100000);
  //this._randomSeed = 76250;
  console.log("using random seed "+this._randomSeed);
  ROT.RNG.setSeed(this._randomSeed);

  this.display.main.o = new ROT.Display({
    width: this.display.main.w,
    height: this.display.main.h,
    spacing: this.display.SPACING});
},

getDisplay: function (displayId) {
  if (this.display.hasOwnProperty(displayId)) {
    return this.display[displayId].o;
  }
  return null;
},

render: function() {
  this.renderMain();
},

renderMain: function() {
  let d = this.display.main.o;
  for (let i = 0; i < 10; i++) {
    d.drawText(5,i+5,"hello world");
    }
  }







setupNewGame: function () {
  
}

































  toJSON: function () {
    let json = '';
    json = JSON.stringify(rseed: this._randomSeed);
    return json;
  }

  fromJSON: function () {
  console.log('game from json processing' +json);
  let state = JSON.parse(json);
  this._randomSeed = state.rseed;
  }

};
