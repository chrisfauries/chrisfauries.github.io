// Day Title Replacement & HTML tag insertions//
var date = new Date();
var today = date.getDay();

var dayForecast = document.getElementsByClassName("day");
var dayForecastStats = document.getElementsByClassName("stats");
var dayWeatherImage = document.getElementsByClassName("weather-image");

function dayTitleSwitch(dayNumber){
    switch (dayNumber){
        case 0:
            var dayName = "Sunday";
            return dayName;
            break;
        case 1:
            var dayName = "Monday";
            return dayName;
            break;
        case 2:
            var dayName = "Tuesday";
            return dayName;
            break;
        case 3:
            var dayName = "Wednesday";
            return dayName;
            break;
        case 4:
            var dayName = "Thursday";
            return dayName;
            break;
        case 5:
            var dayName = "Friday";
            return dayName;
            break;
        case 6:
            var dayName = "Saturday";
            return dayName;
            break;   
    }
}

for(i = 1; i <= dayForecast.length; i++){
    dayForecast[i - 1].setAttribute("id","forecast-day-" + i);
    dayForecastStats[i - 1].setAttribute("id","forecast-day-stats-" + i);
    dayForecast[i - 1].setAttribute("onclick","ExecuteSelectedDayMenu" + "(" + i + ")");
    var dayName = document.getElementById("forecast-day-" + i).children[0];
    var dayNameValue = today + i - 1;
    while(dayNameValue >= 7){
        dayNameValue -= 7;
    }
    var dayNameTitle = dayTitleSwitch(dayNameValue);
    dayName.innerHTML = dayNameTitle;
}

//Selected Day Drop Down Functions//

var selectedDayMenu = document.getElementById("selected-day-details");
var selectedDayMenuStats = document.getElementById("selected-day-stats");
var selectedDayImage = document.getElementById("selected-day-image");

//work on getting this to function correctly//
function selectedDayMenuCollape(){
        selectedDayMenu.setAttribute("class", "");
}

function selectedDayMenuExpand(){
        setTimeout(selectedDayMenu.setAttribute("class", "show"),500);
}

function ExecuteSelectedDayMenu(forecastDayNumber){
    selectedDayMenuCollape();
    selectedDayMenu.children[0].innerHTML = dayForecast[forecastDayNumber - 1].children[0].innerHTML;
    selectedDayMenuStats.children[0].innerHTML = dayForecastStats[forecastDayNumber - 1].children[0].innerHTML;
    selectedDayMenuStats.children[1].innerHTML = dayForecastStats[forecastDayNumber - 1].children[1].innerHTML;
    selectedDayMenuStats.children[2].innerHTML = dayForecastStats[forecastDayNumber - 1].children[2].innerHTML;
    selectedDayMenuStats.children[3].innerHTML = dayForecastStats[forecastDayNumber - 1].children[3].innerHTML;
    selectedDayImage.setAttribute("src", (dayForecast[forecastDayNumber - 1].children[1].children[0].getAttribute("src")));
    selectedDayMenuExpand();
}

var currentHour = date.getHours();

function selectedDayHourSwitch(hourNumber){
    switch (hourNumber){
        case 0:
            var dayHour = "12AM";
            return dayHour;
            break;
        case 1:
            var dayHour = "1AM";
            return dayHour;
            break;
        case 2:
            var dayHour = "Tuesday";
            return dayHour;
            break;
        case 3:
            var dayHour = "Wednesday";
            return dayHour;
            break;
        case 4:
            var dayHour = "Thursday";
            return dayHour;
            break;
        case 5:
            var dayHour = "Friday";
            return dayHour;
            break;
        case 6:
            var dayHour = "Saturday";
            return dayHour;
            break;   
    }
}

//Weather API//

var weatherAPIurl1 = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88e29b4449597f75812343fde93dd099/30.2672,-97.7431";

var weatherAPIurl2 = "http://api.openweathermap.org/data/2.5/forecast?id=4254010&APPID=e03896e9edde81eedbe95c2b62d0aef9";

fetch(weatherAPIurl1)
    .then(function(response){
        return response.json();
})
    .then(function(weatherData){
        console.log(weatherData);
        var dailyArray = weatherData.daily.data;
        liveWeatherUpdates(dailyArray);
});

function liveWeatherUpdates(dailyArray){
    for(i = 1; i <= dayForecast.length; i++){
    var dayStats = document.getElementById("forecast-day-stats-" + i);
    dayHigh = dayStats.children[0];
    dayHigh.innerHTML += Math.round(dailyArray[i - 1].apparentTemperatureHigh) + "°";
    dayLow = dayStats.children[1];
    dayLow.innerHTML += Math.round(dailyArray[i - 1].apparentTemperatureLow) + "°";
    daySummary = dayStats.children[2];
    daySummary.innerHTML = dailyArray[i - 1].summary;
    dayPrecip = dayStats.children[3];
    dayPrecip.innerHTML += Math.round(dailyArray[0].precipProbability) + "%";
    }
    forecastPictures();
}


//Forecast Pictures//

function forecastPictures(){

    for(i = 1; i <= dayForecast.length; i++){
        dayWeatherImage[i - 1].setAttribute("id","weather-image-" + i);

            function descriptorKeywords(keyword){
                var descriptor = dayForecastStats[i - 1].children[2].innerHTML;
                var lowerCase = descriptor.toLowerCase();
                return lowerCase.includes(keyword);
        }
        switch(true){
            case descriptorKeywords("heavy"):
                dayWeatherImage[i - 1].children[0].setAttribute("src","img/heavyrain.jpg");
                break;
            case descriptorKeywords("light"):
            case descriptorKeywords("showers"):
                dayWeatherImage[i - 1].children[0].setAttribute("src","img/lightrain.jpg");
                break;
            case descriptorKeywords("windy"):
            case descriptorKeywords("breezy"):
                dayWeatherImage[i - 1].children[0].setAttribute("src","img/windy.jpg");
                break;
            case descriptorKeywords("cloudy"):
                dayWeatherImage[i - 1].children[0].setAttribute("src","img/cloudy.jpg");
                break;
            case descriptorKeywords("sunny"):
                dayWeatherImage[i - 1].children[0].setAttribute("src","img/sunny.gif");
                break;
        }
    }
}


