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
        title: "Success",
        titleColor: "#FFFFFF",
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: "#0bd54b",
        messageColor: "#FFFFFF",
        position: "topRight",
        timeout: 3000,
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.show({
        title: "Error",
        titleColor: "#FFFFFF",
        message: `❌ Rejected promise in ${delay}ms`,
        color: "#FF0000",
        messageColor: "#FFFFFF",
        position: "topRight",
        timeout: 3000,
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
});
