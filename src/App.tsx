import useGetMarketList from "./hooks/useGetMarketList"
import useToogleDarkMode from "./hooks/useToogleDarkMode";
import Router from "./Router"

function App() {

    useToogleDarkMode();
    useGetMarketList();

    return (
        <Router />
    )
}

export default App
