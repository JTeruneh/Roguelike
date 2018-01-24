export function utilAlert() {
  document.write("this is a util function<br/>");
}

export function expForLevel(lvl) {
  return 500 * (lvl * lvl) - 500 * lvl;
}

export function dist(pos1, pos2) {
  return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
}

export function dirToPoint(src, dest) {
  var xDiff = dest.x - src.x;
  var yDiff = dest.y - src.y;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    return { x: Math.sign(xDiff), y: 0 };
  } else {
    return { y: Math.sign(yDiff), x: 0 };
  }

  evtData.cancel = true;
}

export function init2DArray(x = 1, y = 1, initVal = "") {
  var a = [];
  for (var xdim = 0; xdim < x; xdim++) {
    a.push([]);
    for (var ydim = 0; ydim < y; ydim++) {
      a[xdim].push(initVal);
    }
  }
  return a;
}

let randStringCharSource = "abcdefghijklmnopqrstuvqxyz1234567890".split("");

export function randomString(len = 8) {
  var res = "";
  for (var i = 0; i < len; i++) {
    res += randStringCharSource.random();
  }
  return res;
}
