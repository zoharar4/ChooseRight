import { useEffect, useState } from "react"
import { actions } from "../../store/actions"

import { PostPreview } from "../cmps/PostPreview"

export function RecipesPage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        loadPosts()
    }, [])
    async function loadPosts() {
        const items = await actions.load("recipes")
        setPosts(items)
    }
    return (
        <div className="recipes-page">
            <div className="post-list">
                {posts.map(post => {
                    return <PostPreview post={post} key={post._id} />
                })}
            </div>
        </div>
    )
}

// export function BlogPage() {



//     return (
//         <div className="blog-page">
//         </div>
//     )
// }