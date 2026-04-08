import { useState } from "react"
import { CommentsList } from "./CommentList"
import { AddComment } from "./AddComment"
import { mainService } from "../../services/main.service"


export function CommentsSection({ post, setPost, type }) {
    const [isAddingComment, setIsAddingComment] = useState(false)

    async function onAddComment(commentToAdd) {
        try {
            const res = await mainService.addComment(type, post._id, commentToAdd)
            setPost(prev => ({ ...prev, comments: [res, ...prev.comments] }))
            setTimeout(() => setIsAddingComment(false), 500)
        } catch (err) {
            console.error('had issue with adding comment:', commentToAdd, err)
            throw err
        }
    }

    return (
        <div className="comments-section">
            <div className="top-container">
                <h3>תגובות ({post.comments?.length || 0})</h3>
                <button className="toggle-comment-btn" onClick={() => setIsAddingComment(prev => !prev)}>
                    {isAddingComment ? "סגור" : "כתוב תגובה"}
                </button>
            </div>

            {isAddingComment && (
                <AddComment
                    onSubmit={onAddComment}
                    onCancel={() => setIsAddingComment(false)}
                />
            )}

            <CommentsList
                comments={post.comments}
                postId={post._id}
                setPost={setPost}
                type={type}
            />
        </div>
    )
}