let curruntCity = [];
let show = document.querySelector('.weather .row');
let SearchInput = document.querySelector('.SearchInput');
let hour = document.querySelector('.weather-hour .row');
let SearchButton = document.querySelector('.SearchButton');
let btn = document.querySelector('.translate');

let Home = document.querySelector('.Home');
let News = document.querySelector('.News');
let LiveCameras = document.querySelector('.Live-Cameras');
let Photos = document.querySelector('.Photos');
let Contact = document.querySelector('.Contact');
let Title = document.querySelector('.Title');
let weatherHourTitle = document.querySelector('.weather-hour-title');
let weatherTitle = document.querySelector('.weather-title');
let navbar = document.querySelector(".navbar");
let DisplayMore = document.querySelector(".DisplayMore");
let DisplayLess = document.querySelector(".DisplayLess");




let previousScroll = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > previousScroll) 
    {
        navbar.classList.add("hidden-navbar");
    } 
  else 
    {
        navbar.classList.remove("hidden-navbar");
    }

  previousScroll = currentScroll;
});




// I searched of this
hour.addEventListener("wheel", (e) => {
  e.preventDefault();
  hour.scrollLeft += e.deltaY;
});

async function getCities(CityName,DisplayLang,DayNumber) {
    let city = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fddb7facd21d46988e4131818250211&q=${CityName}&days=${DayNumber}`);
    let response = await city.json();
    curruntCity = response;
    
    DisplayLang();
};
let DaysNumber = 3
function updateButtons() {
    if (DaysNumber < 12) {
        DisplayMore.classList.remove('d-none');
    } else {
        DisplayMore.classList.add('d-none');
    }

    if (DaysNumber > 3) {
        DisplayLess.classList.remove('d-none');
    } else {
        DisplayLess.classList.add('d-none');
    }
}

DisplayMore.addEventListener('click', () => {
    DaysNumber += 3;
    getCities('Asyut', DisplayCityEnglish, DaysNumber);
    updateButtons();
});

DisplayLess.addEventListener('click', () => {
    DaysNumber -= 3;
    getCities('Asyut', DisplayCityEnglish, DaysNumber);
    updateButtons();
});





SearchButton.addEventListener('click',function(e){
    e.preventDefault();

    let search =SearchInput.value;
    getCities(search,DisplayCityEnglish,DaysNumber);
    SearchInput.value='';
})

SearchInput.addEventListener('input',function(){
    let search =SearchInput.value;
    getCities(search,DisplayCityEnglish,DaysNumber);
});



let isArabic = false;
getCities('Asyut', DisplayCityEnglish,3);
btn.addEventListener('click',function(e){
    isArabic = !isArabic;
    if (isArabic) 
    {
        getCities('أسيوط', DisplayCityArabic,DaysNumber);
        SearchInput.placeholder='...اكتب اسم المدينة';
        Home.innerHTML="الرئيسية";
        News.innerHTML="الاخبار";
        LiveCameras.innerHTML="كاميرات مباشرة";
        Photos.innerHTML="صور";
        Contact.innerHTML="تواصل";
        weatherHourTitle.innerHTML="توقعات طقس اليوم";
        weatherTitle.innerHTML="توقعات طقوس الأيام";
        Title.innerHTML="الطقس";
    } 
    else 
    {
        getCities('Asyut', DisplayCityEnglish,DaysNumber);
        SearchInput.placeholder='Find Your Location...';
        Home.innerHTML='Home';
        News.innerHTML='News';
        LiveCameras.innerHTML='Live Cameras';
        Photos.innerHTML='Photos';
        Contact.innerHTML='Contact';
        weatherHourTitle.innerHTML=`Today's Weather Forecast`;
        weatherTitle.innerHTML=`Days Weather Forecast`;
        Title.innerHTML='Weather';
    }
});

