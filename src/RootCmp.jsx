import { Route, Routes } from "react-router";
import { Header } from "./cmps/Header";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { PlansPage } from "./pages/PlansPage";
import { BlogPage } from "./pages/BlogPage";
import { RecipesPage } from "./pages/RecipesPage";
import { ContactPage } from "./pages/ContactPage";
import { Footer } from "./cmps/footer";
import { AdminPage } from "./pages/AdminPage";

export function RootCmp() {

    return (
        <div className="main-layout">
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/תכניות_ליווי" element={<PlansPage />} />
                    <Route path="/בלוג" element={<BlogPage />} />
                    <Route path="/מתכונים" element={<RecipesPage />} />
                    <Route path="/אודותי" element={<AboutPage />} />
                    <Route path="/יצירת_קשר" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

