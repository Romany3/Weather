let curruntCity = [];
let show = document.querySelector('.weather .row');
let SearchInput = document.querySelector('.SearchInput');
let hour = document.querySelector('.weather-hour .row');
let btn = document.querySelectorAll('.translate');

let Home = document.querySelector('.Home');
let News = document.querySelector('.News');
let LiveCameras = document.querySelector('.Live-Cameras');
let Photos = document.querySelector('.Photos');
let Contact = document.querySelector('.Contact');
let Title = document.querySelector('.Title');
let weatherHourTitle = document.querySelector('.weather-hour-title');
let weatherTitle = document.querySelector('.weather-title');

// I searched of this
hour.addEventListener("wheel", (e) => {
  e.preventDefault();
  hour.scrollLeft += e.deltaY;
});

async function getCities(x,Display) {
    let city = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fddb7facd21d46988e4131818250211&q=${x}&days=7`);
    let response = await city.json();
    curruntCity = response;
    
    Display();
};


let isArabic = false;
getCities('Asyut', DisplayCityEnglish);
for(let i=0; i<btn.length; i++){
    btn[i].addEventListener('click',function(e){
        isArabic = !isArabic;
        if (isArabic) 
        {
            getCities('أسيوط', DisplayCityArabic);
            SearchInput.placeholder='...اكتب اسم المدينة';
            Home.innerHTML="الرئيسية";
            News.innerHTML="الاخبار";
            LiveCameras.innerHTML="كاميرات مباشرة";
            Photos.innerHTML="صور";
            Contact.innerHTML="تواصل";
            weatherHourTitle.innerHTML="توقعات اليوم";
            weatherTitle.innerHTML="توقعات الطقس لثلاثة أيام";
            Title.innerHTML="الطقس";
        } 
        else 
        {
            getCities('Asyut', DisplayCityEnglish);
            SearchInput.placeholder='Find Your Location...';
            Home.innerHTML='Home';
            News.innerHTML='News';
            LiveCameras.innerHTML='Live Cameras';
            Photos.innerHTML='Photos';
            Contact.innerHTML='Contact';
            weatherHourTitle.innerHTML=`Today's Forecast`;
            weatherTitle.innerHTML=`3-Day Forecast`;
            Title.innerHTML='Weather';
        }
    });
        
}


SearchInput.addEventListener('input',function(){
    let search =SearchInput.value;
    getCities(search,DisplayCityEnglish);
});


function DisplayCityEnglish() {
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

    var hours=''
    for(let x = 0; x < curruntCity.forecast.forecastday[0].hour.length; x++){
        let timeStr = curruntCity.forecast.forecastday[0].hour[x].time.split(" ")[1];
        let timeOnly = timeStr; 
        hours+=`<div class="col-1">
                    <p class="weather-hour-time">${timeOnly}</p>
                    <img class="weather-hour-icon" src="${curruntCity.forecast.forecastday[0].hour[x].condition.icon}">
                    <p class="weather-hour-temp">${curruntCity.forecast.forecastday[0].hour[x].temp_c}</p>
                </div>`
    }
    
    hour.innerHTML = hours;


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
};

function DisplayCityArabic() {
    let todayDate = '';
    let tomorrowDate = '';
    let afterDate = '';

    let directions = {
        N: "شمال",
        NNE: "شمال شمال شرقي",
        NE: "شمال شرقي",
        ENE: "شرق شمال شرقي",
        E: "شرق",
        ESE: "شرق جنوب شرقي",
        SE: "جنوب شرقي",
        SSE: "جنوب جنوب شرقي",
        S: "جنوب",
        SSW: "جنوب جنوب غربي",
        SW: "جنوب غربي",
        WSW: "غرب جنوب غربي",
        W: "غرب",
        WNW: "غرب شمال غربي",
        NW: "شمال غربي",
        NNW: "شمال شمال غربي"   
    };

    var hours=''
    for(let x = 0; x < curruntCity.forecast.forecastday[0].hour.length; x++){
        let timeStr = curruntCity.forecast.forecastday[0].hour[x].time.split(" ")[1];
        let timeOnly = timeStr; 
        hours+=`<div class="col-1">
                    <p class="weather-hour-time">${timeOnly}</p>
                    <img class="weather-hour-icon" src="${curruntCity.forecast.forecastday[0].hour[x].condition.icon}">
                    <p class="weather-hour-temp">${curruntCity.forecast.forecastday[0].hour[x].temp_c}</p>
                </div>`
    }
    
    hour.innerHTML = hours;


    for (let i = 0; i < curruntCity.forecast.forecastday.length; i++) {
        let dateStr = curruntCity.forecast.forecastday[i].date;
        let date = new Date(dateStr);

        let dayName = date.toLocaleDateString('ar-EG', { weekday: 'long' });
        let day = date.getDate();
        let monthName = date.toLocaleDateString('ar-EG', { month: 'long' });

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
};