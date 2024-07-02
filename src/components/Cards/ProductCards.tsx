import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: number;
    title: string;
    rating: number;
    price: number;
    brand: string;
    thumbnail: any;
    discountPercentage: any
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, rating, price, brand, thumbnail, discountPercentage }) => (
    <div className=" ">

        <div className="relative m-10  flex transition-transform transform hover:scale-105 w-full max-h-[400px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">

            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-white ">
                <Link href={`/product/${id}`}>
                    <Image className=" " src={thumbnail} alt="thumbnail" width={1000} height={1000} />
                    <span className="absolute top-0 left-0 m-2 rounded-full  px-2 text-center text-sm font-medium text-white bg-green-700">{discountPercentage}% OFF</span>
                </Link>
            </div>
            <div className="mt-4 px-5 pb-5">
                <Link href={`/product/${id}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>

                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-3xl font-bold text-slate-900">${price.toFixed(2)}</span>
                        </p>
                        <div className="flex items-center rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">

                            <Star className="p-1" />
                            <span className="mr-2 ml-1 ">{rating} </span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <ShoppingCart />
                        Add to cart
                    </div >
                </Link>
            </div>
        </div>

    </div >
);



export default ProductCard