function DisplayCityEnglish() {
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

    
    let hours = '';
    for (let x = 0; x < curruntCity.forecast.forecastday[0].hour.length; x++) {
        let timeStr = curruntCity.forecast.forecastday[0].hour[x].time.split(" ")[1];
        hours += `
        <div class="col-1">
            <p class="weather-hour-time">${timeStr}</p>
            <img class="weather-hour-icon" src="${curruntCity.forecast.forecastday[0].hour[x].condition.icon}">
            <p class="weather-hour-temp">${curruntCity.forecast.forecastday[0].hour[x].temp_c}</p>
        </div>`;
    }
    hour.innerHTML = hours;

   
    let todayDate = new Date(curruntCity.forecast.forecastday[0].date);
    let todayFormatted = todayDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

    let cartona = `
        <div class="col-xxl-4 col-xl-6">
            <div class="today">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${todayFormatted}</p>
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
        </div>`;

    
    for (let i = 1; i < DaysNumber; i++) {
        let dateStr = curruntCity.forecast.forecastday[i].date;
        let date = new Date(dateStr);
        let formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

        cartona += `
        <div class="col-xxl-4 col-xl-6">
            <div class="tomorrow">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${formattedDate}</p>
                </div>
                <div class="toworrow-weather mt-5 pt-5">
                    <h2 class="fw-bold">${curruntCity.forecast.forecastday[i].day.maxtemp_c}°C</h2>
                    <h6 class="fw-bold text-info">${curruntCity.forecast.forecastday[i].day.mintemp_c}°C</h6>
                    <img class="toworrow-weather-icon" src="${curruntCity.forecast.forecastday[i].day.condition.icon}">
                    <p class="toworrow-weather-text text-info">${curruntCity.forecast.forecastday[i].day.condition.text}</p>
                </div>
                <div class="weather-icon ps-5 pe-5 d-flex justify-content-between">
                    <p><i class="fa-solid fa-water"></i> ${curruntCity.forecast.forecastday[i].day.avghumidity}%</p> 
                    <p><i class="fa-solid fa-wind"></i>${curruntCity.forecast.forecastday[i].day.maxwind_kph}km/h</p>
                </div>
            </div>
        </div>`;
    }

    show.innerHTML = cartona;
}


function DisplayCityArabic() {
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

    
    let hours = '';
    for (let x = 0; x < curruntCity.forecast.forecastday[0].hour.length; x++) {
        let timeStr = curruntCity.forecast.forecastday[0].hour[x].time.split(" ")[1];
        hours += `
        <div class="col-1">
            <p class="weather-hour-time">${timeStr}</p>
            <img class="weather-hour-icon" src="${curruntCity.forecast.forecastday[0].hour[x].condition.icon}">
            <p class="weather-hour-temp">${curruntCity.forecast.forecastday[0].hour[x].temp_c}</p>
        </div>`;
    }
    hour.innerHTML = hours;

    
    let todayDate = new Date(curruntCity.forecast.forecastday[0].date);
    let todayFormatted = todayDate.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' });

    let cartona = `
        <div class="col-xxl-4 col-xl-6">
            <div class="today">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${todayFormatted}</p>
                </div>
                <div class="today-weather">
                    <h5>${curruntCity.location.country}</h5>
                    <h2 class="fw-bold">${curruntCity.current.temp_c}°م</h2>
                    <img class="today-weather-icon" src="${curruntCity.current.condition.icon}">
                    <p class="today-weather-text text-info">${curruntCity.current.condition.text}</p>
                </div>
                <div class="weather-icon ps-5 pe-5 d-flex justify-content-between">
                    <p><i class="fa-solid fa-water"></i> الرطوبة: ${curruntCity.forecast.forecastday[0].day.avghumidity}%</p> 
                    <p><i class="fa-regular fa-compass"></i> الاتجاه: ${directions[curruntCity.current.wind_dir]}</p>
                    <p><i class="fa-solid fa-wind"></i> الرياح: ${curruntCity.forecast.forecastday[0].day.maxwind_kph}كم/س</p>
                </div>
            </div>
        </div>`;

    
    for (let i = 1; i < DaysNumber; i++) {
        let dateStr = curruntCity.forecast.forecastday[i].date;
        let date = new Date(dateStr);
        let formattedDate = date.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' });

        cartona += `
        <div class="col-xxl-4 col-xl-6">
            <div class="tomorrow">
                <div class="details d-flex justify-content-between align-items-baseline">
                    <p>${curruntCity.location.name}</p>
                    <p>${formattedDate}</p>
                </div>
                <div class="toworrow-weather mt-5 pt-5">
                    <h2 class="fw-bold">${curruntCity.forecast.forecastday[i].day.maxtemp_c}°م</h2>
                    <h6 class="fw-bold text-info">${curruntCity.forecast.forecastday[i].day.mintemp_c}°م</h6>
                    <img class="toworrow-weather-icon" src="${curruntCity.forecast.forecastday[i].day.condition.icon}">
                    <p class="toworrow-weather-text text-info">${curruntCity.forecast.forecastday[i].day.condition.text}</p>
                </div>
                <div class="weather-icon ps-5 pe-5 d-flex justify-content-between">
                    <p><i class="fa-solid fa-water"></i> الرطوبة: ${curruntCity.forecast.forecastday[i].day.avghumidity}%</p> 
                    <p><i class="fa-solid fa-wind"></i> الرياح: ${curruntCity.forecast.forecastday[i].day.maxwind_kph}كم/س</p>
                </div>
            </div>
        </div>`;
    }

    show.innerHTML = cartona;
}
