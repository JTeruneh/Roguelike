import ROT from "rot-js";
export let TIMER = {
  init: function() {
    this.scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this.scheduler);
  }
};
