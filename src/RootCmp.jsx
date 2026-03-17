import { Route, Routes } from "react-router";

import { Header } from "./cmps/Header";
import { Footer } from "./cmps/footer";


import { HomePage } from "./pages/HomePage";
import { PlansPage } from "./pages/PlansPage";
import { BlogPage } from "./pages/BlogPage";
import { RecipesPage } from "./pages/RecipesPage";

import { PostDetails } from "./pages/PostDetails";

import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";

export function RootCmp() {

    return (
        <div className="main-layout">
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog/:id" element={<PostDetails type={'blog'} />} />
                    <Route path="/recipes/:id" element={<PostDetails type={'recipes'} />} />

                    <Route path="/plans" element={<PlansPage />} />
                    <Route path="/blog" element={<BlogPage type={'blog'} />} />
                    <Route path="/recipes" element={<RecipesPage type={'recipes'} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

