/**
 * [DATA The datastore file. Stores and handles persistence of universal game state]
 * @type {Object}
 */
import { MessageHandler } from "./msg.js";
import { mapFactory } from "./map.js";
import { Entity } from "./entity.js";
import { EntityFactory } from "./entities.js";
import { Game } from "./game.js";
import { Dungeon } from "./dungeon.js";
export let DATA = {
  /**
   * Resets/initializes stored values
   * @return {[type]} [description]
   */
  clear: function() {
    this.state = {};
    this.state.level = 0;
    this.state.cameraLocation = { x: 0, y: 0 };
    this.state.nextMapId = 1;
    this.state.nextEntityId = 1;
    this.maps = {};
    this.entities = {};
    this.state.currentMapId = "";
    this.state.avatarId = "";
    this.state.castTarget = null;
    this.state.spells = {};
    this.state.dungeonLevel = 1;

    this.dungeon = {};
  },

  /**
   * Gets an entity from an entity id string
   * @param  {String} eid [An entity id string]
   * @return {Entity}     [Matching Entity]
   */
  getEntityFromId: function(eid) {
    return this.entities[eid];
  },

  /**
   * Universal access to avatar object
   * @return {Entity} [Avatar object]
   */
  getAvatar: function() {
    return this.getEntityFromId(this.state.avatarId);
  },

  /**
   * Init function
   * Currently a simple delegate to this.clear
   */
  init: function() {
    this.clear();
  },

  /**
   * Gets the map currently in use
   * @return {Map} [The map in use]
   */
  currentMap: function() {
    return this.maps[this.state.currentMapId];
  },

  /**
   * Stringifies this object and saves to local storage
   */
  handleSave: function() {
    if (!localStorageAvailable()) {
      return;
    }

    window.localStorage.setItem(Game.SAVE_LOCATION, JSON.stringify(this));
  }
};

/**
 *  Reads JSON string from local storage and reloads state
 *  Workhorse of persistence
 */
export function handleLoad() {
  let saved = JSON.parse(window.localStorage.getItem(Game.SAVE_LOCATION));

  DATA.clear();

  DATA.state = saved.state;

  for (var mapid in saved.maps) {
    if (!saved.maps.hasOwnProperty(mapid)) continue;
    DATA.state[mapid] = mapFactory(saved.maps[mapid]);
  }

  for (var entityId in saved.entities) {
    var entity = EntityFactory.create(saved.entities[entityId].templateName);
    entity.state = saved.entities[entityId].state;
    DATA.state[entityId] = entity;

    //Readd to the map;
    entity.getMap().addEntityAt(entity, entity.getPos());
  }

  DATA.game.modes.play.avatarId = saved.avatarId;

  DATA.game.modes.play.avatar = DATA.entities[saved.avatarId];

  DATA.dungeon = new Dungeon(0);
  DATA.dungeon.state = saved.dungeon;
}

/**
 * Helper method to test local storage
 * @return {boolean} [true iff local storage is available]
 */
function localStorageAvailable() {
  // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  try {
    var x = "__storage_test__";
    window.localStorage.setItem(x, x);
    window.localStorage.removeItem(x);
    return true;
  } catch (e) {
    MessageHandler.send(
      "Sorry, no local data storage is available for this browser so game save/load is not possible"
    );
    return false;
  }
}
