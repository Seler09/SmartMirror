import React from 'react';
import firebase from 'firebase';
import axios from 'axios';

class Logging extends React.Component{





    componentDidMount(){

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

        function loggingWithGoogle() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log("result :" + JSON.stringify(result));
                var token = result.credential.accessToken;
                // The signed-in user info.
                console.log("Token :" + token);
                var user = result.user;
                console.log("Uzytkoenikw dupe kopany :" + JSON.stringify(user));
                console.log('user:', firebase.auth().currentUser)
                if(firebase.auth().currentUser !== null){
                    axios.get('https://www.googleapis.com/calendar/v3/users/me/settings?maxResults=10&key=AIzaSyAR404r2GLCFRZMotNTkP9RyIENhjDKYEI' ).then( (res) => {
                        console.log("CALENDAR DATA: ",res )
                    }). catch( (error) => {
                        console.log("CALLENDAR ERROR: ", error)
                    })
                }
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log("error :" + error);
                var errorMessage = error.message;

                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });


        }
        loggingWithGoogle();

        // function appendPre(message) {
        //     var pre = document.getElementById('content');
        //     var textContent = document.createTextNode(message + '\n');
        //     pre.appendChild(textContent);
        // }
        // function listUpcomingEvents(provider) {
        //     gapi.client.calendar.events.list({
        //         'calendarId': 'primary',
        //         'timeMin': (new Date()).toISOString(),
        //         'showDeleted': false,
        //         'singleEvents': true,
        //         'maxResults': 10,
        //         'orderBy': 'startTime'
        //     }).then(function(response) {
        //         var events = response.result.items;
        //         appendPre('Upcoming events:');
        //
        //         if (events.length > 0) {
        //             for (let i = 0; i < events.length; i++) {
        //                 var event = events[i];
        //                 var when = event.start.dateTime;
        //                 if (!when) {
        //                     when = event.start.date;
        //                 }
        //                 appendPre(event.summary + ' (' + when + ')')
        //             }
        //         } else {
        //             appendPre('No upcoming events found.');
        //         }
        //     });
        // }
        // listUpcomingEvents(provider);

    }

    render(){


        return <div id="loginWithGoogle">

        </div>;
    }
}

export default Logging;