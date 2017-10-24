import React from 'react';
import axios from 'axios';

class News extends React.Component{



    render(){
        axios.get('https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=19ccda19326f405e9d2235b8aa818993')
            .then((news)=> {
                console.log(news);
            })


        return <div id="news"></div>;
    }
}

export default News;