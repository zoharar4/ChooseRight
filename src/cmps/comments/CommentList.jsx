
import { useNavigate } from "react-router";
import { CommentItem } from "./CommentItem.jsx";

export function CommentsList({ comments, postId, setPost, type, setComments, isAdminPage, onDelete }) {
    const navigate = useNavigate()
    console.log('comments:', comments)

    return (
        <div className="comments-section">
            <div className="top-container">
                <h3>תגובות ({comments?.length || 0})</h3>
                {isAdminPage &&
                    <button onClick={() => navigate(-1)}>חזור</button>
                }
            </div>

            {!comments || !comments.length
                ?
                <p className="no-comments">אין תגובות עדיין</p>
                :
                <ul className="comments-list">
                    {comments.map(comment =>
                        <CommentItem key={comment._id} comment={comment} postId={postId} setPost={setPost} type={type} setComments={setComments} isAdminPage={isAdminPage} onDelete={onDelete} />
                    )}
                </ul>
            }
        </div>
    )
}