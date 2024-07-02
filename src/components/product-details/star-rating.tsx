export const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className='flex'>
            {[...Array(fullStars)].map((_, index) => (
                <svg key={index} className='w-6 h-6 text-yellow-500' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 .587l3.668 7.431L24 9.751l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.598l-6-5.847 8.332-1.733z' />
                </svg>
            ))}
            {halfStars === 1 && (
                <svg className='w-6 h-6 text-yellow-500' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 .587l3.668 7.431L24 9.751l-6 5.847L19.335 24 12 20.201V.587z' />
                </svg>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={index} className='w-6 h-6 text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 .587l3.668 7.431L24 9.751l-6 5.847L19.335 24 12 20.201 4.665 24 6 15.598l-6-5.847 8.332-1.733z' />
                </svg>
            ))}
        </div>
    );
};