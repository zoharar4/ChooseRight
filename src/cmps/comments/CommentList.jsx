import { CommentItem } from "./CommentItem.jsx"

export function CommentsList({ comments, postId, setPost, type, setComments, isAdminPage, onDelete }) {
    if (!comments || !comments.length)
        return <p className="no-comments">אין תגובות עדיין</p>

    return (
        <ul className="comments-list">
            {comments.map(comment =>
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={postId}
                    setPost={setPost}
                    type={type}
                    setComments={setComments}
                    isAdminPage={isAdminPage}
                    onDelete={onDelete}
                />
            )}
        </ul>
    )
}
