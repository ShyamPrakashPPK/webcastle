import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <section>
            <div className='flex flex-col items-center gap-10 text-white font-black bg-gradient-to-r from-green-600 to-emerald-400 m-20 rounded-3xl transition-transform transform hover:scale-105'>
                <div className='flex flex-row p-20'>
                    <div className='text-xl '>
                        Best Deals are now live
                    </div>
                </div>

                <div className='bg-green-400 rounded-lg px-5 m-5 py-2 transition-transform transform hover:scale-105'>
                    <Link href={'/products'}>
                        View all products
                    </Link>

                </div>
            </div>

            <div>
                cards.
            </div>
        </section>
    )
}

export default page
