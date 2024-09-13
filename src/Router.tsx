import { Route, Routes } from "react-router-dom"
import { PATH } from "./utils/path"
import MarketList from "./pages/MarketList"
import MarketDetail from "./pages/MarketDetail"

const Router = () => {
    return (
        <Routes>
            <Route path={PATH.home} element={<MarketList />}/>
            <Route path={PATH.detail()} element={<MarketDetail />}/>
        </Routes>
    )
}

export default Router