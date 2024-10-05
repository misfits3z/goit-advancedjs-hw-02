import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "izitoast/dist/css/iziToast.css"; 
import icon from "../img/Group-2-2.svg";

let userSelectedDate = null;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.show({
        title: `<img src="${icon}" alt="icon" width="20" height="20" />`,
        message: "Please choose a date in the future",
        color: "#FF0000",
        messageColor: "#FFFFFF", 
        position: "topRight", 
        timeout: 2000, 
      });
      document.querySelector('button#start-timer-btn').disabled = true; 
    } else {
      document.querySelector('button#start-timer-btn').disabled = false; 
    }
  }
});

// Функція для форматування часу (додає нуль перед однією цифрою)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для підрахунку залишку часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

const startButton = document.querySelector('#start-timer-btn');
startButton.disabled = true;

const datetimePicker = document.querySelector('#datetime-picker');

let countdownInterval = null;


function startCountdown() {
  startButton.disabled = true; 
  datetimePicker.disabled = true; 

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      iziToast.show({
        title: "Info",
        titleColor: "#FFFFFF",
        message: "The countdown has ended!",
        color: "#0bd54b",
        messageColor: "#FFFFFF",  
        position: "topRight", 
        timeout: 3000, 
      });
      datetimePicker.disabled = false; 
      startButton.disabled = true; 
      return;
    }

    const time = convertMs(timeDifference);
    updateTimer(time);
  }, 1000);
}

//обробник подій для кнопки 
startButton.addEventListener('click', startCountdown);

 