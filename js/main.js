let curruntCity = [];
let show = document.querySelector('.row');
let SearchInput = document.querySelector('.SearchInput');

async function getCities(x) {
    let city = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fddb7facd21d46988e4131818250211&q=${x}&days=3`);
    let response = await city.json();
    curruntCity = response;
    
    DisplayCity();
}

getCities('Asyut');


SearchInput.addEventListener('input',function(){
    let search =SearchInput.value;
    getCities(search);
})

function DisplayCity() {
    let todayDate = '';
    let tomorrowDate = '';
    let afterDate = '';

    let directions = {
        N: "North",               
        NNE: "North-Northeast",   
        NE: "Northeast",           
        ENE: "East-Northeast",   
        E: "East",                 
        ESE: "East-Southeast",    
        SE: "Southeast",           
        SSE: "South-Southeast",    
        S: "South",             
        SSW: "South-Southwest",   
        SW: "Southwest",          
        WSW: "West-Southwest",    
        W: "West",                 
        WNW: "West-Northwest",    
        NW: "Northwest",           
        NNW: "North-Northwest"     
    };


    for (let i = 0; i < curruntCity.forecast.forecastday.length; i++) {
        let dateStr = curruntCity.forecast.forecastday[i].date;
        let date = new Date(dateStr);

        let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        let day = date.getDate();
        let monthName = date.toLocaleDateString('en-US', { month: 'long' });

        let formattedDate = `${dayName}, ${day} ${monthName}`;

        if (i === 0) todayDate = formattedDate;
        else if (i === 1) tomorrowDate = formattedDate;
        else if (i === 2) afterDate = formattedDate;
    }

    var cartona = `
        <div class="col-xxl-4 col-xl-6">
            <div class="today">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${todayDate}</p>
                </div>
                <div class="today-weather">
                    <h5 class="text-uppercase">${curruntCity.location.country}</h5>
                    <h2 class="fw-bold">${curruntCity.current.temp_c}°C</h2>
                    <img class="today-weather-icon" src="${curruntCity.current.condition.icon}">
                    <p class="today-weather-text text-info">${curruntCity.current.condition.text}</p>
                </div>
                <div class="weather-icon ps-5 pe-5 d-flex justify-content-between">
                    <p><i class="fa-solid fa-water"></i> ${curruntCity.forecast.forecastday[0].day.avghumidity}%</p> 
                    <p><i class="fa-regular fa-compass"></i> ${directions[curruntCity.current.wind_dir]}</p>
                    <p><i class="fa-solid fa-wind"></i>${curruntCity.forecast.forecastday[0].day.maxwind_kph}km/h</p>
                </div>
            </div>
        </div>

        <div class="col-xxl-4 col-xl-6">
            <div class="tomorrow">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${tomorrowDate}</p>
                </div>
                <div class="toworrow-weather mt-5 pt-5">
                    <h2 class="fw-bold">${curruntCity.forecast.forecastday[1].day.maxtemp_c}°C</h2>
                    <h6 class="fw-bold text-info">${curruntCity.forecast.forecastday[1].day.mintemp_c}°C</h6>
                    <img class="toworrow-weather-icon" src="${curruntCity.forecast.forecastday[1].day.condition.icon}">
                    <p class="toworrow-weather-text text-info">${curruntCity.forecast.forecastday[1].day.condition.text}</p>
                </div>
                <div class="weather-icon ps-5 pe-5 d-flex justify-content-between">
                    <p><i class="fa-solid fa-water"></i> ${curruntCity.forecast.forecastday[1].day.avghumidity}%</p> 
                    <p><i class="fa-solid fa-wind"></i>${curruntCity.forecast.forecastday[1].day.maxwind_kph}km/h</p>
                </div>
            </div>
        </div>

        <div class="col-xxl-4 col-xl-6">
            <div class="after">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${afterDate}</p>
                </div>
                <div class="after-weather mt-5 pt-5">
                    <h2 class="fw-bold">${curruntCity.forecast.forecastday[2].day.maxtemp_c}°C</h2>
                    <h6 class="fw-bold text-info">${curruntCity.forecast.forecastday[2].day.mintemp_c}°C</h6>
                    <img class="after-weather-icon" src="${curruntCity.forecast.forecastday[2].day.condition.icon}">
                    <p class="after-weather-text text-info">${curruntCity.forecast.forecastday[2].day.condition.text}</p>
                </div>
                <div class="weather-icon ps-5 pe-5 d-flex justify-content-between">
                    <p><i class="fa-solid fa-water"></i> ${curruntCity.forecast.forecastday[2].day.avghumidity}%</p> 
                    <p><i class="fa-solid fa-wind"></i>${curruntCity.forecast.forecastday[2].day.maxwind_kph}km/h</p>
                </div>
            </div>
        </div>`;

    show.innerHTML = cartona;
}
