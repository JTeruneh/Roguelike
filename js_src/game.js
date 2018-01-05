import ROT from 'rot-js';
import * as U from './util.js';
import {Message} from './message.js';

export let Game = {
  messageHandler: Message,

  _DISPLAY_SPACING: 1,1
  _display: {
   main: {
     w: 80,
     h: 24,
     o: null
   },
   avatar: {
     w: 20,
     h: 24,
     o: null
   },
   message: {
     w: 100,
     h:6
     o: null
   }
 },

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

setupModes: function() {
  this.modes.startup = new StartupMode(this);
  this.modes.play = new PlayMode(this);
}

  switchMode: function(newModeName) {
    if (this.curmode)
  }
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
  if
//   let d = this.display.main.o;
//   for (let i = 0; i < 10; i++) {
//     d.drawText(5,i+5,"hello world");
//   }
// }
};














bindEvent: function(eventType) {
  window.addEventListener(eventType, (evt) {
    this.eventHandler(eventType, evt);
  });
},

eventHandler: function (eventType, evt) {
  // When an event is received have the current ui handle it
  if (this.curMode !== null && this._curMode != '') {
    if (this.curMode.handleInput(eventType, evt)) {
      this.render();
      Message.ageMessages();
    }
  }
}
