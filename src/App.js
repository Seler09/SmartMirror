import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Clock from './components/Clock';
import Weather from "./components/Weather";
import News from "./components/News";
import DatabaseSentence from "./components/DatabaseSentence";
import GoogleCalendar from './components/GoogleCalendar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            showClock: false,
            showWeather: false,
            showNews: false,
            showDatabaseSentence: false,
            showGoogleCalendar: false,
            showAll: false,
            log: false,
            reload: false
        };
        this.handleReloadCalendar = this.handleReloadCalendar.bind(this);
        this.login = this.login.bind(this);

    }
    login = (e) =>{
        this.setState({log: e});
    };
    handleReloadCalendar = (a) =>{
        this.setState({reload: a});
    };

    handleKeyPress = (event) => {
        if (event.key === 'c'){
            this.setState({showClock: true});
            this.setState({showCalendar: !this.state.showCalendar})
        } else if (event.key === 't'){
            this.setState({showClock: !this.state.showClock});
            this.setState({showGoogleCalendar: false});
            this.setState({showCalendar: false});
        }else if (event.key === 'w'){
            this.setState({showWeather: !this.state.showWeather})
        }else if (event.key === 'n'){
            this.setState({showNews: !this.state.showNews})
        }else if (event.key === 's'){
            this.setState({showDatabaseSentence: !this.state.showDatabaseSentence})
        }else if (event.key === 'g'){
            this.setState({showClock: true});
            this.setState({showGoogleCalendar: !this.state.showGoogleCalendar})
        }else if (event.key === 'a'){
            this.setState({showAll: !this.state.showAll});
            if(this.state.showAll === false){
                this.setState({showCalendar: true});
                this.setState({showClock: true});
                this.setState({showWeather: true});
                this.setState({showNews: true});
                this.setState({showDatabaseSentence: true});
                this.setState({showGoogleCalendar: true});
            } else{
                this.setState({showCalendar: false});
                this.setState({showClock: false});
                this.setState({showWeather: false});
                this.setState({showNews: false});
                this.setState({showDatabaseSentence: false});
                this.setState({showGoogleCalendar: false});
            }
        }
    };

    render() {
        return (
            <div>
                <input type="text" id="one" onKeyPress={this.handleKeyPress} />
                {/*{this.state.showClock && <Clock handleReloadCalendar={this.handleReloadCalendar}/>}*/}
                {/*{this.state.showClock && this.state.showCalendar && <Calendar reload={this.state.reload}/>}*/}
                {/*{this.state.showClock && this.state.showGoogleCalendar  && <GoogleCalendar reload={this.state.reload}/>}*/}
                {/*{this.state.showWeather && <Weather/>}*/}
                {/*{this.state.showDatabaseSentence && <DatabaseSentence/>}*/}
                {/*{this.state.showNews && <News/>}*/}


                {/*<div>*/}

                    <Clock handleReloadCalendar={this.handleReloadCalendar}/>
                    <Calendar reload={this.state.reload}/>
                    <GoogleCalendar reload={this.state.reload}/>
                    <Weather/>
                    <DatabaseSentence/>
                    <News/>
                {/*</div>*/}
            </div>
        );
    }
}

export default App;
