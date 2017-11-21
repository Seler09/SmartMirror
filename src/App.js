import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Clock from './components/Clock';
import Weather from "./components/Weather";
import News from "./components/News";
import DatabaseSentence from "./components/DatabaseSentence";
import GoogleCalendar from './components/GoogleCalendar';
import PropTypes from 'prop-types';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            showClock: false,
            reloadCalendar: true
        }
        this.handleReloadCalendar = this.handleReloadCalendar.bind(this);
    }

    handleReloadCalendar = (a) =>{
        this.setState({
            reloadCalendar: a,
        });
    }

    handleKeyPress = (event) => {
        if (event.key === 'c'){
            this.setState({showCalendar: !this.state.showCalendar})
        } else if (event.key === 't'){
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
                    <GoogleCalendar/>
                    <Clock handleReloadCalendar={this.handleReloadCalendar}/>
                    <Calendar reloadCalendar={this.state.reloadCalendar} handleReloadCalendar={this.handleReloadCalendar}/>
                    <DatabaseSentence/>
                    <Weather/>
                    <News/>
                </div>
            </div>
        );
    }
}

export default App;
