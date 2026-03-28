import { useEffect, useState } from "react"

import { PostPreview } from "../cmps/PostPreview"
import { mainService } from "../services/main.service"

export function BlogPage() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        const items = await mainService.query("blog")
        setPosts(items)
    }

    return (
        <div className="blog-page">
            <div className="post-list">
                {posts.map(post => {
                    return <PostPreview post={post} key={post._id} type={'blog'} />
                })}
            </div>
        </div>
    )
}