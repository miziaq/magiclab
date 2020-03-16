import React from 'react';
import Tweet from './tweet';


class TweetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        setInterval(
            () => this.getTweets(),
            2000
        );
    }

    async getTweets() {
        const endpoint = 'https://magiclab-twitter-interview.herokuapp.com/candidate-name/'
        const lastId = (this.state.tweets.length && this.state.tweets[0].id) || 0;
        if (lastId >= 10000) {
            fetch(endpoint + 'reset')
                .then(() => {
                    this.setState((state) => {
                        return { tweets: [] }
                    });
                })
                .catch((e) => {
                    console.warn(e);
                });
            }

        const lastTimestamp = (this.state.tweets.length && this.state.tweets[0].timeStamp) ? this.state.tweets[0].timeStamp : '';
        fetch(endpoint + 'api?afterTime=' + lastTimestamp, { mode: 'cors' })
            .then((res) => res.json())
            .then((tweetArray) => {
                if (!tweetArray.length) {
                    return;
                }

                const indexDelta = tweetArray[0].id - lastId;

                this.setState((state) => {
                    return { tweets: tweetArray.slice(0, indexDelta).concat(state.tweets) }
                });
            }).catch(() => {
                // fail silently (and emit to Sentry)
            });
    }

    buildList() {
        const rows = [];

        this.state.tweets.forEach((tweet) => {
            rows.push(<Tweet tweet={tweet} />);
        });

        return rows;
    }

    render() {
        return (
            <ol className="tweet-list">
                {this.buildList()}
            </ol>
        );
    }
}

export default TweetList;
