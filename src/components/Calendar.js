import React from 'react';
import '../css/CalendarStyle.css';


class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            date: new Date()
        }
    }
    componentDidMount(){
        let date = new Date();
        let monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let month = date.getMonth();
        let year = date.getFullYear();
             var currentDayNumber = date.getDate(); //sprawdzic pisownie ang
             console.log("currentDayNumber",currentDayNumber);
        let firstDate = monthName[month] + " " + 1 + " " + year; // October 1 2017

        let tmp = new Date(firstDate).toDateString(); // It will show e.g. Sunday October 01 2017
        let firstDayName = tmp.substring(0,3); // getting name (first three leters) of first day of the month
        let dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

        let dayNumber = dayName.indexOf(firstDayName); //1
        let days = new Date(year, month+1, 0).getDate(); //30

        let calendar = getCalendar(dayNumber, days, currentDayNumber);

        document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
        document.getElementById("calendar-dates").appendChild(calendar);

        function getCalendar(dayNumber, days, currentDayNumber){
            console.log(currentDayNumber);
            let table = document.createElement('table');
            let tableRow = document.createElement('tr');
            let dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            let currentDay = currentDayNumber;
                console.log("currentDayNumber",currentDayNumber);
                console.log("currentDay",currentDay);
            //row for the day letters
            for(let i=0; i<7; i++){
                let cell = document.createElement('td'); //komorka - ang. cell
                cell.innerHTML = dayName[i];
                tableRow.appendChild(cell);
            }
            table.appendChild(tableRow);

            //create 2nd row
            tableRow = document.createElement('tr');
            let c;
            for(c=0; c<7; c++){
                if(c === dayNumber){
                    break;
                }
                let cell = document.createElement('td'); //creating blank spaces
                cell.innerHTML = "";
                tableRow.appendChild(cell);
            }

            let count = 1;
            for(; c<7; c++){
                let cell = document.createElement('td');
                cell.innerHTML = count;
                if(currentDayNumber === count){                               //przypisanie aktualnego dnia0
                    currentDay = count;
                }
                count++;
                tableRow.appendChild(cell);
            }
            console.log("currentDay2",currentDay);
            table.appendChild(tableRow);

            //create rest of the date rows
            for(let q=3; q<7; q++){
                tableRow = document.createElement('tr');
                for(let i=0; i<7; i++){
                    if(count === currentDayNumber){                             //przypisanie aktualnego dnia
                        currentDay = count;
                    }
                    else if(count > days){
                        table.appendChild(tableRow);
                            console.log("currentDay4",currentDay);
                            document.getElementById("tmp").innerHTML = currentDay.toString();                  //wypisanie aktualnego dnia
                        return table;
                    }
                    let cell = document.createElement('td');
                    cell.innerHTML = count;
                    count++;
                    tableRow.appendChild(cell);
                }
                console.log("currentDay3",currentDay);
                table.appendChild(tableRow);
            }


            return 0;
        }
    }

    render() {
        return <div id="calendar-container">
            <span id="tmp"/>
            <div id="calendar-header">
                <span id="calendar-month-year"/>
            </div>
            <div id="calendar-dates"/>
        </div>;
    }
}

export default Calendar;