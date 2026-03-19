
import { CommentItem } from "./CommentItem.jsx";

export function CommentsList({ comments, postId, setPost, type, setComments, isAdminPage, onDelete }) {
    if (!comments || !comments.length) {
        return (
            <div className="comments-section">
                <h3>תגובות</h3>
                <p className="no-comments">אין תגובות עדיין</p>
            </div>
        )
    }
    console.log('comments:', comments)

    return (
        <div className="comments-section">
            <h3>תגובות ({comments.length})</h3>

            <ul className="comments-list">
                {comments.map(comment =>
                    <CommentItem key={comment._id} comment={comment} postId={postId} setPost={setPost} type={type} setComments={setComments} isAdminPage={isAdminPage} onDelete={onDelete} />
                )}
            </ul>
        </div>
    )
}