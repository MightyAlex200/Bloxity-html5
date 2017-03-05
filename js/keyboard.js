document.keyboard = [];
document.keyboard.wasPressed = (keyCode)=>{
  let answer = document.keyboard[keyCode];
  document.keyboard[keyCode] = false;
  return answer;
};
document.onkeydown = (key) => {
  document.keyboard[key.keyCode] = true;
};

document.onkeyup = (key) => {
  document.keyboard[key.keyCode] = false;
};
