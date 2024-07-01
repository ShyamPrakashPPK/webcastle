import Navbar from "@/components/Navbar/Navbar"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="">
            <Navbar />
            <main className="bg-gray-50 h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout