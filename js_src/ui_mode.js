import ROT from 'rot-js';
import {Message} from './message.js';

//------
//------

class UIMode {
  constructor(gameRef) {
    this.mage = gameRef;
    this.display = this.game.getDisplay("main");
  }

  enter() {
    console.log('UIMode enter - ${this.constructor.name}');
  }
  exit() {
    console.log('UIMode exit - ${this.constructor.name}')
  }
  render() {
    console.log('UIMode render - ${this.constructor.name}');
  }
  renderAvatorOn(display) { return; }

}

export class PersistenceMode extends UIMode {
  render(display) {
    display.clear();
    display.drawText(33,2,"N for new game");
    display.drawText(33,3,"S to save game");
    display.drawText(33,4,"l to load game");
  }
handleInput(eventType, evt) {
  if (eventType == 'keyup') {
    console.dir(evt);
    if (evt.key == 'N' || evt.key == 'n') {
      console.log('new game');
      this.game.setupNewGame();
      return true;
    }
    if (evt.key == 'S' || evt.key == 's') {
      console.log('save game');
      this.game.switchMode('play');
      return true;
    }
    if (evt.key == 'L' || evt.key == 'l') {
      console.log('load game');
      return true
    }
  }
}
}

handleSave() {
  console.log('save gave');
  if (! this.localStorageAvailable()) { return false; }

  window.localStorage.setItem('weedstrikegame',JSON.stringify(this.game));
}

handleRestore() {
  console.log('load game');
  if (! this.localSotrageAvailable()) { return false; }

  let restorationString = window.localStorage.gotItem()
}
localSotrageAvailable() {
try {
  var x = '__storage test__';
  windows.localStorage.setItem(x, x);
}
}
