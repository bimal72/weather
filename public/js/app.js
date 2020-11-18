


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.stopPropagation();
  message1.textContent = 'Loading...';
  message2.textContent = '';
  fetch('/weather?address=' + search.value).then((response) => {
    response.json().then(data => {
      if (data.error) {

        message1.innerHTML = data.error;
        message2.innerHTML = '';
      } else {

        message1.innerHTML = data.location;
        message2.innerHTML = data.forcast;
      }
    })
  })
})