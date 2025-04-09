const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '2a6321fc937cf7da1f4649f86786954b';
    const city = document.querySelector('.search-box input').value;

    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const imagens = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperatura');
            const descricao = document.querySelector('.weather-box .descricao');
            const umidade = document.querySelector('.weather-details .umidade span');
            const vento = document.querySelector('.weather-details .vento span');

            // Log para depuração (opcional)
            console.log('Condição climática:', json.weather[0].main);

            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    imagens.src = 'imagens/sol.png';
                    break;
                case 'rain':
                case 'drizzle':
                case 'thunderstorm':
                    imagens.src = 'imagens/chuva.png';
                    break;
                case 'snow':
                    imagens.src = 'imagens/nevoa.png';
                    break;
                case 'clouds':
                    imagens.src = 'imagens/nuvens.png';
                    break;
                case 'mist':
                case 'haze':
                case 'fog':
                    imagens.src = 'imagens/nevoa.png';
                    break;
                default:
                    imagens.src = 'imagens/404.png';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            umidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });

});
