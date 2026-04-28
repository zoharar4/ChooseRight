import { CommentItem } from "./CommentItem.jsx"

export function CommentsList({ comments, postId, setPost, type, setComments }) {
    if (!comments || !comments.length)
        return <p className="no-comments">אין תגובות עדיין. <br /> אשמח לשמוע מה דעתכם 🙂</p>

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
                />
            )}
        </ul>
    )
}
