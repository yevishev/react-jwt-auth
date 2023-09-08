import axios from "axios";

export default {
    session: {
        get: async () => {
            return axios.get('/session', {
                withCredentials: true
            }).then((response) => {
                return response.data;
            });
        },

        post: async (email, password) => {
            return axios.post('/session', {
                email,
                password
            }, {
                withCredentials: true
            }).then((response) => {
                return response.data;
            });
        },

        delete: async () => {
            return axios.delete('/session', {
                withCredentials: true
            }).then((response) => {
                return response.data;
            }); 
        }
    }
}