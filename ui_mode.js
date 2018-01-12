// Contains all the text in the user interface

import ROT from 'rot-js';
import {Game} from './game.js';
import {MapMaker} from './map.js';
import {Message} from './message.js';
import {DisplaySymbol} from './display_symbol';
import {DATASTORE, clearDatastore} from './datastore.js';

// =========

class UIMode {
  constructor(thegame) {
    console.log("created "+this.constructor.name);
    this.game = thegame;
  }

  enter() {
    console.log("entered "+this.constructor.name);
  } //do something when entering this state
  exit() {
    console.log("exitted "+this.constructor.name);
  } //do something when leaving this state
  handleInput(eventType, evt) {
    console.log("handling input for "+this.constructor.name);
    console.log(`event type is ${eventType}`);
    console.dir(evt);
    return false;
  } //take input from user / player
  render(display) {
    console.log("rendering "+this.constructor.name);
    display.drawText(2,2,"rendering "+this.constructor.name);
  } //render
}

// =========

export class StartupMode extends UIMode {

  render(display) {
    display.drawText(2,3,"Euonumon presents . . .");
    display.drawText(36,8, "THE  TOMB");
    display.drawText(39,12, "OF");
    display.drawText(36,16, "THE  SWORD");
    display.drawText(6,22,"Enter using any key . . .");
  }

  handleInput(eventType, evt) {
    if (eventType == "keyup") {
      console.dir(this);
      this.game.switchMode('persistence');
      return true;
    }
  }
}

// =========

export class PersistenceMode extends UIMode {

  enter() {
    super.enter();
    if (window.localStorage.getItem("TTotS")){
      this.game.hasSaved = true;
    }
  }

  render(display) {
    display.clear();
    display.drawText(33,2,"Press N to wake up. . .");
    display.drawText(33,3,"Press S to pray for escape . . .");
    display.drawText(33,4,"Prese L to recall your prayers . . .");
  }

  handleInput(inputType,inputData) {
    if (inputType == 'keyup') {
      if (inputData.key == 'n' || inputData.key == 'N') {
        console.log('new game');
        this.game.startNewGame();
        this.game.switchMode('play');
        return true;
      }
      if (inputData.key == 's' || inputData.key == 'S') {
        this.handleSave();
        return true;
      }
      if (inputData.key == 'l' || inputData.key == 'L') {
        this.handleRestore();
        this.game.switchMode('play');
        return true;
      }
      if (inputData.key == 'Escape'){
        this.game.switchMode('play');
        return true;
      }

    }
    return false;
  }

  handleSave(){
   console.log('save game');
   if (!this.localStorageAvailable()) {return;}
   console.dir(DATASTORE);
   window.localStorage.setItem('TTotS', JSON.stringify(DATASTORE));
   this.game.hasSaved = true;
   console.log("done saving");
   this.game.switchMode('play');
 }
  handleRestore(){
    console.log('load game');
    if (!this.localStorageAvailable()) {return;}
    let restorationString = window.localStorage.getItem('TTotS');
    this.game.fromJSON(restorationString);
    clearDatastore();
    DATASTORE.GAME = this.game;
    DATASTORE.ID_SEQ = state.ID_SEQ
    console.dir(state);

    console.log("state.maps looks like");
    console.dir(state.MAPS);

    for (let mapid in state.MAPS) {
      MapMaker(JSON.parse(state.MAPS[mapid]));
    }

    this.game.fromJSON(state.GAME);
    console.log('post-save datastore:');
    console.dir(DATASTORE);
    this.game.switchMode('play');
}

  localStorageAvailable() {
    // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    try {
      var x = '__storage_test__';
      window.localStorage.setItem(x,x);
      window.localStorage.removeItem(x);
      return true;
    }
    catch(e) {
      Message.send('Sorry, no local data storage is available for this browser so game save/load is not possible');
      return false;
    }
  }

}

// =========

export class PlayMode extends UIMode {

  enter() {
    if(! this.map) {
      this.map = MapMaker(80,40);
    }
    this.camerax = 5;
    this.cameray = 8;
    this.cameraSymbol = new DisplaySymbol('@', '#eb4');
  }

  render(display){
    display.clear();
    display.drawText(33,4,"GAME IN PROGRESS");
    display.drawText(33,5,"PRESS W TO WIN, L TO LOSE");
    this.map.render(display, this.camerax, this.cameray);
    this.cameraSymbol.render(display, display.getOptions().width / 2, display.getOptions().height / 2);
  }

  handleInput(eventType, evt) {
    if (evt.key == 'l') {
      console.dir(this);
      this.game.switchMode('lose');
      return true;
    }
    if (evt.key == 'w') {
      console.dir(this);
      this.game.switchMode('win');
      return true;
    }
    if (evt.key == 'Escape' && eventType == 'keyup'){
      this.game.switchMode('persistence');
      return true;
    }

// =========

    console.dir(evt);
    if (evt.key == '7' && eventType == 'keydown') {
      this.moveCamera(-1, -1);
      return true;
    }

    console.dir(evt);
    if (evt.key == '8' && eventType == 'keydown') {
      this.moveCamera(0, -1);
      return true;
    }

    console.dir(evt);
    if (evt.key == '9' && eventType == 'keydown') {
      this.moveCamera(1, -1);
      return true;
    }

    console.dir(evt);
    if (evt.key == '4' && eventType == 'keydown') {
      this.moveCamera(-1, 0);
      return true;
    }

    console.dir(evt);
    if (evt.key == '6' && eventType == 'keydown') {
      this.moveCamera(1, 0);
      return true;
    }

    console.dir(evt);
    if (evt.key == '1' && eventType == 'keydown') {
      this.moveCamera(-1, 1);
      return true;
    }

    console.dir(evt);
    if (evt.key == '2' && eventType == 'keydown') {
      this.moveCamera(0, 1);
      return true;
    }

    console.dir(evt);
    if (evt.key == '3' && eventType == 'keydown') {
      this.moveCamera(1, 1);
      return true;
    }
  }

  // =========

  moveCamera(x,y) {
      console.log(x + y);
      this.camerax += x;
      this.cameray += y;
  }
}

// =========

export class UIModeMessages extends UIMode {
  render() {
    Message.renderOn(this.display);
  }

  handleInput(inputType,inputData) {
    if (inputType == 'keyup') {
      if (inputData.key == 'Escape') {
        if (this.game.isPlaying) {
          this.game.switchMode('play');
        }
      }
      return false;
    }
  }
}

// =========

export class LoseMode extends UIMode {

  render(display){
    display.clear();
    display.drawText(33,4,"Eh, you missed, pal!");
    Message.send("A strange game: the only way to win is to not play.");
  }
  handleInput(eventType, evt) {
    if (evt.key == 'Escape' && eventType == 'keyup'){
      this.game.switchMode('persistence');
      return true;
    }
  }
}

// =========

export class WinMode extends UIMode {

  render(display){
    display.clear();
    display.drawText(33,4,"CONGRATULATIONS!");
    Message.send("To the victor goes the spoils.");
  }

  handleInput(eventType, evt) {
    if (evt.key == 'Escape' && eventType == 'keyup'){
      this.game.switchMode('persistence');
      return true;
    }
  }
}
