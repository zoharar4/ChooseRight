
import { utilService } from "../../services/util.service.js";
import { CommentContent } from "./CommentContent.jsx";
import { CommentItem } from "./CommentItem.jsx";

export function CommentsList({ comments, post, setPost }) {
    if (!comments || !comments.length) {
        return (
            <div className="comments-section">
                <h3>תגובות</h3>
                <p className="no-comments">אין תגובות עדיין</p>
            </div>
        )
    }
console.log('comments:',comments)

    return (
        <div className="comments-section">
            <h3>תגובות ({comments.length})</h3>

            <ul className="comments-list">
                {comments.map(comment =>
                    <CommentItem key={comment._id} comment={comment} post={post} setPost={setPost} />
                )}
            </ul>
        </div>
    )
}