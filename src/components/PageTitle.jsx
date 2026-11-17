import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitle() {
    const { pathname } = useLocation();

    useEffect(() => {
        const titles = {
            "/": "Home",
            "/tournaments": "Tournaments",
            "/leaderboard": "Leaderboard",
            "/admin": "Admin Dashboard",
            "/about": "About Us",
            "/contact": "Contact Us",
            "/profile": "Profile"
        };

        const pageName = titles[pathname] || "BGMI ESPORTS HUB";

        document.title = `${pageName} | BGMI ESPORTS HUB`;
    }, [pathname]);

    return null;
}

export default PageTitle;