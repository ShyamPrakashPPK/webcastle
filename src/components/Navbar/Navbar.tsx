import { UserButton } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='px-4 py-2 md:px-10 md:py-4 flex flex-row items-center justify-between bg-gray-200 border-gray-300 border-b-2'>
            <div className='text-green-600 font-black text-lg md:text-xl select-none'>
                <Link href={'/'}>
                    WebCastleStore
                </Link>
                <Link className='text-[14px] font-medium ml-12 text-gray-600 hover:bg-gray-400 rounded-md transition-transform px-3 py-1' href={'/products'}>
                    All Products
                </Link>
            </div>
            <div className='flex flex-row items-center gap-3 md:gap-5'>
                <ShoppingCart className='h-6 w-6 ' />
                <UserButton appearance={{
                    elements: {
                        avatarBox: "h-[30px] w-[30px] md:h-[40px] md:w-[40px]",
                    },
                }} />
            </div>
        </div>
    )
}

export default Navbar
