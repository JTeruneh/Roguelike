export let MessageHandler = {
  queue: [],
  display: "",
  QUEUE_LENGTH: 6,
  init: function(display) {
    this.display = display;
  },

  render: function() {
    this.display.clear();
    for (var i = 0; i < this.queue.length; i++) {
      this.display.drawText(1, i, this.queue[i], "#fff", "#000");
    }
  },

  send: function(msg) {
    this.queue.push(msg);
    if (this.queue.length > this.QUEUE_LENGTH) {
      this.queue.shift();
    }
    this.render();
  },

  clear: function() {
    this.queue = [];
  }
};
