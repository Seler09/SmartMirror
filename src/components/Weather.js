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
            windSpeed: "",
            humidity: "",
            pressure: "",
            icon: "",
            humidityIcon: "",
            windIcon: "",
            pressureIcon: "",
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

        storageRef.child('humidity.png').getDownloadURL().then(function(url) {  //async
            thisState.setState({
                humidityIcon: url
            });
        }).catch(function(error) {
            // Handle any errors
        });
        storageRef.child('wind.png').getDownloadURL().then(function(url) {  //async
            thisState.setState({
                windIcon: url
            });
        }).catch(function(error) {
            // Handle any errors
        });
        storageRef.child('pressure.png').getDownloadURL().then(function(url) {  //async
            thisState.setState({
                pressureIcon: url
            });
        }).catch(function(error) {
            // Handle any errors
        });
    }

    function changeLatinLetters(word){
        let text = word.toLowerCase();

        text = text.replace(/ą/,"a");
        text = text.replace(/ć/,"c");
        text = text.replace(/ę/,"e");
        text = text.replace(/ł/,"l");
        text = text.replace(/ń/,"n");
        text = text.replace(/ó/,"o");
        text = text.replace(/ś/,"s");
        text = text.replace(/ź/,"z");
        text = text.replace(/ż/,"z");

        return text;

    }

    function showPosition(position) {
             axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude +','+ position.coords.longitude + '&language=en&key=AIzaSyD0FAAUmo6A7_knlUmeok20_UAXY2BIcW0')
                 .then((findCity)=>{
             let city = findCity.data.results[3].address_components[0].long_name;
             console.log("City: ",city);
             let cityCorrectLetters = changeLatinLetters(city);
                     axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityCorrectLetters + '&APPID=acb3cdbc97d29c21f6e3cd6c18f7947f')
                 .then((findWeather)=>{
                     let temperature = Math.floor(findWeather.data.main.temp - 273);
                     let windSpeed = parseInt(findWeather.data.wind.speed * 3.6, 10);
                     let humidity = parseInt(findWeather.data.main.humidity - 1, 10);
                     let pressure = parseInt(findWeather.data.main.pressure, 10);
                     let picture = findWeather.data.weather[0].icon;

                     imageLoader(picture);
                     thisState.setState({                    //here this is something difrent than this.state
                         temperature: temperature + '°C',
                         city: city,
                         windSpeed: windSpeed + " km/s",
                         humidity: humidity + "%",
                         pressure: pressure + " hPa",
                      })
                    })
             },(error)=>{console.log("Weather error: ",error);})
     }
     weatherCoordinate();
    }

    render(){
        return <div id="weather">
            <div id="weatherLocation">{this.state.city}</div>
            <div id="weatherAdditionalInfo">
                <div id="weatherPressure">
                    <img className="additionalImg" src={this.state.pressureIcon} alt=""/>
                    <div className="additionalText">{this.state.pressure}</div>
                </div>
                <div id="weatherHumidity">
                    <img className="additionalImg" src={this.state.humidityIcon} alt=""/>
                    <div className="additionalText">{this.state.humidity}</div>
                </div>
                <div id="weatherWindSpeed">
                    <img className="additionalImg" src={this.state.windIcon} alt=""/>
                    <div className="additionalText">{this.state.windSpeed}</div>
                </div>
                <div id="clear"></div>
            </div>

            <div id="weatherPicture"><img id="a" src={this.state.icon} alt=""/></div>
            <div id="weatherTemperature">{this.state.temperature}</div>
            <div id="clear"></div>
        </div>;
    }
}

export default Weather;