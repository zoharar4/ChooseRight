import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router"
import { mainService } from "../../services/main.service"
import { utilService } from "../../services/util.service"
import { CommentsList } from "../comments/CommentList"
import { useUser } from "../../context/UserContext"
import { Loading } from "../Loading"

export function EditCommentList() {
    const { id, type } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isLoading: isUserLoading } = useUser()
    const [comments, setComments] = useState(null)
    const [deletingIds, setDeletingIds] = useState(new Set())

    useEffect(() => {
        if (isUserLoading) return
        if (!user) navigate('/admin', { state: { from: location.pathname }, replace: true })
    }, [user, isUserLoading])

    useEffect(() => {
        if (!user) return
        loadComments()
    }, [id, type, user])

    async function loadComments() {
        const post = await mainService.getById(type, id)
        utilService.devLog(`Comments loaded for ${type}/${id} — ${post.comments?.length || 0} comments`, post.comments)
        setComments(post.comments)
    }

    async function onDelete(type, postId, commentId, replyId) {
        if (!confirm("האם את/ה בטוח שברצונך למחוק?")) return
        const currId = replyId || commentId
        if (deletingIds.has(currId)) return

        utilService.devLog(`Delete ${replyId ? 'reply' : 'comment'} — ${currId} from ${type}/${postId}`)
        setDeletingIds(p => new Set(p).add(currId))
        try {
            await (replyId
                ? mainService.removeReply(type, postId, commentId, replyId)
                : mainService.removeComment(type, postId, commentId)
            )
            utilService.devLog(`Delete ${replyId ? 'reply' : 'comment'} — done`)
            setComments(p =>
                replyId
                    ? p.map(c => c._id === commentId
                        ? { ...c, replies: (c.replies || []).filter(r => r._id !== replyId) }
                        : c
                    )
                    : p.filter(c => c._id !== commentId)
            )
        } finally {
            setDeletingIds(p => { const s = new Set(p); s.delete(currId); return s })
        }
    }

    if (isUserLoading || !user) return <Loading isForPage />

    return (
        <div className="edit-comment-list">
            <div className="top-container">
                <h3>תגובות ({comments?.length || 0})</h3>
                <button className="back-btn" onClick={() => navigate(-1)} title="חזור">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </div>

            <CommentsList
                comments={comments}
                postId={id}
                type={type}
                setComments={setComments}
                onDelete={onDelete}
            />
        </div>
    )
}
