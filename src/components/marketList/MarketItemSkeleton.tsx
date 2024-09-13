
const MarketItemSkeleton = () => {
    return (
        <div className="w-full">
            {[...Array(10)].map((_, index) => (
                <div className="flex items-center justify-between w-full py-2" key={index}>
                    <div className="flex items-center gap-[11px]">
                        <div className="size-7 rounded-full bg-gray-200 animate-pulse" />
                        <div className="w-24 h-5 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                    <div className="w-24 h-5 bg-gray-200 animate-pulse rounded-md" />
                </div>
            ))}
        </div>

    )
}

export default MarketItemSkeleton