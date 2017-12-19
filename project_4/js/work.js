var clock = [];

clock.push(document.querySelector('#seconds > *'));
clock.push(document.querySelector('#minutes > *'));
clock.push(document.querySelector('#hours > *'));

var x = 100;
var y = 100;

function time(z){
    return [z, x, y].join(' ');
}

var day = new Date();
var secArm = 360 * day.getSeconds() / 60;
var minArm = 360 * day.getMinutes() / 60;
var hourArm = 360 * day.getHours() / 12 + day.getMinutes() / 2;

clock[0].setAttribute('from', time(secArm));
clock[0].setAttribute('to', time(secArm + 360));
clock[1].setAttribute('from', time(minArm));
clock[1].setAttribute('to', time(minArm + 360));
clock[2].setAttribute('from', time(hourArm));
clock[2].setAttribute('to', time(hourArm + 360));

for(var a = 1; a <= 12; a++) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  el.setAttribute('x1', '100');
  el.setAttribute('y1', '30');
  el.setAttribute('x2', '100');
  el.setAttribute('y2', '40');
  el.setAttribute('transform', 'rotate(' + (a*360/12) + ' 100 100)');
  el.setAttribute('style', 'stroke: #fff;','stroke-width:3px;');
  document.querySelector('svg').appendChild(el);
}