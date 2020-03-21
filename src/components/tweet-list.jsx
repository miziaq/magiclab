import React from "react";
import Tweet from "./tweet";

import styles from "./tweet-list.module.css";

class TweetList extends React.Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    };
  }

  componentDidMount() {
    setInterval(() => this.updateTweets(), 2000);
  }

  async updateTweets() {
    const endpoint =
      "https://magiclab-twitter-interview.herokuapp.com/candidate-name";
    const lastId = (this.state.tweets.length && this.state.tweets[0].id) || 0;
    if (lastId >= 10000) {
      fetch(endpoint + "reset")
        .then(() => {
          this.setState(state => {
            return { tweets: [] };
          });
        })
        .catch(() => {
          // fail silently (and emit to Sentry)
        });
    }

    const lastTimestamp =
      this.state.tweets.length && this.state.tweets[0].timeStamp
        ? this.state.tweets[0].timeStamp
        : "";
    fetch(endpoint + "/api?count=1&afterTime=" + lastTimestamp, {
      mode: "cors"
    })
      .then(res => res.json())
      .then(tweetArray => {
        if (!tweetArray.length) {
          return;
        }

        const indexDelta = tweetArray[0].id - lastId;

        this.setState(state => {
          return {
            tweets: tweetArray.slice(0, indexDelta).concat(state.tweets)
          };
        });
      })
      .catch(() => {
        // fail silently (and emit to Sentry)
      });
  }

  buildList() {
    const rows = [];

    this.state.tweets.forEach(tweet => {
      rows.push(<Tweet key={tweet.id} tweet={tweet} />);
    });

    return this.state.tweets.length ? (
      rows
    ) : (
      <li className={styles.NoContent}>Waiting for content...</li>
    );
  }

  render() {
    return <ol className={styles.TweetList}>{this.buildList()}</ol>;
  }
}

export default TweetList;
