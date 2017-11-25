import React, { Component } from 'react';
import Gapi from '../Gapi';
import '../css/googleCalStyle.css';

export default class GoogleCalendar extends Component {
    gapi = Gapi.getGapi();

    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            events: []
        };
    }
        handleLogin = () => {
            let thisState = this;
          //  e.preventDefault();
            this.gapi.auth2.getAuthInstance().signIn().then(
                () => {
                    this.setState({logged: true});
                    this.gapi.client.calendar.events.list({
                        calendarId: 'primary',
                        timeMin: new Date(Date.now()).toISOString(),
                        timeMax: new Date(Date.now() + 86400000).toISOString(),
                    }).then(
                        (data) => {
                            //
                            // console.log(data);
                            //
                            // let i = data.result.items.length - 1;
                            // console.log(data.result.items[i].summary);
                            thisState.setState({
                                events: data.result.items
                            })

                        }
                    );
                },
            );
        };

        handleLogout = (e) => {
            e.preventDefault();
            this.gapi.auth2.getAuthInstance().signOut().then(
                () => this.setState({logged: false}),
            )
        };


    componentWillReceiveProps(nextProps){
        if(nextProps.reload===true){
            this.handleLogin();
        }
    }

    render() {

        let listOfEvents = this.state.events.map((event) => {
            return <div id="oneEvent">{event.start.dateTime.substring(0,4)}.{event.start.dateTime.substring(5,7)}.{event.start.dateTime.substring(8,10)} {event.start.dateTime.substring(11,16)+'   '} {'   '+event.summary}</div>
        })
        if (this.state.logged) {
            return <div>
                <button id='button2' onClick={this.handleLogout}>Logout from google (or click Tab to edit)</button>
                <div id='header'>Google tasks                       </div>
                <div id='listOfEvents'>{listOfEvents}</div>
            </div>
        }
        return <div>
            <button  id='button' onClick={this.handleLogin}>SignIn / SignOut with google (Tab + Enter)</button>
        </div>
    }
}
