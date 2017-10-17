import React from 'react';
import '../css/Clock2Style.css';


class Clock2 extends React.Component{



       constructor(){
           super()
            this.state={
               time: new Date()
            }
       }

        currentTime(){
           this.setState({
               time: new Date()
           })
        }

        componentWillMount(){
            setInterval(()=>this.currentTime(),1000)
        }

    render(){
        return <div id="clock2">{this.state.time.toLocaleTimeString()}</div>;
    }
}

export default Clock2;