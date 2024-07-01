"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const ProductDetails = () => {

    const params = useParams();

    const id = params.id.toString();
    return (
        <div className='text-xl font-black text-green-500'>
            {id}
        </div>
    )
}

export default ProductDetails;
