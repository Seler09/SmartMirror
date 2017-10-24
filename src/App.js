import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Clock from './components/Clock';
import Weather from "./components/Weather";
import News from "./components/News";

class App extends Component {
    constructor() {
        super();
        this.state = {
            showCalendar: false,
            showClock: false
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'c'){
            this.setState({showCalendar: !this.state.showCalendar})
        }else if(event.key === 't'){
            this.setState({showClock: !this.state.showClock})
        }
    }


    render() {
        return (
            <div>
                <input type="text" id="one" onKeyPress={this.handleKeyPress} />
                {this.state.showClock && < Clock/>}
                {this.state.showCalendar && < Calendar/>}

                <div>
                    <Clock/>
                    <Calendar/>
                    <Weather/>
                    <News/>
                </div>
            </div>
        );
    }
}

export default App;