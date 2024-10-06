import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');

const makePromise = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(document.querySelector('[name="delay"]').value);
  const state = document.querySelector('[name="state"]:checked').value;

  const shouldResolve = state === 'fulfilled';
  makePromise(delay, shouldResolve)
    .then(delay => {
      iziToast.show({
        title: "✅ ",
        titleColor: "#FFFFFF",
        message: `Fulfilled promise in ${delay}ms`,
        color: "#0bd54b",
        messageColor: "#FFFFFF",
        position: "topRight",
        timeout: 3000,
      });
      
    })
    .catch(delay => {
      iziToast.show({
        title: "❌",
        titleColor: "#FFFFFF",
        message: ` Rejected promise in ${delay}ms`,
        color: "#FF6347",
        messageColor: "#FFFFFF",
        position: "topRight",
        timeout: 3000,
      });
    
    });
});
