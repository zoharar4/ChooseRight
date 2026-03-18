import { useState } from "react"
import { CommentsList } from "./CommentList"
import { AddComment } from "./AddComment"
import { mainService } from "../../services/main.service"


export function CommentsSection({ post, setPost, type }) {

    const [isAddingComment, setIsAddingComment] = useState(false)

    function toggleAddComment() {
        setIsAddingComment(prev => !prev)
    }

    async function onAddComment(commentToAdd) {
        try {
            const res = await mainService.addComment(type, post._id, commentToAdd)
            setPost(prev => ({ ...prev, comments: [res, ...prev.comments] }))
            setTimeout(() => {
                setIsAddingComment(false)
            }, 1200)
        } catch (err) {
            console.error('had issue with adding comment. comment:', commentToAdd, "err:", err)
            throw err
        }
    }

    return (
        <div className="comments-section">


            {isAddingComment
                ?
                <AddComment
                    onSubmit={onAddComment}
                    onCancel={() => setIsAddingComment(false)}
                />
                :
                <button className="toggle-comment-btn" onClick={toggleAddComment}>
                    {isAddingComment ? "סגור" : "כתוב תגובה"}
                </button>
            }

            <CommentsList
                comments={post.comments}
                postId={post._id}
                setPost={setPost}
                type={type}
            />

        </div>
    )
}