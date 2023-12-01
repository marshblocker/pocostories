import axios from "axios";

const URL = "http://localhost:4000";

class RatingService {
    getRatings = async (storyId) => {
        try {
            let response = await axios.get(URL + '/stories/' + storyId + '/ratings')
            let ratings = response.data;
            return ratings;
        } catch (error) {
            throw error;
        }
    }

    createRating = async (comment, rating, storyId, username) => {
        try {
            let response = await axios.post(URL + '/stories/' + storyId + '/ratings', {
                comment: comment,
                rating: rating,
                story_id: storyId,
                username: username
            });
            let newRating = response.data;
            return newRating;
        } catch (error) {
            throw error;
        }
    }

    hasRatedAlready = async (username, storyId) => {
        try {
            if (username === null) {
                return true;
            }

            let response = await axios.get(URL + '/stories/' + storyId + '/ratings?username=' + username)
            let rating = response.data;
            
            if (rating.length === 1) {
                return true
            } else if (rating.length === 0) {
                return false
            } else {
                throw new Error('Found more than one rating for a page by a same user.');
            }
        } catch (error) {
            throw error;
        }
    }
}

const ratingService = new RatingService();
export default ratingService;