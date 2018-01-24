import ROT from "rot-js";
import { TILES } from "./tile.js";
import * as d from "./data.js";
import { TIMER } from "./timing.js";
import { EntityFactory } from "./entities.js";
import { Game } from "./game.js";
import { init2DArray, randomString } from "./util.js";

class Map {
  constructor(w, h, type = "basic") {
    this.attr = {};
    this.attr.w = w;
    this.attr.h = h;
    this.attr.type = type;
    this.attr.id = this.uid();
    this.attr.isBuilt = false;
    this.attr.seed = ROT.RNG.getState();
    this.attr.entityIdToMapPos = {};
    this.attr.mapPosToEntityId = {};
  }

  uid() {
    return "map: " + randomString() + d.DATA.nextMapId++;
  }

  isBuilt() {
    return this.attr.isBuilt;
  }

  getWidth() {
    return this.attr.w;
  }
  getHeight() {
    return this.attr.w;
  }
  setWidth(w) {
    this.attr.w = w;
  }
  setHeight(h) {
    this.attr.h = h;
  }

  getId() {
    return this.attr.id;
  }
  setId(id) {
    this.attr.id = id;
  }

  getType() {
    return this.attr.type;
  }
  setType(t) {
    this.attr.type = t;
  }

  getSeed() {
    return this.attr.seed;
  }
  setSeed(seed) {
    this.attr.seed = seed;
  }

  //Entity mapping codes

  getEntityAt(pos) {
    return this.attr.mapPosToEntityId[pos.x + "," + pos.y];
  }

  getEntityObjectAt(pos) {
    if (this.getEntityAt(pos) == undefined) {
      return null;
    }
    return d.DATA.getEntityFromId(this.getEntityAt(pos));
  }

