// pages/products.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store/store";
import {
    productSelectors,
    getProducts
} from "@/store/reducers/product";
import ProductCard from "../Cards/ProductCards";
import Loader from "../Loader/Loader";
import Filters from "./Filters";



const ProductsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        data: getProductsData,
        loading: getProductsLoading,
        error: getProductsError,
    } = useSelector(productSelectors.getProducts);

    const [loadedProducts, setLoadedProducts] = useState<any[]>([]);
    const [filters, setFilters] = useState<any>({ rating: null, priceRange: [0, 1000], discount: null });

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (getProductsData && getProductsData.products) {
            setLoadedProducts(getProductsData.products);
        }
    }, [getProductsData]);

    useEffect(() => {
        if (getProductsData && getProductsData.products) {
            let filteredProducts = getProductsData.products;

            if (filters.rating) {
                filteredProducts = filteredProducts.filter(product => product.rating >= filters.rating);
            }

            if (filters.priceRange) {
                filteredProducts = filteredProducts.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
            }

            if (filters.discount) {
                filteredProducts = filteredProducts.filter(product => product.discountPercentage >= filters.discount);
            }

            setLoadedProducts(filteredProducts);
        }
    }, [filters, getProductsData]);

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    return (
        <div className="h-full p-10">

            {getProductsLoading ? (
                <div className="flex justify-center items-start h-[100vh] text-3xl font-light text-green-500">
                    <Loader />
                </div>
            ) : (
                <div className="flex ">
                    <div>
                        <Filters onFilterChange={handleFilterChange} />
                    </div>
                    <div>
                        {loadedProducts.length > 0 ? (
                            <div className="grid gap-7 grid-cols-1 md:grid-cols-4 px-5 pb-10">
                                {loadedProducts.map((product, index) => (

                                    <ProductCard
                                        key={index}
                                        id={product.id}
                                        title={product.title}
                                        rating={product.rating}
                                        price={product.price}
                                        brand={product.brand}
                                        thumbnail={product.thumbnail}
                                        discountPercentage={product.discountPercentage}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center mt-10">
                                <p>No products available.</p>
                            </div>
                        )}
                    </div>



                </div>
            )}
            {getProductsError && (
                <div className="text-center mt-10 text-red-500">
                    <p>{getProductsError}</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
