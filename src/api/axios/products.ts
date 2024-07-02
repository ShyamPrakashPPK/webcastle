import axios from "axios";

const baseURL = 'https://dummyjson.com/products';

const productServices = {
    getProducts: async () => {
        try {
            const response = await axios.get(baseURL);
            return response.data; 
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error; 
        }
    },
    getSingleProduct: async (id: string) => {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    }
};

export default productServices;
