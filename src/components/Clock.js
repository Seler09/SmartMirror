import React from 'react';
import '../css/ClockStyle.css';


class Clock extends React.Component{


    componentDidMount(){
        var clock = document.getElementById('clockHM');
        let clockSeconds = document.getElementById('clockSeconds');
        function timer() {
            let time = new Date();
            let hours = time.getHours().toString();
            let minutes = time.getMinutes().toString();
            let seconds = time.getSeconds().toString();

            if(hours.length < 2){
                hours = '0' + hours;
            }

            if(minutes.length < 2){
                minutes = '0' + minutes;
            }

            if(seconds.length < 2){
                seconds = '0' + seconds;
            }

            let clockTime = hours + ':' + minutes;
            let clockTimeSeconds = seconds;
            clock.textContent = clockTime;
            clockSeconds.textContent = clockTimeSeconds;

            if(hours==="59"&&minutes==="59"&&seconds==="59"){

            }

        }
        setInterval(function () {
            timer();
        },1000);


    }
    render(){





        return <div id="clock">
            <div id="clockHM">00:00</div>
            <div id="clockSeconds">00</div>
            <div id="clear"></div>
        </div>;
    }
}

export default Clock;