document.keyboard = [];

document.onkeydown = (key) => {
  document.keyboard[key.keyCode] = true;
};

document.onkeyup = (key) => {
  document.keyboard[key.keyCode] = false;
};
