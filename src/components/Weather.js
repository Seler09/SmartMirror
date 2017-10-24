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

    if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
    } else {
                document.getElementById("weather").innerHTML = "Error";
    }


     function showPosition(position) {
             axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude +','+ position.coords.longitude + '&language=en&key=AIzaSyD0FAAUmo6A7_knlUmeok20_UAXY2BIcW0')
                 .then((findCity)=>{

             let city = findCity.data.results[3].address_components[0].long_name;

             axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=67e52b10350ce3818be6550aeec51c50')
                 .then((findWeather)=>{
                        console.log(findWeather);
                     let temperature = Math.floor(findWeather.data.main.temp - 273);
                     let windSpeed = parseInt(findWeather.data.wind.speed * 3.6, 10);
                     let humidity = parseInt(findWeather.data.main.humidity - 1, 10);
                     let pressure = parseInt(findWeather.data.main.pressure, 10);
                     //let img = findWeather.data.weather[0].icon;
                     //let icon = <img src={require('../icons/'+img+'.png')} alt="Error"/>

                         console.log("Temp: " + Math.floor(findWeather.data.main.temp - 273));
                         console.log("Temp: " + temperature);
                         console.log("Wind speed: " + windSpeed);
                         console.log("humidity: " + humidity + "%");
                         console.log("pressure: " + pressure + "hPa");
                        // console.log("Img: " + img);




                     thisState.setState({                    //here this is something difrent than this.state
                         temperature: temperature,
                         city: city,
                         windSpeed: windSpeed,
                         humidity: humidity,
                         pressure: pressure,
                         icon: icon
                      })
                    })
             })
     }
    }

    render(){
         //
         // let storage = firebase.storage();
         // let pathReference = storage.ref('01d.png');
         // console.log('pathref',pathReference);

        var storage = firebase.storage();

// Create a storage reference from our storage service
        var storageRef = storage.ref();

        let a = storageRef.child('02d.png');
        console.log(a);

       // document.getElementById('myimg2').innerHTML=a;

        storageRef.child('02d.png').getDownloadURL().then(function(url) {  //async
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
        }).catch(function(error) {
            // Handle any errors
        });


        return <div id="weather">
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
            <div id="weatherImg">{this.state.icon}</div>
            <div id="weatherTemperature">{this.state.temperature}°C</div>
            <div id="dupa"><img id="myimg"  alt="dupa"/></div>
            <div id="dupa2"><img id="myimg2"  alt="dupa"/></div>

        </div>;
    }
}

export default Weather;