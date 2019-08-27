const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');
const p5 = document.querySelector('#p5');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    p1.textContent = 'Retrieving weather info...';
    p2.textContent = '';
    p3.textContent = '';
    p4.textContent = '';
    p5.textContent = '';
    fetch('/weather?address=' + searchInput.value)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    p1.textContent = data.error;
                } else {
                    p1.textContent = 'Location: ' + data.location
                    p2.textContent = 'Summary: ' + data.summary
                    p3.textContent = 'Temperature: ' + data.temperature
                    p4.textContent = 'Feels like: ' + data.feelsLike
                    p5.textContent = 'Chance of rain: ' + (data.chanceRain*100) + '%'
                }
            })
        })
})