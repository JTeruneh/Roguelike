export let DAZED = {
  getColor() {
    return "#D3D3D3";
  },
  getPriority() {
    return 2;
  },
  LISTENERS: {},
  act() {},
  inflict(target) {},
  remove(target) {}
};

export let DAZZLED = {
  getColor() {
    return "#FF69B4";
  },
  getPriority() {
    return 5;
  },
  LISTENERS: {},
  act() {
    this.raiseMixinEvent("act");
  },
  inflict(target) {
    if (target.hasOwnProperty("getStats")) {
      target.getStats().decreaseStatBy("Str", 5);
    }
  },
  remove(target) {
    if (target.hasOwnProperty("getStats")) {
      target.getStats().increaseStatBy("Str", 5);
    }
  }
};
