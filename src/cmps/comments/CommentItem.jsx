import { useState } from "react"
import { mainService } from "../../services/main.service"
import { utilService } from "../../services/util.service"
import { useUser } from "../../context/UserContext"
import { CommentContent } from "./CommentContent"
import { AddComment } from "./AddComment"

export function CommentItem({ comment, postId, setPost, type, setComments }) {
    const { user } = useUser()
    const [isReplying, setIsReplying] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    const likedComments = utilService.loadFromStorage('likedComments') || []
    const likedReplies = utilService.loadFromStorage('likedReplies') || []
    const isCommentLiked = likedComments.includes(comment._id)

    function patchComments(updater) {
        if (setPost) {
            setPost(prev => ({ ...prev, comments: updater(prev.comments || []) }))
        } else if (setComments) {
            setComments(prev => updater(prev || []))
        }
    }

    function patchThisComment(updater) {
        patchComments(comments => comments.map(c => c._id === comment._id ? updater(c) : c))
    }

    async function onReply(replyData) {
        try {
            utilService.devLog(`Reply to comment ${comment._id} — before`, replyData)
            const res = await mainService.addReply(type, postId, comment._id, replyData)
            utilService.devLog(`Reply to comment ${comment._id} — after`, res)
            patchThisComment(c => ({ ...c, replies: [...(c.replies || []), res] }))
        } catch (err) {
            console.error(err)
        }
        setTimeout(() => setIsReplying(false), 500)
    }

    async function onLikeComment() {
        if (isCommentLiked) return
        const liked = utilService.loadFromStorage('likedComments') || []
        liked.push(comment._id)
        utilService.saveToStorage('likedComments', liked)
        patchThisComment(c => ({ ...c, likes: (c.likes || 0) + 1 }))
        try {
            await mainService.likeComment(type, postId, comment._id)
        } catch (err) {
            const idx = liked.indexOf(comment._id)
            if (idx > -1) liked.splice(idx, 1)
            utilService.saveToStorage('likedComments', liked)
            patchThisComment(c => ({ ...c, likes: Math.max(0, (c.likes || 1) - 1) }))
            console.error(err)
        }
    }

    async function onLikeReply(reply) {
        if (likedReplies.includes(reply._id)) return
        const liked = utilService.loadFromStorage('likedReplies') || []
        liked.push(reply._id)
        utilService.saveToStorage('likedReplies', liked)
        patchThisComment(c => ({
            ...c,
            replies: (c.replies || []).map(r =>
                r._id === reply._id ? { ...r, likes: (r.likes || 0) + 1 } : r
            )
        }))
        try {
            await mainService.likeReply(type, postId, comment._id, reply._id)
        } catch (err) {
            const idx = liked.indexOf(reply._id)
            if (idx > -1) liked.splice(idx, 1)
            utilService.saveToStorage('likedReplies', liked)
            patchThisComment(c => ({
                ...c,
                replies: (c.replies || []).map(r =>
                    r._id === reply._id ? { ...r, likes: Math.max(0, (r.likes || 1) - 1) } : r
                )
            }))
            console.error(err)
        }
    }

    async function onDeleteComment() {
        if (deletingId) return
        if (!confirm('האם את/ה בטוח שברצונך למחוק?')) return
        setDeletingId(comment._id)
        try {
            utilService.devLog(`Delete comment — ${comment._id} from ${type}/${postId}`)
            await mainService.removeComment(type, postId, comment._id)
            utilService.devLog(`Delete comment — done`)
            patchComments(comments => comments.filter(c => c._id !== comment._id))
        } catch (err) {
            console.error(err)
            alert('שגיאה במחיקה')
        } finally {
            setDeletingId(null)
        }
    }

    async function onDeleteReply(reply) {
        if (deletingId) return
        if (!confirm('האם את/ה בטוח שברצונך למחוק?')) return
        setDeletingId(reply._id)
        try {
            utilService.devLog(`Delete reply — ${reply._id} from ${type}/${postId}`)
            await mainService.removeReply(type, postId, comment._id, reply._id)
            utilService.devLog(`Delete reply — done`)
            patchThisComment(c => ({
                ...c,
                replies: (c.replies || []).filter(r => r._id !== reply._id)
            }))
        } catch (err) {
            console.error(err)
            alert('שגיאה במחיקה')
        } finally {
            setDeletingId(null)
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

                {user && (
                    <button onClick={onDeleteComment} className="delete-btn" disabled={deletingId === comment._id}>
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

                                    {user && (
                                        <button onClick={() => onDeleteReply(reply)} className="delete-btn" disabled={deletingId === reply._id}>
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
