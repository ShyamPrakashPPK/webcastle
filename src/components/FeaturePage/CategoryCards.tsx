// pages/categories.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store/store";
import {
    categorySelectors,
    getCategories
} from "@/store/reducers/category"; // Adjust import path as per your project structure
import Loader from "../Loader/Loader";
import Image from "next/image";



const CategoriesPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        data: getCategoriesData,
        loading: getCategoriesLoading,
        error: getCategoriesError,
    } = useSelector(categorySelectors.getCategories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const renderCategories = () => {
        if (getCategoriesLoading) {
            return (
                <div className="flex justify-center items-start h-[100vh] text-3xl font-light text-green-500">
                    <Loader />
                </div>
            );
        }

        if (getCategoriesError) {
            return (
                <div className="text-center mt-10 text-red-500">
                    <p>{getCategoriesError}</p>
                </div>
            );
        }

        if (getCategoriesData && getCategoriesData.length > 0) {
            return (
                <div className="flex flex-col text-center items-center justify-center my-10">
                    <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text my-10 text-5xl font-black">
                        Our Products
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:p-10">
                        {getCategoriesData.map((category, index) => (
                            <div key={index} className="bg-green-600 rounded-2xl px-12 py-10">
                                <div className="text-2xl font-bold text-white">{category.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
            );
        }

        return (
            <div className="text-center mt-10">
                <p>No categories available.</p>
            </div>
        );
    };

    return (
        <div className="h-full">
            {renderCategories()}
        </div>
    );
};

export default CategoriesPage;
