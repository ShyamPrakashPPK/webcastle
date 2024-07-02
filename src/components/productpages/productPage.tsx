"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store/store";
import {
    productSelectors,
    getProducts
} from "@/store/reducers/product";
import ProductCard from "@/components/cards/ProductCards";
import Loader from "../Loader/Loader";
import Filters from "@/components/productpages/productFilter";
import { Product } from "@/lib/types/productTypes";

const ProductsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        data: getProductsData,
        loading: getProductsLoading,
        error: getProductsError,
    } = useSelector(productSelectors.getProducts);

    const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<any>({ rating: null, priceRange: [0, 1000], discount: null });
    const [page, setPage] = useState(0);
    const limit = 30;

    useEffect(() => {
        dispatch(getProducts({ limit, skip: page * limit }));
    }, [dispatch, page]);

    useEffect(() => {
        if (getProductsData && getProductsData.products) {
            setLoadedProducts(getProductsData.products);
        }
    }, [getProductsData]);

    useEffect(() => {
        if (getProductsData && getProductsData.products) {
            let filteredProducts = getProductsData.products;

            if (filters.rating) {
                filteredProducts = filteredProducts.filter((product: { rating: number; }) => product.rating >= filters.rating);
            }

            if (filters.priceRange) {
                filteredProducts = filteredProducts.filter((product: { price: number; }) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
            }

            if (filters.discount) {
                filteredProducts = filteredProducts.filter((product: { discountPercentage: number; }) => product.discountPercentage >= filters.discount);
            }

            setLoadedProducts(filteredProducts);
        }
    }, [filters, getProductsData]);

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="h-full md:p-10">
            {getProductsLoading ? (
                <div className="flex justify-center items-start h-[100vh] text-3xl font-light text-green-500">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col md:flex-row ">
                    <div>
                        <Filters onFilterChange={handleFilterChange} />
                    </div>
                    <div>
                        <div className="flex justify-center mt-4">
                            <button
                                disabled={page === 0}
                                onClick={() => handlePageChange(page - 1)}
                                className="p-2 bg-gray-300 rounded"
                            >
                                Previous
                            </button>
                            <div className="ml-2 p-2 bg-gray-300 rounded" >{page + 1}</div>

                            <button
                                disabled={page >= Math.ceil(getProductsData?.total / limit) - 1}
                                onClick={() => handlePageChange(page + 1)}
                                className="p-2 bg-gray-300 rounded ml-2"
                            >
                                Next
                            </button>
                        </div>
                        {loadedProducts.length > 0 ? (
                            <div className="grid md:gap-7 grid-cols-1 md:grid-cols-4 md:px-5 md:pb-10">
                                {loadedProducts.map((product: any, index) => (
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
            <div className="flex justify-center mt-4">
                <button
                    disabled={page === 0}
                    onClick={() => handlePageChange(page - 1)}
                    className="p-2 bg-gray-300 rounded"
                >
                    Previous
                </button>
                <div className="ml-2 p-2 bg-gray-300 rounded" >{page + 1}</div>
                <button
                    disabled={page >= Math.ceil(getProductsData?.total / limit) - 1}
                    onClick={() => handlePageChange(page + 1)}
                    className="p-2 bg-gray-300 rounded ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
