import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { mainService } from "../services/main.service"
import { utilService } from "../services/util.service"
import { Loading } from "../cmps/Loading"
import { PostSection } from "../cmps/PostSection"
import { CommentsSection } from "../cmps/comments/CommentsSection"
import { BlockPreview } from "../cmps/BlockPreview"


export function PostDetails({ type }) {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const viewTimeoutRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setPost(null)
        loadPost()

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

    if (!post) return <Loading isForPage={true} />

    return (
        <div className="post-details">
            <div className="top-container">
                <button className="back-btn" onClick={() => navigate(-1)} title="חזור">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </div>

            <PostSection post={post} setPost={setPost} type={type} />

            <BlockPreview type={type} />

            <CommentsSection type={type} post={post} setPost={setPost} />
        </div>
    )
}
