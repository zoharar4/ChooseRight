import { useEffect, useState } from "react"

import { PostPreview } from "../cmps/PostPreview"
import { mainService } from "../services/main.service"

export function RecipesPage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        loadPosts()
    }, [])
    async function loadPosts() {
        const items = await mainService.query("recipes")
        setPosts(items)
    }
    return (
        <div className="recipes-page">
            <div className="post-list">
                {posts.map(post => {
                    return <PostPreview post={post} key={post._id} type={"recipes"}/>
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