import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { mainService } from "../services/main.service";
import { utilService } from "../services/util.service";
import { ImageBasic } from "../cmps/ImageBasic";
import { Loading } from "../cmps/Loading"

import { CommentsSection } from "../cmps/comments/CommentsSection";
import { BlockPreview } from "../cmps/BlockPreview";


export function PostDetails({ type }) {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    const [isLiked, setIsLiked] = useState(false)
    const [currAnimation, setCurrAnimation] = useState('')

    const viewTimeoutRef = useRef(null)
    const navigate = useNavigate()


    useEffect(() => {
        setPost(null)
        loadPost()
        const likedPosts = utilService.loadFromStorage('likedPosts') || []
        setIsLiked(likedPosts.includes(id))

        return () => {
            clearTimeout(viewTimeoutRef.current)
        }
    }, [id, type])

    async function loadPost() {
        try {
            const postToSave = await mainService.getById(type, id)
            utilService.devLog(`Post loaded — ${type}/${id}`, postToSave)
            setPost(postToSave)
            updateViews()
        } catch (err) {
            console.log("Failed to load post", err)
        }
    }

    async function updateViews() {

        viewTimeoutRef.current = setTimeout(async () => {

            try {
                await mainService.incrementViews(type, id)
            } catch (err) {
                console.log('err:', err)
            }

        }, 5000)
    }

    async function updateLikes() {
        const likedPosts = utilService.loadFromStorage('likedPosts') || []
        if (likedPosts.includes(id) || isLiked) return

        utilService.devLog(`Like post — ${type}/${id}`)
        likedPosts.push(id)
        utilService.saveToStorage("likedPosts", likedPosts)
        setIsLiked(true)
        setCurrAnimation('fa-beat')
        setPost(prev => ({ ...prev, likes: prev.likes + 1 }))

        setTimeout(() => {
            setCurrAnimation(null)
        }, 900)

        try {
            await mainService.incrementLikes(type, id)
        } catch (err) {
            const index = likedPosts.indexOf(id)
            if (index > -1) {
                likedPosts.splice(index, 1)
                localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
                setIsLiked(false)
            }
            console.error('err:', err)
        }
    }

    if (!post) return (
        <Loading isForPage={true} />
    )
    return (
        <div className="post-details">
            <div className="top-container">
                <button className="back-btn" onClick={() => navigate(-1)} title="חזור">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                    </button>
            </div>
            <div className="post-section">

                {/* <Top> */}

                <div className="title-container">
                    <h1>{post.title}</h1>
                </div>

                <div className="post-actions">
                    <div className="left-actions">
                        <div className="post-details-date">{utilService.getTimeStamp(post.createdAtTimestamp, false)}</div>
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
            <BlockPreview type={type} />
            <CommentsSection type={type} post={post} setPost={setPost} />

        </div>
    )

}