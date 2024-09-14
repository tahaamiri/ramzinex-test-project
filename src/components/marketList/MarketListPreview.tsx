import { CSSProperties } from "react";
import { Pairs } from "../../utils/types"
import MarketItem from "./MarketItem";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from 'react-window';

type MarketListPreviewProps = {
    list: Pairs[];
}

const ITEM_HEIGHT = 45;

const MarketListPreview = (props: MarketListPreviewProps) => {

    const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
        const item = props.list[index];
        return (
            <div style={style}>
                <MarketItem item={item} />
            </div>
        );
    };

    if (props.list.length == 0)
        return (
            <p className="w-full text-center text-sm text-[#41474F] dark:text-[#E4E5E6] mt-10"> موردی یافت نشد.</p>
        )

    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    height={height}
                    width={width}
                    itemSize={ITEM_HEIGHT}
                    itemCount={props.list.length}
                    direction="rtl"
                    className="w-full"
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
    )
}

export default MarketListPreview