import {
    useState
} from "react";

import {
    THEME
} from "../contexts/ThemeContext";

const useTheme = (defaultTheme) => {
    const [theme, setTheme] = useState(defaultTheme);

    const toggleTheme = () => {
        if (theme === THEME.LIGHT) {
            setTheme(THEME.DARK);
        } else {
            setTheme(THEME.LIGHT);
        }
    };

    return {
        theme,
        toggleTheme
    };
};

export default useTheme;