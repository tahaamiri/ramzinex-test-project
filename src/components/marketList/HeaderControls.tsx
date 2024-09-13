import DarkModeToggle from "../DarkModeToggle";
import SearchInput from "./SearchInput";


type HeaderControlsProps = {
    onSearch: (searchValue: string) => void;
}

const HeaderControls = (props: HeaderControlsProps) => {
    return (
        <div className="flex items-center gap-2">
            <SearchInput
                onSearch={props.onSearch}
            />
            <DarkModeToggle />
        </div>
    )
}

export default HeaderControls