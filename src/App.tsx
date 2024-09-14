import useGetMarketList from "./hooks/useGetMarketList"
import useToggleDarkMode from "./hooks/useToggleDarkMode";
import Router from "./Router"

function App() {

    useToggleDarkMode();
    useGetMarketList();

    return (
        <Router />
    )
}

export default App
