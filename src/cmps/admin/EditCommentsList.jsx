import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { mainService } from "../../services/main.service"
import { CommentsList } from "../comments/CommentList"

export function EditCommentList() {
    const { id, type } = useParams()
    const [comments, setComments] = useState(null)
    const [deletingIds, setDeletingIds] = useState(new Set())

    useEffect(() => {
        loadComments()
    }, [id, type])

    async function loadComments() {
        const post = await mainService.getById(type, id)
        setComments(post.comments)
    }

    async function onDelete(type, postId, commentId, replyId) {
        if (!confirm("האם את/ה בטוח שברצונך למחוק?")) return
        const currId = replyId || commentId
        if (deletingIds.has(currId)) return

        setDeletingIds(p => new Set(p).add(currId))

        try {
            await (replyId
                ? mainService.removeReply(type, postId, commentId, replyId)
                : mainService.removeComment(type, postId, commentId)
            )

            setComments(p =>
                replyId
                    ? p.map(c =>
                        c._id === commentId
                            ? { ...c, replies: (c.replies || []).filter(r => r._id !== currId) }
                            : c
                    )
                    : p.filter(c => c._id !== currId)
            )

        } finally {
            setDeletingIds(p => {
                const s = new Set(p)
                s.delete(currId)
                return s
            })
        }
    }

    return (
        <div className="edit-comment-list" style={{ padding: '12px' }}>
            <CommentsList comments={comments} postId={id} type={type} setComments={setComments} onDelete={onDelete} isAdminPage />
        </div>
    )
}
