import React from 'react';
import Tweet from './tweet';

function TweetList(props) {
    const rows = [];
    props.tweets.forEach((tweet) => {
        rows.push(<Tweet tweet={tweet}/>);
    });

    return (
        <ol className="tweet-list">
            {rows}
        </ol>
    )
}

export default TweetList;
