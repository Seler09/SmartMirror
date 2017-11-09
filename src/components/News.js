import React from 'react';
import axios from 'axios';
import '../css/NewsStyle.css'

class News extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            firstMessage: "Loading...",
            secondMessage: "Loading...",
            thirdMesssage: "Loading..."
        }
    }

    componentDidMount(){
        let thisState = this;
        axios.get('https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=19ccda19326f405e9d2235b8aa818993')
            .then((news)=> {
                thisState.setState({
                    firstMessage: news.data.articles[0].title,
                    secondMessage: news.data.articles[1].title,
                    thirdMesssage: news.data.articles[2].title
                })
            })
    }

    render(){
        return <div id="news">
            <div id="newsHeader"><h2>News</h2></div>
            <div id="newsBody">
            <p className="newsTitle">{this.state.firstMessage}</p>
                <p className="newsTitle">{this.state.secondMessage}</p>
                    <p className="newsTitle">{this.state.thirdMesssage}</p>
            </div>
        </div>;
    }
}

export default News;