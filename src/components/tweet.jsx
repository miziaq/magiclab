import React from 'react';

function Tweet(props) {
    return (
        <li  className='tweet-card'>
            <img className='tweet-card__avatar' src={props.tweet.image} alt={props.tweet.username + ' avatar'}></img>
            <div>
                <span>{props.tweet.username}</span>
                <p className="tweet-card__content">{props.tweet.text}</p>
            </div>
        </li>
    )
}

export default Tweet;
