// pages/products.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store/store";
import {
    productSelectors,
    getProducts
} from "@/store/reducers/product";

interface ProductCardProps {
    title: string;
    rating: number;
    price: number;
    brand: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, rating, price, brand }) => (
    <div className="border p-4 rounded shadow-md">
        <h2 className="font-bold text-lg">{title}</h2>
        <p>Rating: {rating}</p>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Brand: {brand}</p>
    </div>
);

const ProductsPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const {
        data: getProductsData,
        loading: getProductsLoading,
        error: getProductsError,
    } = useSelector(productSelectors.getProducts);

    const [loadedProducts, setLoadedProducts] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (getProductsData && getProductsData.products) {
            setLoadedProducts(getProductsData.products);
        }
    }, [getProductsData]);

    return (
        <div className="h-full p-10">
            <div className="flex flex-col md:flex-row pb-4">
                <div className="self-center">
                    <h1 className="font-bold text-xl">All Products</h1>
                    <h2 className="font-extralight text-sm text-gray-500">
                        See all available products here!
                    </h2>
                </div>
            </div>
            {getProductsLoading ? (
                <div className="flex justify-center items-start h-[100vh] text-3xl font-light text-green-500">
                   Loading
                </div>
            ) : (
                <div>
                    {loadedProducts.length > 0 ? (
                        <div className="grid gap-7 grid-cols-1 md:grid-cols-4 px-5 pb-10">
                            {loadedProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    title={product.title}
                                    rating={product.rating}
                                    price={product.price}
                                    brand={product.brand}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-10">
                            <p>No products available.</p>
                        </div>
                    )}
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
