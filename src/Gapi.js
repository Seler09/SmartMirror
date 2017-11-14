/* global gapi */

const API_KEY = 'AIzaSyAR404r2GLCFRZMotNTkP9RyIENhjDKYEI';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const CLIENT_ID = '817595799697-coq1p5s1m2uf625nnpfuh558452tgv2l.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const CREDENTIALS = {
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
};

export default class Gapi {
    static initialize() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/client.js';
        document.body.appendChild(script);

        return new Promise((resolve, reject) => {
            script.onload = () => {
                gapi.load('client', () => {
                    gapi.client
                        .init(CREDENTIALS)
                        .then(resolve, reject);
                });
            };
        });
    }

    static getGapi = () => gapi;
}
