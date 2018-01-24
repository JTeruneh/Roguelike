import * as E from "./entity_mixins.js";

export class Mixable {
  constructor(template) {
    if (!this.state) {
      this.state = {};
    }
    this.name = template.name || "";
    this.templateName = template.templateName
      ? template.templateName
      : this.name;

    this.mixins = [];
    this.mixinTracker = {};

    if (template.mixinNames) {
      for (let mi = 0; mi < template.mixinNames.length; mi++) {
        this.mixins.push(E[template.mixinNames[mi]]);
        this.mixinTracker[template.mixinNames[mi]] = true;
      }
    }

    for (let mi = 0; mi < this.mixins.length; mi++) {
      var m = this.mixins[mi];
      this.state[m.META.mixinName] = {};

      if (m.META.stateModel) {
        for (let sbase in m.META.stateModel) {
          this.state[m.META.mixinName][sbase] = m.META.stateModel[sbase];
        }
      }

      for (let method in m.METHODS) {
        this[method] = m.METHODS[method];
      }
    }

    for (let mi = 0; mi < this.mixins.length; mi++) {
      var m = this.mixins[mi];
      if (m.META.initialize) {
        m.META.initialize.call(this, template);
      }
    }
  }

  raiseMixinEvent(evtType, evtData) {
    for (let mi = 0; mi < this.mixins.length; mi++) {
      let m = this.mixins[mi];

      if (m.LISTENERS && m.LISTENERS[evtType]) {
        m.LISTENERS[evtType].call(this, evtData);
      }

      if (m.LISTENERS && m.LISTENERS["general"]) {
        m.LISTENERS["general"].call(this, evtData, evtType);
      }
    }
  }
}
