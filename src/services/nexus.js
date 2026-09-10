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

/* POST /posts
Sends new post data to the Express backend to be saved in the MongoDB.
@param {object} postData - The data from our React form (title, content, authorId) */

// @param {FormData} postData - The FormData object containing text and image buffer data. This is necessary for file uploads, as it allows us to send both text and binary data in a single request.
export const createPost = async (postData) => {
    try {
        const response = await nexusClient.post('/posts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data' // override headers 
            }
        });
        //Backend returns the newly created post in response.data.data
        return response.data.data;
    } catch (error) {
        console.error('Error creating post in nexus backend:', error);
        throw error; // Rethrow the error so the calling function can handle it
    }
};

/* DELETE /posts/:id
Tells the Express backend to delete a specific document by its MongoDB _id.
@param {string} postId - The unique _id of the document
@param {string} adminPin - The secret PIN for authorization */
export const deletePost = async (postId, adminPin) => {
    try {
        const response = await nexusClient.delete(`/posts/${postId}`, {
            headers: {
                'x-admin-pin': adminPin // Sending the PIN to backend
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting post ${postId}:`, error);
        throw error;
    }
};