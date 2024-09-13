
type MarketDetailRowProps = {
    label: string;
    value: string;
}

const MarketDetailRow = (props: MarketDetailRowProps) => {
    return (
        <div className="flex items-center justify-between py-1">
            <span className="text-[#62676E] dark:text-[#E4E5E6] text-xs font-normal">
                {props.label}
            </span>
            <span className="text-[#41474F] dark:text-[#E4E5E6] text-xs font-normal" dir="ltr">
                {props.value}
            </span>
        </div>
    )
}

export default MarketDetailRow