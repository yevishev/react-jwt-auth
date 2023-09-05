import axios from "axios";

export default {
    session: {
        get: async () => {
            const response = await axios.get('/session', {
                withCredentials: true
            });
            return response.data;
        },

        post: async (email, password) => {
            const response = await axios.post('/session', {
                email,
                password
            }, {
                withCredentials: true
            });
            return response.data;
        },

        delete: async () => {
            const response = await axios.delete('/session', {
                withCredentials: true
            });
            return response.data;
        }
    }
}