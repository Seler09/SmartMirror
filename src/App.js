import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
    constructor() {
        super();
        this.state = {
            showCalendar: false
        }
    }
    onClick(e){
        e.preventDefault();
        this.setState({showCalendar: !this.state.showCalendar})
    }

    handleKeyPress = (event) => {
        if(event.key === 'c'){
            this.setState({showCalendar: !this.state.showCalendar})
        }
    }






  render() {
    return (
        <div>
            <input type="text" id="one" onKeyPress={this.handleKeyPress} />
            {this.state.showCalendar && < Calendar/>}
            <div>
                <Calendar/>
            </div>
        </div>
    );
  }
}

export default App;
