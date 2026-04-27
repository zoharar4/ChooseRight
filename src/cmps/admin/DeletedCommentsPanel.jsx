import { useEffect, useState } from 'react'
import { Loading } from '../Loading'
import { backupService } from '../../services/backup.service'
import { utilService } from '../../services/util.service'

export function DeletedCommentsPanel({ type, postId, onClose, onRestored }) {
    const [comments, setComments] = useState(null)
    const [restoringId, setRestoringId] = useState(null)

    useEffect(() => {
        backupService.getDeletedComments(type, postId)
            .then(setComments)
            .catch(() => setComments([]))
    }, [type, postId])

    async function handleRestore(backupId) {
        if (restoringId) return
        setRestoringId(backupId)
        try {
            await backupService.restore(backupId)
            utilService.devLog(`Deleted comment restored — ${backupId}`)
            setComments(prev => prev.filter(c => c._id !== backupId))
            onRestored()
        } catch (err) {
            alert('שגיאה בשחזור')
            console.error(err)
        } finally {
            setRestoringId(null)
        }
    }

    return (
        <div className="recent-comments-overlay" onClick={onClose}>
            <div className="recent-comments-panel" onClick={e => e.stopPropagation()}>
                <div className="recent-comments-header">
                    <h3>תגובות שנמחקו</h3>
                    <button className="rc-close-btn" onClick={onClose} title="סגור">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="recent-comments-list">
                    {!comments ? (
                        <Loading />
                    ) : !comments.length ? (
                        <p className="rc-empty">אין תגובות שנמחקו</p>
                    ) : (
                        comments.map(item => (
                            <div key={item._id} className="rc-item backup-item">
                                <div className="rc-item-top">
                                    <span className="rc-name">{item.data.name}</span>
                                    <span className="rc-time">
                                        {utilService.getTimeStamp(new Date(item.createdAt).getTime())}
                                    </span>
                                </div>
                                <p className="rc-content">{item.data.content}</p>
                                {item.data.replies?.length > 0 && (
                                    <span className="backup-replies-badge">
                                        + {item.data.replies.length} תשובות
                                    </span>
                                )}
                                <button
                                    className="backup-restore-btn"
                                    onClick={() => handleRestore(item._id)}
                                    disabled={restoringId === item._id}
                                >
                                    {restoringId === item._id ? (
                                        <Loading isTxt={false} />
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-rotate-left"></i>
                                            שחזר
                                        </>
                                    )}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
