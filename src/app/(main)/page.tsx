import CategoriesPage from '@/components/productpages/categoriesCards'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <section className=''>
            <div className='h-[50vh]'>
                <div className=' flex flex-col items-center gap-10 text-white font-black bg-gradient-to-r from-green-600 to-emerald-400 m-5 md:m-20 rounded-3xl transition-transform transform hover:scale-105'>
                    <div className='flex flex-row p-5 text-center md:p-20'>
                        <div className=' bg-gradient-to-r from-blue-300 via-green-200 to-indigo-200 inline-block text-transparent bg-clip-text my-10 text-5xl font-black '>
                            Best Deals are now live
                        </div>
                    </div>

                    <div className='bg-green-400 rounded-lg px-5 m-5 py-2 transition-transform transform hover:scale-105'>
                        <Link href={'/products'}>
                            View all products
                        </Link>

                    </div>
                </div>
            </div>


            <div>
                <CategoriesPage />
            </div>
        </section>
    )
}

export default page
