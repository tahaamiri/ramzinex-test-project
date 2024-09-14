import ArrowIcon from '../../assets/svg/ArrowIcon';
import { SortOrderType } from '../../utils/types';


type SortableColumnProps = {
    label: string;
    sortOrder?: SortOrderType;
    onSort: () => void;
}

const SortableColumn = (props: SortableColumnProps) => {
    return (
        <div className='flex items-center gap-5 cursor-pointer' onClick={props.onSort}>
            <span className='text-[#8F9398] text-xs font-medium'>{props.label}</span>
            <div className='flex flex-col gap-1'>
                <ArrowIcon className={`${props.sortOrder === 'Ascending' ? "fill-orange-500" : "fill-[#E0E0E0] "}`} />
                <ArrowIcon className={`${props.sortOrder === 'Descending' ? "fill-orange-500" : "fill-[#E0E0E0]"} rotate-180`} />
            </div>
        </div>
    )
}

export default SortableColumn