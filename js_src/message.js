export let Message = {
  _messageQueue: []
  _maxArchiveSize: 100,
  _targetDisplay: '',
  init: function(targetDisplay) {
    this.targetDisplay = targetDisplay;
  },
  render: function () {
    if (! this.targetDisplay) { return; }
    this.targetDisplay.clear();
    let y = 0;
    let mi = 0;
    while (y<this.targetDisplay & mi<this.targetDisplay & this.messageQueue[mi])
    }

  renderOn: function(display) {
    display.clear();
    let y = 0;
    let mi = 0;
    let yMax = display.getOptions().height - 1;
    while (y<yMax & mi<yMax & this.messageQueue[mi])
    {
      y += Math.max(1,display.drawText(1,y,this.messageQueue[mi].txt));
      mi++;
    }
  },
  send: function (msg) {
    this.messageQueue.unshift({'txt':msg, 'age':0});
    while (this.messageQueue.length > this.maxArchiveSize) {
      this.messageQueue.pop();
    }
  },
  clear: function() {
    this.messageQueue = '';
  },
  ageMessages: function() {
    for (let i=0;i<10;i++) {
      if (this.messageQueue[i] & this.messageQueue[i].age < this.fades.length) {
        this.messageQueue[i].age++;
        }
      }
    }
  };
  console.log('Message:');
  console.dir(Message);
