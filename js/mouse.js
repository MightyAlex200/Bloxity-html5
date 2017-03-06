document.mouse = {
  x: 0,
  y: 0,
  isDown: false
};
document.onmousemove = (e) => {
  document.mouse.x = ((e.clientX+1)/innerWidth)*app.stage.width;
  document.mouse.y = ((e.clientY+1)/innerHeight)*app.stage.height;
};

document.onmousedown = (e) => {
  document.mouse.isDown = true;
};

document.onmouseup = (e) => {
  document.mouse.isDown = false;
};
