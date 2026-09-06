import axios from 'axios';

// Pull the backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL;

// Create a pre-configured Axios instance
//baseURL ensures we don't have to type the full URL every time we make a request
export const nexusClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json' // Explicitly telling Express we are sending JSON data in the request body
    }
});

/* Get /posts
Fetches all posts from the MongoDB database via the Express backend */

export const fetchPosts = async () => {
    try {
        const response = await nexusClient.get('/posts');

        //Our Express route wraps the data in a data object { success: true, data: [...]}
        return response.data.data;
    } catch (error) {
        console.error('Error fetching posts from nexus backend:', error);
        throw error; // Rethrow the error so the calling function can handle it
    }
};