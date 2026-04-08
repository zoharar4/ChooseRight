import { useEffect, useState } from "react"
import { PostPreview } from "../cmps/PostPreview"
import { mainService } from "../services/main.service"

const BLOG_CATEGORIES = ['הכל', 'קואצ\'ינג', 'התפתחות אישית', 'כלים פרקטיים', 'מחשבות']

export function BlogPage() {
    const [posts, setPosts] = useState([])
    const [activeCategory, setActiveCategory] = useState('הכל')

    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        const items = await mainService.query("blog")
        setPosts(items)
    }

    return (
        <div className="blog-page">
            <section className="list-page-hero page-hero">
                <div className="container">
                    <span className="hero-label">הבלוג שלי</span>
                    <h1 className="page-hero-title">מאמרים, מחשבות<br /><span>וידע מקצועי</span></h1>
                </div>
            </section>

            <section className="list-page-section">
                <div className="container">
                    <div className="filter-bar">
                        {BLOG_CATEGORIES.map(cat => (
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
                            <PostPreview post={post} key={post._id} type="blog" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
