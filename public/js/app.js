console.log('Client side Javascript loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const outputDiv = document.querySelector('.output');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  outputDiv.textContent = 'Loading...'

  fetch(`http://localhost:3000/weather?address=${search.value}`).then(
    (result) => {
      result.json().then((data) => {
        outputDiv.innerHTML = '';

        if (data.error) {
          return outputDiv.insertAdjacentHTML(
            'beforeend',
            `<h1>${data.error}</h1>`
          );
        }

        outputDiv.insertAdjacentHTML(
          'beforeend',
          `<h2>You searched for <strong>${data.address}</strong> </h2>`
        );
        outputDiv.insertAdjacentHTML('beforeend', `<h3>${data.location}</h3>`);
        outputDiv.insertAdjacentHTML('beforeend', `<p>${data.forecast}</p>`);
      });
    }
  );
});
