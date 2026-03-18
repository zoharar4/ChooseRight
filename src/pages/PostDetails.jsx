import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import { mainService } from "../services/main.service";
import { utilService } from "../services/util.service";
import { ImageBasic } from "../cmps/ImageBasic";
import { Loading } from "../cmps/Loading"

import { CommentsSection } from "../cmps/comments/CommentsSection";


export function PostDetails({ type }) {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    const [isLiked, setIsLiked] = useState(false)
    const [currAnimation, setCurrAnimation] = useState('')

    const viewTimeoutRef = useRef(null)


    useEffect(() => {
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

        likedPosts.push(id)
        utilService.saveToStorage("likedPosts", likedPosts)
        setIsLiked(true)
        setCurrAnimation('fa-beat')

        setTimeout(() => {
            setCurrAnimation(null)
        }, 1800)

        try {
            await mainService.incrementLikes(type, id)
        } catch (err) {
            const index = likedPosts.indexOf(id)
            if (index > -1) {
                likedPosts.splice(index, 1)
                localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
                setIsLiked(false)
            }
            console.log('err:', err)
        }
    }

    if (!post) return (
        <Loading isForPage={true} />
    )
    return (
        <div className="post-details" >
            {/* <Top> */}
            <div>
                <div>
                    <h1>{post.title}</h1>
                    <p>{utilService.getTimeStamp(post.createdAtTimestamp, false)}</p>
                </div>

                <div className="post-actions">
                    <div className="left-actions">
                        sadgtdj
                    </div>
                    <div className="right-actions">
                        <button onClick={updateLikes} className="like-btn">
                            {isLiked ?
                                <i className={`fa-solid fa-heart fa-2xl ${currAnimation || ''}`} style={{ color: "rgb(222, 74, 67)" }}></i>
                                :
                                <i className={`fa-regular fa-heart fa-2xl`} style={{ color: "rgb(222, 74, 67)" }}></i>
                            }
                        </button>
                    </div>
                </div>

                <div className="image-container">
                    <ImageBasic src={post.imageUrl} alt={post.title} />
                </div>
            </div>
            {/* </Top> */}


            <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}></div>

            <CommentsSection type={type} post={post} setPost={setPost} />

        </div>
    )

}