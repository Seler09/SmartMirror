import React from 'react';
import "../css/WeatherStyle.css";
import axios from 'axios';
import firebase from 'firebase';



class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state={
            temperature: "Loading...",
            city: "Loading...",
            windSpeed: "Loading...",
            humidity: "Loading...",
            pressure: "Loading...",
            icon: "Loading..."
        }
    }

    componentDidMount(){
    let thisState = this;

    function weatherCoordinate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            setInterval(function () {weatherCoordinate();},1800000); //30min
        } else {
            document.getElementById("weather").innerHTML = "Error";
        }
    }

    function imageLoader(img) {
        let storage = firebase.storage();
        let storageRef = storage.ref();

        storageRef.child(img + '.png').getDownloadURL().then(function(url) {  //async
            thisState.setState({
                icon: url
            });
        }).catch(function(error) {
            // Handle any errors
        });
    }

    function changeLatinLetters(word){
        let text = word.toLowerCase();
            // console.log("Zamiana wielkości: " + text);
        text = text.replace(/ą/,"a");
        text = text.replace(/ć/,"c");
        text = text.replace(/ę/,"e");
        text = text.replace(/ł/,"l");
        text = text.replace(/ń/,"n");
        text = text.replace(/ó/,"o");
        text = text.replace(/ś/,"s");
        text = text.replace(/ź/,"z");
        text = text.replace(/ż/,"z");
            // console.log("Zamiana litery: " + text);
        return text;

    }

    function showPosition(position) {
             axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude +','+ position.coords.longitude + '&language=en&key=AIzaSyD0FAAUmo6A7_knlUmeok20_UAXY2BIcW0')
                 .then((findCity)=>{
             let city = findCity.data.results[3].address_components[0].long_name;
             let cityCorrectLetters = changeLatinLetters(city);
                     axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityCorrectLetters + '&APPID=67e52b10350ce3818be6550aeec51c50')
                 .then((findWeather)=>{
                     let temperature = Math.floor(findWeather.data.main.temp - 273);
                     let windSpeed = parseInt(findWeather.data.wind.speed * 3.6, 10);
                     let humidity = parseInt(findWeather.data.main.humidity - 1, 10);
                     let pressure = parseInt(findWeather.data.main.pressure, 10);
                     let picture = findWeather.data.weather[0].icon;
                        // console.log("Temp: " + Math.floor(findWeather.data.main.temp - 273));
                         // console.log("Temp: " + temperature);
                         // console.log("Wind speed: " + windSpeed);
                         // console.log("humidity: " + humidity + "%");
                         // console.log("pressure: " + pressure + "hPa");
                         // console.log("Img: " + picture);
                     imageLoader(picture);
                     thisState.setState({                    //here this is something difrent than this.state
                         temperature: temperature,
                         city: city,
                         windSpeed: windSpeed,
                         humidity: humidity,
                         pressure: pressure
                      })
                    })
             })
     }
     weatherCoordinate();
    }

    render(){
        return <div id="weather">
            <div id="weatherPicture"><img id="a" src={this.state.icon} alt="Loading..."/></div>
            <div id="weatherTemperature">{this.state.temperature}°C</div>
            <div id="clear"></div>
           <div id="weatherLocation">{this.state.city}</div>
            <div id="weatherAdditionalInfo">
                <div id="weatherWindSpeed">
                    <div className="weatherAdditionalInfoImg"/>
                    <p>{this.state.humidity}%</p>
                </div>
                <div id="weatherHumidity">
                    <div className="weatherAdditionalInfoImg"/>
                    <p>{this.state.pressure}hPa</p>
                </div>
                <div id="weatherPressure">
                    <div className="weatherAdditionalInfoImg"/>
                    <p>{this.state.windSpeed} km/s</p>
                </div>
            </div>
        </div>;
    }
}

export default Weather;