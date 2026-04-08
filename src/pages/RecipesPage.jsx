import { useEffect, useState } from "react"
import { PostPreview } from "../cmps/PostPreview"
import { mainService } from "../services/main.service"

const RECIPES_CATEGORIES = ['הכל', 'ארוחת בוקר', 'צהריים', 'ארוחת ערב', 'קינוחים', 'חטיפים בריאים']

export function RecipesPage() {
    const [posts, setPosts] = useState([])
    const [activeCategory, setActiveCategory] = useState('הכל')

    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        const items = await mainService.query("recipes")
        setPosts(items)
    }

    return (
        <div className="recipes-page">
            <section className="list-page-hero page-hero">
                <div className="container">
                    <span className="hero-label">המטבח שלי</span>
                    <h1 className="page-hero-title">מתכונים בריאים<br /><span>וטעימים</span></h1>
                </div>
            </section>

            <section className="list-page-section">
                <div className="container">
                    <div className="filter-bar">
                        {RECIPES_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="post-list">
                        {posts.map(post => (
                            <PostPreview post={post} key={post._id} type="recipes" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
