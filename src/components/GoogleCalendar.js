import React, { Component } from 'react';
import Gapi from '../Gapi';

export default class GoogleCalendar extends Component {
    gapi = Gapi.getGapi();

    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            events: []
        };
    }
        handleLogin = (e) => {
            let thisState = this;
            e.preventDefault();
            this.gapi.auth2.getAuthInstance().signIn().then(
                () => {
                    this.setState({logged: true});
                    this.gapi.client.calendar.events.list({
                        calendarId: 'primary',
                        timeMin: new Date(Date.now() - 86400000).toISOString(),

                    }).then(
                        (data) => {

                            console.log(data);

                            let i = data.result.items.length - 1;
                            console.log(data.result.items[i].summary);

                            thisState.setState({
                                events: data.result.items
                            })

                        }
                    );
                },
            );
        }

        handleLogout = (e) => {
            e.preventDefault();
            this.gapi.auth2.getAuthInstance().signOut().then(
                () => this.setState({logged: false}),
            )
        }

    render() {

        let listOfEvents = this.state.events.map((event) => {
            return <div>{event.start.dateTime.substring(0,4)}.{event.start.dateTime.substring(5,7)}.{event.start.dateTime.substring(8,10)} {event.start.dateTime.substring(11,16)} {event.summary}</div>

        })
        if (this.state.logged) {
            return <div>
                <button onClick={this.handleLogout}>Log out</button>
                <div>{listOfEvents}</div>
            </div>
        }
        return <div>
            <button onClick={this.handleLogin}>Log In</button>
        </div>
    }



}
