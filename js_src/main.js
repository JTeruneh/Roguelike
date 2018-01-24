import 'babel-polyfill';
import ROT from 'rot-js';
import {Game} from './game.js';

window.onload = function() {
  // Check if rot.js can work on this browser
  if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
    return;
  }

  Game.init();

  // Add the containers to our HTML page
  document.getElementById('avatar-display').appendChild(Game.getDisplay('avatar').getContainer());
  document.getElementById('log-display').appendChild(Game.getDisplay('log').getContainer());
  document.getElementById('main-display').appendChild(Game.getDisplay('main').getContainer());

  Game.render();

  Game.bindEvent("keydown");
  Game.bindEvent("keyup");
  Game.bindEvent("keypress");
};
