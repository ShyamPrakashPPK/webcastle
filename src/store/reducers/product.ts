import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "@/api/axios/products";


interface FetchProductsParams {
    limit: number;
    skip: number;
}


const getProducts = createAsyncThunk(
    "get/products",
    async ({ limit, skip }: FetchProductsParams) => {
        const response = await productServices.getProducts(limit, skip);
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

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.getProducts.loading = true;
                state.getProducts.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.getProducts.loading = false;
                state.getProducts.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.getProducts.loading = false;
                state.getProducts.error = action.error.message || 'Failed to fetch products';
            });
    },
});

const productSelectors = {
    getProducts: (state:any) => state.product.getProducts,
};

export { getProducts, productSelectors };

export default productSlice.reducer;
