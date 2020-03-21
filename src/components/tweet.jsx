import React from "react";

import styles from "./tweet.module.css";

function Tweet(props) {
  return (
    <li className={styles.TweetCard}>
      <img
        className={styles.TweetAvatar}
        src={props.tweet.image}
        alt={props.tweet.username + " avatar"}
      />
      <div>
        <span>{props.tweet.username}</span>
        <p className={styles.TweetContent}>{props.tweet.text}</p>
      </div>
    </li>
  );
}

export default Tweet;