  getEntitiesOfType(name) {
    var r = [];
    var entities = this.getAllEntities();

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (entity.getTypeName() == name) {
        r.push(entity);
      }
    }
    return r;
  }

  setEntityAt(entityid, pos) {
    this.attr.mapPosToEntityId[pos.x + "," + pos.y] = entityid;
  }

  deleteEntityAt(pos) {
    delete this.attr.mapPosToEntityId[pos.x + "," + pos.y];
  }

  removeEntity(entity) {
    this.deleteEntityAt(entity.getPos());
    delete this.attr.entityIdToMapPos[entity.getId()];
  }

  moveEntityTo(entityid, oldPos, newPos) {
    this.deleteEntityAt(oldPos);
    this.setEntityAt(entityid, newPos);
    this.attr.entityIdToMapPos[entityid] = newPos;
  }

  getAllEntities() {
    var r = [];
    for (var eid in this.attr.entityIdToMapPos) {
      r.push(d.DATA.entities[eid]);
    }

    return r;
  }

  addEntityAt(entity, pos) {
    this.attr.entityIdToMapPos[entity.getId()] = pos;
    this.setEntityAt(entity.getId(), pos);
    entity.setMapId(this.getId());
    entity.setPos(pos);
    TIMER.scheduler.add(entity, true);
  }

  addEntityAtRandomPos(entity) {
    this.addEntityAt(entity, this.getRandomEmptyPointInRoom());
  }

  spawnEntityAt(templateName, pos) {
    this.addEntityAt(EntityFactory.create(templateName), pos);
  }

  toJSON() {
    return this.attr;
  }

  restoreFromState(json) {
    this.attr = JSON.parse(json);
  }

  inBounds(p) {
    return p.x >= 0 && p.x < this.attr.w && p.y >= 0 && p.y < this.attr.h;
  }

  getTile(p) {
    if (!this.inBounds(p)) {
      return TILES.NULL;
    }
    return this.tg[p.x][p.y];
  }

  drawOn(display, camX, camY) {
    let o = display.getOptions();

    let xStart = camX - Math.round(o.width / 2);
    let yStart = camY - Math.round(o.height / 2);

    for (let iw = 0; iw < o.width; iw++) {
      for (let ih = 0; ih < o.height; ih++) {
        let pos = { x: iw + xStart, y: ih + yStart };
        if (this.getEntityAt(pos)) {
          d.DATA.entities[this.getEntityAt(pos)].render(display, iw, ih);
        } else {
          this.getTile(pos).drawOn(display, iw, ih);
        }
      }
    }
  }

  isTilePassable(p) {
    return this.getTile(p).isPassable();
  }

  getRandomPointInRoom() {
    var rooms = this.o.getRooms();
    var room = rooms[ROT.RNG.getUniformInt(0, rooms.length - 1)];
    var xLoc = ROT.RNG.getUniformInt(room.getLeft(), room.getRight());
    var yLoc = ROT.RNG.getUniformInt(room.getBottom(), room.getTop());
    return { x: xLoc, y: yLoc };
  }

  getRandomEmptyPointInRoom() {
    do {
      var rooms = this.o.getRooms();
      var room = rooms[ROT.RNG.getUniformInt(0, rooms.length - 1)];
      var xLoc = ROT.RNG.getUniformInt(room.getLeft(), room.getRight());
      var yLoc = ROT.RNG.getUniformInt(room.getBottom(), room.getTop());
      var position = { x: xLoc, y: yLoc };
    } while (this.getEntityAt(position) != undefined);
    return position;
  }

  getRandomEmptyPointWithinCircle(centerPos, radius) {
    do {
      var xOffset = ROT.RNG.getUniformInt(-radius, radius);
      var yOffset = ROT.RNG.getUniformInt(-radius, radius);
      var position = { x: centerPos.x + xOffset, y: centerPos.y + yOffset };
    } while (
      this.getEntityAt(position) != undefined ||
      !this.isTilePassable(position) ||
      xOffset * xOffset + yOffset * yOffset > radius * radius
    );
    return position;
  }

  populate() {
    for (var i = 0; i < 3; i++) {
      this.addEntityAtRandomPos(EntityFactory.create("traveler"));
    }
    for (var i = 0; i < 3; i++) {
      this.addEntityAtRandomPos(EntityFactory.create("rat"));
    }
    for (var i = 0; i < 2; i++) {
    this.addEntityAtRandomPos(EntityFactory.create("witch"));
    }
    for (var i = 0; i < 1; i++) {
    this.addEntityAtRandomPos(EntityFactory.create("Mad Prince Ulrich"));
    }
  };

  build() {
    var options = {
      roomWidth: [8, 15] /* room minimum and maximum width */,
      roomHeight: [8, 15] /* room minimum and maximum height */,
      corridorLength: [10, 20] /* corridor minimum and maximum length */,
      dugPercentage: 0.4 /* we stop after this percentage of level area has been dug out */,
      timeLimit: 10000 /* we stop after this much time has passed (msec) */
    };

    var oldSeed = ROT.RNG.getState();
    ROT.RNG.setState(this.getSeed());

    this.tg = init2DArray(this.getWidth(), this.getHeight());
    this.o = new ROT.Map.Digger(this.getWidth(), this.getHeight(), options);
    var f = function(x, y, t) {
      this.tg[x][y] = t ? TILES.WALLS : TILES.EMPTY;
    };
    this.o.create(f.bind(this));
    let p = this.getRandomPointInRoom();

    this.tg[p.x][p.y] = TILES.STAIRS;

    this.attr.isBuilt = true;
    ROT.RNG.setState(oldSeed);
  }
}

export function mapFactory(mapData) {
  let m = new Map(50, 50);

  if (mapData.w) {
    m.setWidth(mapData.w);
  }
  if (mapData.h) {
    m.setHeight(mapData.h);
  }
  if (mapData.type) {
    m.setType(mapData.type);
  }
  if (mapData.id) {
    m.setId(mapData.id);
  }
  if (mapData.isBuilt) {
    m.attr.isBuilt = mapData.isBuilt;
  }
  if (mapData.seed) {
    m.setSeed(mapData.seed);
  }

  m.build();

  d.DATA.maps[m.getId()] = m;
  return m;
}
