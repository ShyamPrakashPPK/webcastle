
import axios from "axios";

// const baseURL = 'https://dummyjson.com/products';

const baseURL = process.env.NEXT_PUBLIC_API_URL

const categoryServices = {
    getCategories: async () => {
        try {
            const response = await axios.get(`${baseURL}/categories`);
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }
};

export default categoryServices;
