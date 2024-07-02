import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryServices from "@/api/axios/category"; // Adjust this path as per your project structure

// Async action to fetch categories
const getCategories = createAsyncThunk(
    "categories/get",
    async () => {
        const response = await categoryServices.getCategories();
        return response;
    }
);
interface Category {
    slug: string;
    name: string;
    url: string;
}

interface CategoryState {
    categories: {
        loading: boolean;
        data: Category[] | null;
        error: string | null;
    };
}

const initialCategoryState: CategoryState = {
    categories: {
        loading: false,
        data: null,
        error: null,
    },
};

const categorySlice = createSlice({
    name: "categories",
    initialState: initialCategoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.categories.loading = true;
                state.categories.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories.loading = false;
                state.categories.data = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.categories.loading = false;
                state.categories.error = action.error.message || 'Failed to fetch categories';
            });
    },
});

// Selectors
const categorySelectors = {
    getCategories: (state: { categories: CategoryState }) => state.categories.categories,
};

export const { } = categorySlice.actions;

export { getCategories, categorySelectors };

export default categorySlice.reducer;

