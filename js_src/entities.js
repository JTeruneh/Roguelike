/**
 * A list of entity templates
 * Exports an EntityFactory with all the tempaltes learned
 */
import { Entity } from "./entity.js";
import { Factory } from "./factory.js";
import { Symbol } from "./symbol.js";

export let EntityFactory = new Factory(Entity, "entities");

EntityFactory.learn({
  name: "avatar",
  symbol: new Symbol("@", "#dd4"),
  mixinNames: [
    "TimeTracker",
    "CorporealMover",
    "HitPoints",
    "StatsMixin",
    "RandomizedStats",
    "AvatarMixin",
    "MeeleeAttacker",
    "Logger",
    "PlayerActor"
  ],
  meeleeAttack: 2,
  maxHp: 20
});

EntityFactory.learn({
  name: "traveler",
  symbol: new Symbol("T", "#4f4"),
  mixinNames: ["CorporealMover", "Wander", "Likes"],
  likes: ["sound"]
});

EntityFactory.learn({
  name: "witch",
  symbol: new Symbol("W", "#006400"),
  mixinNames: [
    "CorporealMover",
    "Wander",
    "HitPoints",
    "Spawner",
    "StatusAffected",
    "Likes"
  ],
  likes: ["sound"],
  spawnFrequency: 3
});

EntityFactory.learn({
  name: "light",
  symbol: new Symbol("L", "#FFFF33"),
  mixinNames: ["Overwalkable", "Vanishing"]
});

EntityFactory.learn({
  name: "sound",
  symbol: new Symbol("S", "#FFFF33"),
  mixinNames: ["Overwalkable"]
});

EntityFactory.learn({
  name: "rat",
  symbol: new Symbol("R", "#808080"),
  mixinNames: [
    "CorporealMover",
    "WanderAttackNearby",
    "HitPoints",
    "StatsMixin",
    "RandomizedStats",
    "MeeleeAttacker",
    "DropsExp",
    "Fears",
    "StatusAffected"
  ],
  fears: ["light"],
  friendlyTypes: ["witch"],
  spawnFrequency: 3,
  statLevel: 5,
  maxHp: 4
});

EntityFactory.learn({
  name: "Mad Prince Ulrich",
  symbol: new Symbol("P", "#6C13A4"),
  mixinNames: [
    "CorporealMover",
    "Wander",
    "HitPoints",
    "Spawner",
    "StatusAffected",
    "Likes"
  ],
  spawnFrequency: 1,
  meeleeAttack: 444,
  maxHp:1000
});
