import { useEffect, useState } from "react"
import { actions } from "../../store/actions"

import blogDefault from "../assets/images/blog_default.png"
import { utilService } from "../services/util.service"

export function BlogPage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        const items = await actions.load("blog")
        setPosts(items)
    }

    return (
        <div className="blog-page">
            {posts.map(post => {
                return (
                    <article className="blog-card" key={post._id}>

                        <div className="blog-image">
                            <img src={post.imageUrl || blogDefault} alt={post.title} />
                        </div>

                        <div className="blog-content">

                            <div className="blog-meta">
                                <p className="blog-date">
                                    {utilService.getTimeStamp(post.createdAtTimestamp, false)}
                                </p>

                                <button className="blog-share">
                                    Share
                                </button>
                            </div>

                            <div className="blog-text">
                                <h2 className="blog-title">
                                    {post.title}
                                </h2>

                                <p className="blog-preview">
                                    {post.previewContent}
                                </p>
                            </div>

                        </div>

                    </article>
                )
            })}
        </div>
    )
}