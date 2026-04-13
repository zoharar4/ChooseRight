import { useState } from 'react'
import { useNavigate } from 'react-router'
import { draftService } from '../../services/draft.service'
import { utilService } from '../../services/util.service'

const TYPE_LABEL = { blog: 'בלוג', recipes: 'מתכונים', plans: 'תכניות' }

export function DraftsList({ onClose, onDraftDeleted }) {
    const [drafts, setDrafts] = useState(() => draftService.getAll())
    const navigate = useNavigate()

    function goToEdit(draft) {
        onClose()
        navigate(`/admin/edit/${draft.type}/${draft.id}`)
    }

    function deleteDraft(e, draft) {
        e.stopPropagation()
        draftService.remove(draft.type, draft.id)
        const updated = draftService.getAll()
        setDrafts(updated)
        onDraftDeleted(updated.length)
    }

    const sorted = [...drafts].sort((a, b) => b.savedAt - a.savedAt)

    return (
        <div className="recent-comments-overlay" onClick={onClose}>
            <div className="recent-comments-panel" onClick={e => e.stopPropagation()}>
                <div className="recent-comments-header">
                    <h3>טיוטות ({drafts.length})</h3>
                    <button className="rc-close-btn" onClick={onClose} title="סגור">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="recent-comments-list">
                    {!sorted.length ? (
                        <p className="rc-empty">אין טיוטות שמורות</p>
                    ) : (
                        sorted.map(draft => (
                            <div key={draft.key} className="rc-item draft-item" onClick={() => goToEdit(draft)}>
                                <div className="rc-item-top">
                                    <span className={`rc-type-badge rc-type-${draft.type}`}>
                                        {TYPE_LABEL[draft.type] || draft.type}
                                    </span>
                                    <span className="rc-name">{draft.title}</span>
                                    <span className="rc-time">
                                        {utilService.getTimeStamp(draft.savedAt)}
                                    </span>
                                    <button
                                        className="draft-delete-btn"
                                        onClick={e => deleteDraft(e, draft)}
                                        title="מחק טיוטה"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                                <p className="rc-post-link">
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    {draft.id === 'new' ? 'פוסט חדש' : 'המשך עריכה'}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
