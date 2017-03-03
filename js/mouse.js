document.mouse = {
  x: 0,
  y: 0,
  isDown: false
};
document.onmousemove = (e) => {
  document.mouse.x = e.clientX - app.view.getBoundingClientRect().left;
  document.mouse.y = e.clientY - app.view.getBoundingClientRect().top;
};

document.onmousedown = (e) => {
  document.mouse.isDown = true;
};

document.onmouseup = (e) => {
  document.mouse.isDown = false;
};
