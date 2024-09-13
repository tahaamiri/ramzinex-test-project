import darkModeIcon from '../assets/svg/dark_mode_.svg';
import useToogleDarkMode from '../hooks/useToogleDarkMode';

const DarkModeToggle = () => {

    const {isDarkMode, setIsDarkMode} = useToogleDarkMode();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <img src={darkModeIcon} alt="dark mode icon" className='cursor-pointer' onClick={toggleDarkMode}/>
    )
}

export default DarkModeToggle