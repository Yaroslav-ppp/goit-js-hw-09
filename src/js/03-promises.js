const refs = {  form: document.querySelector(".form"),
button: document.querySelector("button")
}
refs.button.disabled = false;
refs.form.addEventListener("submit", onBtnMakePromises)
let position = 0;

function onBtnMakePromises (evt) {

evt.preventDefault ();
refs.button.disabled = true;

let delay = Number(evt.currentTarget.elements.delay.value);
const step = Number(evt.currentTarget.elements.step.value);
const amount = Number(evt.currentTarget.elements.amount.value);


setInterval (() =>  {
 
if (amount === position) { return }
position += 1;
setTimeout(() => {delay += step})

  createPromise(position, delay) 
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}, delay);

}
function createPromise(position, delay) {
  const promise = new Promise ((resolve, reject) => {
setInterval(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  };
  }, delay)
})
return promise;
}

