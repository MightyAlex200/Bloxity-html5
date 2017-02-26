function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

isIntersecting = function(r1, r2) {

  return !(r2.x > (r1.x + r1.width) ||

             (r2.x + r2.width) < r1.x ||

             r2.y > (r1.y + r1.height) ||

             (r2.y + r2.height) < r1.y);

}
