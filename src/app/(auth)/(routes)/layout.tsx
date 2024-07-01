
const AuthLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <main className="h-full">
                {children}
            </main>
        </div>

    )
}

export default AuthLayout