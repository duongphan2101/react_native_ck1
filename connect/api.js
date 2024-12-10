import axios from 'axios';

const API_URL = 'https://6757fbbec0a427baf94ecc2e.mockapi.io/users';

class ApiService {
    // Create
    async createResource(data) {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating resource:', error);
            throw error;
        }
    }

    // Read
    async getResources() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
            throw error;
        }
    }

    // Update
    async updateResource(id, data) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating resource:', error);
            throw error;
        }
    }

    // Delete
    async deleteResource(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting resource:', error);
            throw error;
        }
    }
}

export default new ApiService(); // Tạo một instance để sử dụng trong các file khác
