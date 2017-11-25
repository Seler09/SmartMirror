import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Clock from './components/Clock';
import Weather from './components/Weather';
import News from './components/News';
import DatabaseSentence from './components/DatabaseSentence';
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
            reload: false,
            editText: true
        };
        this.handleReloadCalendar = this.handleReloadCalendar.bind(this);
        this.login = this.login.bind(this);

    };

    login = (e) =>{
        this.setState({log: e});
    };
    handleReloadCalendar = (a) =>{
        this.setState({reload: a});
    };

    handleKeyPress = (event) => {
        switch (event.key){
            case 'c':
                this.setState({showClock: true});
                this.setState({showCalendar: !this.state.showCalendar});
                break;
            case 't':
                this.setState({showClock: !this.state.showClock});
                this.setState({showGoogleCalendar: false});
                this.setState({showCalendar: false});
                break;
            case 'w':
                this.setState({showWeather: !this.state.showWeather});
                break;
            case 'n':
                this.setState({showNews: !this.state.showNews});
                break;
            case 's':
                this.setState({showDatabaseSentence: !this.state.showDatabaseSentence});
                break;
            case 'g':
                this.setState({showClock: true});
                this.setState({showGoogleCalendar: !this.state.showGoogleCalendar});
                break;
            case 'a':
                this.setState({showAll: !this.state.showAll});
                if(this.state.showAll === false){
                    this.setState({showCalendar: true});
                    this.setState({showClock: true});
                    this.setState({showWeather: true});
                    this.setState({showNews: true});
                    this.setState({showDatabaseSentence: true});
                    this.setState({showGoogleCalendar: true});

                }else{
                    this.setState({showCalendar: false});
                    this.setState({showClock: false});
                    this.setState({showWeather: false});
                    this.setState({showNews: false});
                    this.setState({showDatabaseSentence: false});
                    this.setState({showGoogleCalendar: false});
                }
                break;
            // case 'h':                                        //help to display in the future
            //     this.setState({showCalendar: false});
            //     this.setState({showClock: false});
            //     this.setState({showWeather: false});
            //     this.setState({showNews: false});
            //     this.setState({showDatabaseSentence: false});
            //     this.setState({showGoogleCalendar: false});
            //     break;
            default:
                break;

        }
    };

    render() {
        return (
            <div>
                <input type='text' id='one' onKeyPress={this.handleKeyPress}/>
                <div id='leftSite'>
                    {this.state.showClock && <Clock id='clock' handleReloadCalendar={this.handleReloadCalendar}/>}
                    {this.state.showClock && this.state.showCalendar && <Calendar reload={this.state.reload}/>}
                    {this.state.showClock && this.state.showGoogleCalendar  && <GoogleCalendar id='googleCalendar' reload={this.state.reload}/>}
                </div>
                <div id='rightSite'>
                    {this.state.showWeather && <Weather/>}
                </div>
                <div className='clear'/>
                    {this.state.showDatabaseSentence && <DatabaseSentence/>}
                    {this.state.showNews && <News/>}
            </div>
        );
    }
}

export default App;
