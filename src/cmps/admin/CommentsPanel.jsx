import { useEffect, useState } from 'react'
import { mainService } from '../../services/main.service'
import { utilService } from '../../services/util.service'
import { CommentsList } from '../comments/CommentList'
import { Loading } from '../Loading'
import { DeletedCommentsPanel } from './DeletedCommentsPanel'

export function CommentsPanel({ type, postId }) {
    const [comments, setComments] = useState(null)
    const [showDeletedComments, setShowDeletedComments] = useState(false)
    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState(() => new Set())
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        loadComments()
    }, [type, postId])

    async function loadComments() {
        try {
            const post = await mainService.getById(type, postId)
            utilService.devLog(`Comments loaded for ${type}/${postId} — ${post.comments?.length || 0} comments`, post.comments)
            setComments(post.comments || [])
        } catch (err) {
            console.error(err)
            setComments([])
        }
    }

    function toggleSelect(commentId) {
        setSelected(prev => {
            const next = new Set(prev)
            if (next.has(commentId)) next.delete(commentId)
            else next.add(commentId)
            return next
        })
    }

    function toggleSelectAll() {
        if (selected.size === comments.length) {
            setSelected(new Set())
        } else {
            setSelected(new Set(comments.map(c => c._id)))
        }
    }

    function exitSelectMode() {
        setSelectMode(false)
        setSelected(new Set())
    }

    async function deleteSelected() {
        if (!selected.size || isDeleting) return
        if (!confirm(`למחוק ${selected.size} תגובות?`)) return
        setIsDeleting(true)
        try {
            const ids = [...selected]
            utilService.devLog(`Bulk delete comments — ${ids.length}`, ids)
            await Promise.all(ids.map(cid => mainService.removeComment(type, postId, cid)))
            utilService.devLog(`Bulk delete comments — done`)
            setComments(prev => prev.filter(c => !selected.has(c._id)))
            exitSelectMode()
        } catch (err) {
            alert('שגיאה במחיקה')
            console.error(err)
        } finally {
            setIsDeleting(false)
        }
    }

    if (!comments) return <Loading isForPage />

    const allSelected = selected.size > 0 && selected.size === comments.length

    return (
        <div className="comments-panel">
            <div className="panel-options">
                {!selectMode ? (
                    <>
                        <button className="panel-option-btn" onClick={() => setShowDeletedComments(true)} title="תגובות שנמחקו">
                            <i className="fa-solid fa-comment-slash"></i>
                            <span>תגובות שנמחקו</span>
                        </button>
                        <button
                            className="panel-option-btn"
                            onClick={() => setSelectMode(true)}
                            disabled={!comments.length}
                            title="בחירה מרובה למחיקה"
                        >
                            <i className="fa-solid fa-check-double"></i>
                            <span>בחר למחיקה</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button className="panel-option-btn" onClick={toggleSelectAll}>
                            <i className="fa-solid fa-list-check"></i>
                            <span>{allSelected ? 'נקה הכל' : 'בחר הכל'}</span>
                        </button>
                        <button
                            className="panel-option-btn danger"
                            onClick={deleteSelected}
                            disabled={!selected.size || isDeleting}
                        >
                            {isDeleting ? <Loading isTxt={false} /> : (
                                <>
                                    <i className="fa-solid fa-trash"></i>
                                    <span>מחק נבחרים ({selected.size})</span>
                                </>
                            )}
                        </button>
                        <button className="panel-option-btn" onClick={exitSelectMode}>
                            <i className="fa-solid fa-xmark"></i>
                            <span>ביטול</span>
                        </button>
                    </>
                )}
            </div>

            <h3 className="comments-panel-title">תגובות ({comments.length})</h3>

            {selectMode ? (
                comments.length ? (
                    <ul className="bulk-comments-list">
                        {comments.map(c => (
                            <li
                                key={c._id}
                                className={`bulk-comment-item${selected.has(c._id) ? ' selected' : ''}`}
                                onClick={() => toggleSelect(c._id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.has(c._id)}
                                    onChange={() => toggleSelect(c._id)}
                                    onClick={e => e.stopPropagation()}
                                />
                                <div className="bulk-comment-body">
                                    <div className="bulk-comment-top">
                                        <span className="bulk-comment-name">{c.name}</span>
                                        <span className="bulk-comment-time">
                                            {utilService.getTimeStamp(c.createdAtTimestamp)}
                                        </span>
                                    </div>
                                    <p className="bulk-comment-content">{c.content}</p>
                                    {c.replies?.length > 0 && (
                                        <span className="bulk-comment-replies">+ {c.replies.length} תשובות</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-comments">אין תגובות עדיין</p>
                )
            ) : (
                <CommentsList
                    comments={comments}
                    postId={postId}
                    type={type}
                    setComments={setComments}
                />
            )}

            {showDeletedComments && (
                <DeletedCommentsPanel
                    type={type}
                    postId={postId}
                    onClose={() => setShowDeletedComments(false)}
                    onRestored={loadComments}
                />
            )}
        </div>
    )
}
