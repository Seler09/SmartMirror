import React from 'react';
import firebase from 'firebase';
import "../css/DatabaseSentenceStyle.css";


class DatabaseSentence extends React.Component{



    constructor(){
        super();
        this.state={
            text: "Loading"
        }
    }


    componentDidMount(){
        let originalArray = Array(55).fill().map((e,i)=>i);
        let myArray = [...originalArray];
        let numberOfSentences = myArray.length;
        let numberOfDisplayedSentences = 0;
        let thisState = this;

        function shuffle(a){
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

        shuffle(myArray);

        function displaySentence(arrayOfNumbers,arrayLenght,stencil){
            if(arrayLenght === numberOfDisplayedSentences){
                numberOfDisplayedSentences = 0;
                arrayOfNumbers = [...stencil];
                shuffle(arrayOfNumbers);
            }

            let ref = firebase.database().ref().child('Sentences').child(arrayOfNumbers[numberOfDisplayedSentences]);
            ref.on('value', function (snap) {  //snapshot
                thisState.setState({text: snap.val()});
            }, error => console.log(error));
            numberOfDisplayedSentences++;
            setInterval(function () {displaySentence(myArray,numberOfSentences,originalArray);},21600000); //6h
        }

        displaySentence(myArray,numberOfSentences,originalArray);
    }

    render(){
        // this.sentence();
        return <div id="sentence">{this.state.text}</div>;
    }
}

export default DatabaseSentence;