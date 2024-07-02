import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL

const productServices = {
    getProducts: async (limit = 28, skip = 0) => {
        try {
            const response = await axios.get(`${baseURL}?limit=${limit}&skip=${skip}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },
    getSingleProduct: async (id:string) => {
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
