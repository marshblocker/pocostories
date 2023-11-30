import axios from 'axios';

const URL = 'http://localhost:4000';
async function registerUser(username, password) {
    try {
        const userInfo = {
            'username': username,
            'password': password    
        };

        let response = await axios.post(URL + '/users', { 'userInfo': userInfo })
        let data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

export {
    registerUser
}