import axios from 'axios';

const URL = 'http://localhost:4000';

class UserService {
    loginUser = async (username, password) => {
        try {
            const credentials = {
                'username': username,
                'password': password
            };
        
            let response = await axios.post(URL + '/login', { 'credentials': credentials });
            let data = response.data;
            return data;   
        } catch (error) {
            throw error;
        }
    };
    
    registerUser = async (username, password) => {
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
    };

    getUser = async (userId) => {
        try {
            let response = await axios.get(URL + '/users/' + userId);
            let user = response.data;
            return user;
        } catch (error) {
            throw error;
        }
    }
}

const userService = new UserService();
export default userService;