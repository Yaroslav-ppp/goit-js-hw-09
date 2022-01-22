import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  button: document.querySelector('[data-start]'),
  clockDays: document.querySelector('[data-days]'),
  clockHours: document.querySelector('[data-hours]'),
  clockMinutes: document.querySelector('[data-minutes]'),
  clockSeconds: document.querySelector('[data-seconds]'),
};

refs.button.disabled = true;
let choosenDate = 0;
// parameters from library
const options = {
  enableTime: true,
  time_24hr: true,
  // new Date() change to method Date.now() becuse we avoid this way new objects
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenDate = selectedDates[0].getTime();

    // choose conditions of button
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
      // in case if run yet timer and we choose date in past we get numbers with minus (bug)
      choosenDate = Date.now() + 1000;

      refs.button.disabled = true;
    } else if (selectedDates[0] > Date.now()) {
      refs.button.disabled = false;
    }
  },
};

refs.button.addEventListener('click', () => {
  timer.start();
});
// switch on options
flatpickr('#datetime-picker', options);
const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    refs.button.disabled = true;

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const deltaTime = choosenDate - Date.now();

      const { days, hours, minutes, seconds } = getTimeComponents(deltaTime);
      // stop timer
      if (choosenDate - 1000 < Date.now()) {
        clearInterval(this.intervalId);
        this.isActive = false;
      }

      updateClock({ days, hours, minutes, seconds });
    }, 1000);
  },
};
// getting time in units
function getTimeComponents(deltaTime) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(deltaTime / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((deltaTime % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((deltaTime % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((deltaTime % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

//   add a symbol '0' if exist only one in first position
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.clockDays.textContent = `${days}`;
  refs.clockHours.textContent = `${hours}`;
  refs.clockMinutes.textContent = `${minutes}`;
  refs.clockSeconds.textContent = `${seconds}`;
}
