import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "@/api/axios/products";

const getProducts = createAsyncThunk(
    "get/products",
    async () => {
        const response = await productServices.getProducts();
        return response; 
    }
);


interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    thumbnail: string;
    images: string[];
}

interface ProductState {
    getProducts: {
        loading: boolean;
        data: {
            products: Product[];
            total: number;
            skip: number;
            limit: number;
        } | null;
        error: string | null;
    };
}

const initialState: ProductState = {
    getProducts: {
        loading: false,
        data: null,
        error: null,
    },
};

// Product Slice
const productSlice:any = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder:any) => {
        builder
            .addCase(getProducts.pending, (state:any) => {
                state.getProducts.loading = true;
                state.getProducts.error = null;
            })
            .addCase(getProducts.fulfilled, (state:any, action: any) => {
                state.getProducts.loading = false;
                state.getProducts.data = action.payload;
            })
            .addCase(getProducts.rejected, (state:any, action:any) => {
                state.getProducts.loading = false;
                state.getProducts.error = action.error.message || 'Failed to fetch products';
            });
    },
});

// Selectors
const productSelectors = {
    getProducts: (state: { product: ProductState }) => state.product.getProducts,
};

export const {  } = productSlice.actions;

export { getProducts, productSelectors };

export default productSlice.reducer;