import { Route, Routes } from "react-router"

import { Header } from "./cmps/Header.jsx"
import { Footer } from "./cmps/Footer.jsx"

import { HomePage } from "./pages/HomePage"
import { PlansPage } from "./pages/PlansPage"
import { BlogPage } from "./pages/BlogPage"
import { RecipesPage } from "./pages/RecipesPage"
import { PostDetails } from "./pages/PostDetails"
import { PlanDetails } from "./pages/PlanDetails.jsx"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { AdminPage } from "./pages/AdminPage"
import { AdminEditPage } from "./pages/AdminEditPage"
import { EditCommentList } from "./cmps/admin/EditCommentsList"

export function RootCmp() {
    return (
        <div className="main-layout">
            <Header />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog/:id" element={<PostDetails type={'blog'} />} />
                    <Route path="/recipes/:id" element={<PostDetails type={'recipes'} />} />
                    <Route path="/plans/:id" element={<PlanDetails />} />

                    <Route path="/plans" element={<PlansPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/edit/:type/:id" element={<AdminEditPage />} />
                    <Route path="/admin/:type/:id" element={<EditCommentList />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
