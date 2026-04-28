import { useState } from "react"
import { mainService } from "../services/main.service"
import { utilService } from "../services/util.service"
import { ImageBasic } from "./ImageBasic"

export function PostSection({ post, setPost, type }) {
    const [isLiked, setIsLiked] = useState(() => {
        const likedPosts = utilService.loadFromStorage('likedPosts') || []
        return likedPosts.includes(post._id)
    })
    const [currAnimation, setCurrAnimation] = useState('')

    async function updateLikes() {
        const likedPosts = utilService.loadFromStorage('likedPosts') || []
        if (likedPosts.includes(post._id) || isLiked) return

        utilService.devLog(`Like post — ${type}/${post._id}`)
        likedPosts.push(post._id)
        utilService.saveToStorage('likedPosts', likedPosts)
        setIsLiked(true)
        setCurrAnimation('fa-beat')
        setPost(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }))

        setTimeout(() => setCurrAnimation(''), 900)

        try {
            await mainService.incrementLikes(type, post._id)
        } catch (err) {
            const idx = likedPosts.indexOf(post._id)
            if (idx > -1) {
                likedPosts.splice(idx, 1)
                utilService.saveToStorage('likedPosts', likedPosts)
                setIsLiked(false)
            }
            console.error('err:', err)
        }
    }

    return (
        <div className="post-section">
            <div className="title-container">
                <h1>{post.title}</h1>
            </div>

            <div className="post-actions">
                <div className="left-actions">
                    <div className="post-section-date">
                        {utilService.getTimeStamp(post.createdAtTimestamp, false)}
                    </div>
                </div>
                <div className="right-actions">
                    <button onClick={updateLikes} className={`like-btn ${isLiked ? "active" : ""}`}>
                        <span>{post.likes}</span>
                        {isLiked
                            ? <i className={`fa-solid fa-heart ${currAnimation || ''}`}></i>
                            : <i className="fa-regular fa-heart"></i>
                        }
                    </button>
                </div>
            </div>

            <div className="image-container">
                <ImageBasic src={post.imageUrl?.[1]} alt={post.title} />
            </div>

            <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
    )
}
