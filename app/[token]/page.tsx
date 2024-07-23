export default function TokenPage({ params }: { params: { token: string } }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Hello World</h1>
            <p>Token: {params.token}</p>
        </div>
    );
}
