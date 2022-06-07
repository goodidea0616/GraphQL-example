import React from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { LinearProgress } from 'material-ui/Progress';

import Tweet from './Tweet';
import { userFragment, tweetFragment } from './fragments';

const TweetPage = ({ data: { loading, tweet } }) => (
    <div>
        {loading && <LinearProgress />}
        {!loading && <Tweet tweet={tweet} />}
    </div>
);

TweetPage.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        tweet: PropTypes.shape({
            id: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            Author: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                full_name: PropTypes.string.isRequired,
                avatar_url: PropTypes.string.isRequired,
            }).isRequired,
            Stats: PropTypes.shape({
                views: PropTypes.number.isRequired,
                likes: PropTypes.number.isRequired,
                retweets: PropTypes.number.isRequired,
                responses: PropTypes.number.isRequired,
            }).isRequired,
        }),
    }),
};

export const tweetPageQuery = gql`
    query tweetPageQuery($id: ID!) {    
        tweet: Tweet(id: $id) {
            ...TweetFields
        }
    }

    ${userFragment}
    ${tweetFragment}
`;

export default graphql(tweetPageQuery, {
    options: ({ match }) => ({ variables: { id: match.params.id } }) 
})(TweetPage);
