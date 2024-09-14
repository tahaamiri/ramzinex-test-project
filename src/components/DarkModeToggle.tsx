import darkModeIcon from '../assets/svg/dark_mode_.svg';
import useToggleDarkMode from '../hooks/useToggleDarkMode';

const DarkModeToggle = () => {

    const {isDarkMode, setIsDarkMode} = useToggleDarkMode();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <img src={darkModeIcon} alt="dark mode icon" className='cursor-pointer' onClick={toggleDarkMode}/>
    )
}

export default DarkModeToggle