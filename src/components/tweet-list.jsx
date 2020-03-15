import React from 'react';
import Tweet from './tweet';

class TweetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: <p className='no-content'>Waiting for content to render</p>,
            tweets: []
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.getTweets(),
            2000
        );
        this.getTweets();
    }

    async getTweets() {
        const rows = [];
        const lastTimestamp = (this.state.tweets.length && this.state.tweets[0].timeStamp) ? this.state.tweets[0].timeStamp : '';
        const lastId = (this.state.tweets.length && this.state.tweets[0].id) || 0;

        fetch(`https://magiclab-twitter-interview.herokuapp.com/candidate-name/api?afterTime=${ lastTimestamp }`, { mode: 'cors' })
            .then((res) => res.json())
            .then((tweetArray) => {
                if (!tweetArray.length) {
                    return;
                }

                const indexDelta = tweetArray[0].id - lastId;

                this.setState({ tweets: tweetArray.slice(0, indexDelta).concat(this.state.tweets) });
                
                this.state.tweets.forEach((tweet) => {
                    rows.push(<Tweet tweet={tweet} />);
                });

                this.setState({
                    content: <ol className='tweet-list'>
                        {rows}
                    </ol>
                })
            }).catch(() => {
                // fail silently (and emit to Sentry)
            });
    }

    render() {
        return (this.state.content);
    }
}

export default TweetList;
