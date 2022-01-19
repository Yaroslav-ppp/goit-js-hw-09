const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(function onChangeColor() {
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    const color = getRandomHexColor();
    document.body.style.background = color;
  }, 1000);
  refs.startBtn.disabled = true;
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  refs.startBtn.disabled = false;
});
