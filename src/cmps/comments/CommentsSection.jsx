import { useState } from "react"
import { CommentsList } from "./CommentList"
import { AddComment } from "./AddComment"


export function CommentsSection({ post, setPost }) {

    const [isAddingComment, setIsAddingComment] = useState(false)

    function toggleAddComment() {
        setIsAddingComment(prev => !prev)
    }

    async function onAddComment(commentToAdd) {
        try {
            // const res = await mainService.addComment(post._id, commentToAdd)
            setPost(prev => ({ ...prev, comments: [commentToAdd, ...prev.comments] }))
            timeoutIsComment()
            // setPost(prev => ({ ...prev, comments: [res, ...prev.comments] }))
        } catch (err) {
            console.error('had issue with adding comment. comment:', commentToAdd, "err:", err)
        }
    }

    function timeoutIsComment() {//טיים אווט בשביל הלייק
        setTimeout(() => {
            setIsAddingComment(false)
        }, 2000)
    }

    return (
        <div className="comments-section">

            <button
                className="toggle-comment-btn"
                onClick={toggleAddComment}
            >
                {isAddingComment ? "סגור" : "כתוב תגובה"}
            </button>

            {isAddingComment &&
                <AddComment
                    onAddComment={onAddComment}
                    onCancel={() => setIsAddingComment(false)}
                />
            }

            <CommentsList
                comments={post.comments}
                postId={post._id}
                setPost={setPost}
            />

        </div>
    )
}