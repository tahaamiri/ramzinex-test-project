import { useEffect, useState } from "react";
import { DarkMode } from "../utils/enums";



const useToogleDarkMode = (mode?: DarkMode) => {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === DarkMode.DARK);

    useEffect(() => {
        const root = window.document.documentElement;

        if (isDarkMode) {
            root.classList.add(DarkMode.DARK);
            localStorage.setItem('theme', DarkMode.DARK);
        } else {
            root.classList.remove(DarkMode.DARK);
            localStorage.setItem('theme', DarkMode.LIGHT);
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (mode !== undefined) setIsDarkMode(mode === DarkMode.DARK);
    }, [mode])

    return { isDarkMode,  setIsDarkMode }
}

export default useToogleDarkMode