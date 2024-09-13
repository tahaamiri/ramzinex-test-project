
const MarketDetailSkeleton = () => {
    return (
        <>
            <div className="flex flex-col gap-2 items-center justify-center pt-[18px]">
                <div className="size-10 rounded-full bg-gray-200" />
                <div className="w-16 h-3 bg-gray-200 rounded-md" />
            </div>
            <div className="flex flex-col gap-4 px-6 mt-3">
                {[...Array(4)].map((_, index) => (
                    <div className="flex items-center justify-between" key={index}>
                        <div className="w-20 h-3 bg-gray-200 rounded-md" />
                        <div className="w-20 h-3 bg-gray-200 rounded-md" />
                    </div>
                ))}
            </div>
        </>
    )
}

export default MarketDetailSkeleton