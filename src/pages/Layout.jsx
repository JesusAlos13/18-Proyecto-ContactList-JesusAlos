import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <ScrollToTop>
                <Navbar />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
                <Footer />
            </ScrollToTop>
        </div>
    );
};
