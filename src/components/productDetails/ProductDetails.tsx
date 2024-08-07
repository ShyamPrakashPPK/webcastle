"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Product } from '@/lib/types/productTypes'
import productServices from '@/api/axios/products';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import { Star } from 'lucide-react';


const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params.id.toString();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productServices.getSingleProduct(id);
        setProduct(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className='text-xl text-green-600'><Loader /></div>;
  }

  if (error) {
    return <div className='text-xl text-red-600'>Error: {error}</div>;
  }

  return (
    <div className=' text-gray-800 md:p-10'>
      {product ? (
        <div className='flex flex-col'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className=' md:p-4 flex justify-center md:w-1/3'>
              <Image width={1000} height={1000} src={product.images[0]} alt={product.title} className=' md:h-[90vh] w-auto rounded-md' />
            </div>
            <div className='w-2/3'>
              <p className='text-sm mb-2'>{product.brand}</p>
              <h1 className='text-2xl font-bold mb-2'>{product.title}</h1>
              <p className='text-sm font-medium mb-4'>{product.description}</p>
              <p className='text-sm py-1 mb-2 bg-gray-600 rounded-xl px-5 w-min'> {product.category}</p>
              <div className='flex flex-row text-md items-center' ><Star className='p-1' /> {product.rating}</div>
              <p className='text-sm mt-2'>{product.discountPercentage}% off</p>
              <p className='font-bold mb-2 text-2xl'>${product.price}</p>
              <div className="flex flex-row gap-10 text-sm mb-3">
                <p className=''> {product.warrantyInformation}</p>
                <p className=''> {product.shippingInformation}</p>
                <p className=''> {product.availabilityStatus}</p>
              </div>
              <button className='bg-green-500 text-white py-2 px-4 rounded-md mb-4'>Add to Cart</button>
              <p className='text-lg mb-2'>{product.returnPolicy}</p>
              <div className='flex flex-col gap-2 text-sm' >
                <p className='text-md font-bold'>More details</p>
                <p ><strong>Weight:</strong> {product.weight} grams</p>
                <p ><strong>Dimensions:</strong> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
              </div>
            </div>
          </div>
          <div className=' p-10 mt-24'>
            <div>
              <h2 className='text-xl font-bold mb-2'>Reviews:</h2>
              {product.reviews.map((review, index) => (
                <div key={index} className='mb-4 p-2 border rounded-md'>
                  <p className='text-lg'><strong>Rating:</strong> {review.rating}</p>
                  <p className='text-lg'><strong>Comment:</strong> {review.comment}</p>
                  <p className='text-lg'><strong>Reviewer:</strong> {review.reviewerName}</p>
                  <p className='text-lg'><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      ) : (
        <>
        </>
      )}
    </div>
  );
}

export default ProductDetails;