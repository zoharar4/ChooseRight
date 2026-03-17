import { useEffect, useState } from "react"
import { actions } from "../../store/actions"

import { PostPreview } from "../cmps/PostPreview"

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
            <div className="post-list">
                {posts.map(post => {
                    return <PostPreview post={post} key={post._id} />
                })}
            </div>
        </div>
    )
}