import React, { Component } from 'react';
import Gapi from '../Gapi';

export default class GoogleCalendar extends Component {
    gapi = Gapi.getGapi();

    constructor(props) {
        super(props);

        this.state = {
            logged: false,
        };
    }

    render() {
        if (this.state.logged) {
            return <button onClick={this.handleLogout}>Log out</button>;
        }

        return <button onClick={this.handleLogin}>Log In</button>;
    }


    handleLogin = (e) => {
        e.preventDefault();
        this.gapi.auth2.getAuthInstance().signIn().then(
            () => {
                this.setState({ logged: true });
                this.gapi.client.calendar.events.list({
                    calendarId: 'primary',
                    timeMin: new Date(Date.now() - 86400000).toISOString(),

                }).then(console.log);
            },
        );
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.gapi.auth2.getAuthInstance().signOut().then(
            () => this.setState({ logged: false }),
        )
    }
}
