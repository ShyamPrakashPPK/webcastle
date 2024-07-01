import Link from "next/link";

interface ProductCardProps {
    id: number;
    title: string;
    rating: number;
    price: number;
    brand: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id,title, rating, price, brand }) => (
    <div className="border p-4 rounded shadow-md pt-24 transition-transform transform hover:scale-105">
        <Link href={`/product/${id}`}>
            <p>Brand: {brand}</p>
            <h2>{title}</h2>
            <p>${price.toFixed(2)}</p>
        </Link>
    </div>
);



export default ProductCard
