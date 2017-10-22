import React from 'react';
import "../css/WeatherStyle.css";
import axios from 'axios';

class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state={
            temperature: "Loading...",
            city: "Loading..."
        }


    }

    componentDidMount(){

            let x = document.getElementById("demo");
            let thisState = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }


            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;


                axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude +','+ position.coords.longitude + '&language=en&key=AIzaSyD0FAAUmo6A7_knlUmeok20_UAXY2BIcW0')
                    .then((findCity)=>{

                    let city = findCity.data.results[3].address_components[0].long_name;

                    axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=67e52b10350ce3818be6550aeec51c50')
                        .then((findWeather)=>{
                        console.log(findWeather);
                        let temperature = Math.floor(findWeather.data.main.temp - 273);
                        let windSpeed = parseInt(findWeather.data.wind.speed * 3.6);
                        let humidity = parseInt(findWeather.data.main.humidity);
                        let pressure = parseInt(findWeather.data.main.pressure);
                        let img = findWeather.data.weather[0].icon;
                        console.log("Temp: " + (findWeather.data.main.temp - 273));
                        console.log("Temp: " + temperature);
                        console.log("Wind speed: " + windSpeed);
                        console.log("humidity: " + humidity + "%");
                        console.log("pressure: " + pressure + "hPa");
                        console.log("Img: " + img);
//http://openweathermap.org/img/w/10d.pn
                        document.getElementById("info_bg").innerHTML = '<img src=\'http://openweathermap.org/img/w/'+ img +'.png\'>';
                            axios.get('http://openweathermap.org/img/w/10d.png')
                                .then((findImg)=>{
                                    // let temp2 = findImg;
                                    // document.getElementById("info_bg").innerHTML = temp2;
                                })
                        thisState.setState({                    //here this is something difrent than this.state
                            temperature: temperature,
                            city: city
                        })
                    })
                })
            }



    }

    render(){

        return <div id="container clearfix">
           <p id="location">{this.state.city}</p>
            <p id="temperature">{this.state.temperature}</p>
            <div id="climate_bg"></div>
            <div id="info_bg">
                <p id="humidity">100%</p>

                <div id="windspeed">5 km/s</div>
            </div>


            <p id="demo"></p>
        </div>;
    }
}

export default Weather;