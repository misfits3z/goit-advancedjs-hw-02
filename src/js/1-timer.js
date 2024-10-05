// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
let userSelectedDate;


flatpickr("#datetime-picker", {
  enableTime: true,             
  time_24hr: true,              
  defaultDate: new Date(),       
  minuteIncrement: 1,           
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 
    
    // Перевіряємо, чи обрана дата не в минулому
    if (userSelectedDate < new Date()) {
      window.alert("Please choose a date in the future"); // Попередження для користувача
      document.querySelector('button[start-timer-btn]').disabled = true; // Деактивуємо кнопку
    } else {
      document.querySelector('button[start-timer-btn]').disabled = false; // Активуємо кнопку
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
  
  // Функція для оновлення інтерфейсу таймера
function updateTimer({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }

const startButton = document.querySelector('#start-timer-btn');
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
        window.alert("The countdown has ended!");
        datetimePicker.disabled = false;
        return;
      }
  
      const time = convertMs(timeDifference);
      updateTimer(time);
    }, 1000);
  }
startButton.addEventListener('click', startCountdown);


 