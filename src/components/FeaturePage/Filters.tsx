"use client"
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider"


const Filters: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [discount, setDiscount] = useState<number | null>(null);

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : null;
        setRating(value);
        onFilterChange({ rating: value, priceRange, discount });
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseInt(e.target.value);
        const newRange = [...priceRange] as [number, number];
        newRange[index] = value;
        setPriceRange(newRange);
        onFilterChange({ rating, priceRange: newRange, discount });
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : null;
        setDiscount(value);
        onFilterChange({ rating, priceRange, discount: value });
    };

    return (
        <div className=" p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="mb-4">
                <label className="block mb-2">Rating</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={handleRatingChange}>
                    <option value="">All Ratings</option>
                    <option value="1">1 Star & Up</option>
                    <option value="2">2 Stars & Up</option>
                    <option value="3">3 Stars & Up</option>
                    <option value="4">4 Stars & Up</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Price Range</label>
                <div className="flex space-x-2">
                    <input type="number" className="w-full p-2 border border-gray-300 rounded-md" value={priceRange[0]} onChange={(e) => handlePriceRangeChange(e, 0)} placeholder="Min" />
                    <input type="number" className="w-full p-2 border border-gray-300 rounded-md" value={priceRange[1]} onChange={(e) => handlePriceRangeChange(e, 1)} placeholder="Max" />
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Discount</label>
                <select className="w-full p-2 border border-gray-300 rounded-md" onChange={handleDiscountChange}>
                    <option value="">All Discounts</option>
                    <option value="10">10% & Up</option>
                    <option value="20">20% & Up</option>
                    <option value="30">30% & Up</option>
                    <option value="40">40% & Up</option>
                    <option value="50">50% & Up</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
