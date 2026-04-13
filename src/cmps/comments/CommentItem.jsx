import { useState } from "react"
import { mainService } from "../../services/main.service"
import { utilService } from "../../services/util.service"
import { useUser } from "../../context/UserContext"
import { CommentContent } from "./CommentContent"
import { AddComment } from "./AddComment"

export function CommentItem({ comment, postId, setPost, type, setComments, onDelete }) {
    const { user } = useUser()
    const [isReplying, setIsReplying] = useState(false)

    const likedComments = utilService.loadFromStorage('likedComments') || []
    const likedReplies = utilService.loadFromStorage('likedReplies') || []
    const isCommentLiked = likedComments.includes(comment._id)

    async function onReply(replyData) {
        try {
            const res = await mainService.addReply(type, postId, comment._id, replyData)
            if (setPost) {
                setPost(prev => ({
                    ...prev,
                    comments: prev.comments.map(c =>
                        c._id === comment._id
                            ? { ...c, replies: [...(c.replies || []), res] }
                            : c
                    )
                }))
            } else {
                setComments(prev => prev.map(c =>
                    c._id === comment._id
                        ? { ...c, replies: [...(c.replies || []), res] }
                        : c
                ))
            }
        } catch (err) {
            console.error(err)
        }
        setTimeout(() => setIsReplying(false), 500)
    }

    function updateCommentState(updater) {
        if (setPost) {
            setPost(prev => ({
                ...prev,
                comments: prev.comments.map(c => c._id === comment._id ? updater(c) : c)
            }))
        } else {
            setComments(prev => prev.map(c => c._id === comment._id ? updater(c) : c))
        }
    }

    async function onLikeComment() {
        if (isCommentLiked) return
        const liked = utilService.loadFromStorage('likedComments') || []
        liked.push(comment._id)
        utilService.saveToStorage('likedComments', liked)
        updateCommentState(c => ({ ...c, likes: (c.likes || 0) + 1 }))
        try {
            await mainService.likeComment(type, postId, comment._id)
        } catch (err) {
            // rollback
            const idx = liked.indexOf(comment._id)
            if (idx > -1) liked.splice(idx, 1)
            utilService.saveToStorage('likedComments', liked)
            updateCommentState(c => ({ ...c, likes: Math.max(0, (c.likes || 1) - 1) }))
            console.error(err)
        }
    }

    async function onLikeReply(reply) {
        if (likedReplies.includes(reply._id)) return
        const liked = utilService.loadFromStorage('likedReplies') || []
        liked.push(reply._id)
        utilService.saveToStorage('likedReplies', liked)
        updateCommentState(c => ({
            ...c,
            replies: (c.replies || []).map(r =>
                r._id === reply._id ? { ...r, likes: (r.likes || 0) + 1 } : r
            )
        }))
        try {
            await mainService.likeReply(type, postId, comment._id, reply._id)
        } catch (err) {
            // rollback
            const idx = liked.indexOf(reply._id)
            if (idx > -1) liked.splice(idx, 1)
            utilService.saveToStorage('likedReplies', liked)
            updateCommentState(c => ({
                ...c,
                replies: (c.replies || []).map(r =>
                    r._id === reply._id ? { ...r, likes: Math.max(0, (r.likes || 1) - 1) } : r
                )
            }))
            console.error(err)
        }
    }

    return (
        <li className="comment">
            <div className="comment-header">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-time">
                    {utilService.getTimeStamp(comment.createdAtTimestamp)}
                </span>
            </div>

            <CommentContent content={comment.content} />

            <div className="comment-actions">
                <button className={`comment-like${isCommentLiked ? ' liked' : ''}`} onClick={onLikeComment}>
                    <i className={isCommentLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                    <span>{comment.likes || 0}</span>
                </button>

                {user && (
                    <button onClick={() => setIsReplying(prev => !prev)} className="comment-reply">
                        <i className="fa-solid fa-reply"></i>
                    </button>
                )}

                {user && onDelete && (
                    <button onClick={() => onDelete(type, postId, comment._id)} className="delete-btn">
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                )}
            </div>

            {isReplying && (
                <AddComment
                    isReply
                    onSubmit={onReply}
                    onCancel={() => setIsReplying(false)}
                />
            )}

            {comment.replies?.length > 0 && (
                <ul className="replies-list">
                    {comment.replies.map(reply => {
                        const isReplyLiked = likedReplies.includes(reply._id)
                        return (
                            <li key={reply?._id} className="reply">
                                <div className="comment-header">
                                    <span className="comment-name">{reply.name}</span>
                                    <span className="comment-time">
                                        {utilService.getTimeStamp(reply.createdAtTimestamp)}
                                    </span>
                                </div>
                                <p className="comment-content">{reply.content}</p>

                                <div className="comment-actions">
                                    <button
                                        className={`comment-like${isReplyLiked ? ' liked' : ''}`}
                                        onClick={() => onLikeReply(reply)}
                                    >
                                        <i className={isReplyLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                                        <span>{reply.likes || 0}</span>
                                    </button>

                                    {user && onDelete && (
                                        <button onClick={() => onDelete(type, postId, comment._id, reply._id)} className="delete-btn">
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </li>
    )
}
